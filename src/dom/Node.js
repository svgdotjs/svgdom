import { extend, extendStatic } from '../utils/objectCreationUtils.js'

import { EventTarget } from './EventTarget.js'
import { cloneNode } from '../utils/tagUtils.js'
import { html, normalizeNamespace, xml, xmlns } from '../utils/namespaces.js'

const nodeTypes = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12
}

const domError = (message, code) => Object.assign(new Error(message), { code })
const hierarchyError = () => domError('Hierarchy Request Error', 3)
const notFoundError = () => domError('Not Found Error', 8)
const wrongDocumentError = () => domError('Wrong Document Error', 4)

const associatedDocument = node =>
  node.nodeType === Node.DOCUMENT_NODE ? node : node.ownerDocument

const canHaveChildren = node =>
  node.nodeType === Node.DOCUMENT_NODE ||
  node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
  node.nodeType === Node.ELEMENT_NODE

const insertableNodeTypes = new Set([
  nodeTypes.ELEMENT_NODE,
  nodeTypes.TEXT_NODE,
  nodeTypes.CDATA_SECTION_NODE,
  nodeTypes.PROCESSING_INSTRUCTION_NODE,
  nodeTypes.COMMENT_NODE,
  nodeTypes.DOCUMENT_TYPE_NODE
])

// Tree insertion adopts nodes into the destination document. Ownership must be
// updated for the complete subtree, including attributes that are not children.
const setOwnerDocument = (node, document) => {
  if (!document || node.nodeType === Node.DOCUMENT_NODE) return
  node.ownerDocument = document
  for (const attr of node.attrs) {
    attr.ownerDocument = document
  }
  for (const child of node.childNodes) {
    setOwnerDocument(child, document)
  }
}

// Callers pass the complete candidate list, not only the inserted nodes. This
// lets replacement and parser paths enforce ordering and cardinality uniformly.
export const validateDocumentChildren = children => {
  const allowed = new Set([
    Node.ELEMENT_NODE,
    Node.COMMENT_NODE,
    Node.DOCUMENT_TYPE_NODE
  ])
  if (children.some(node => !allowed.has(node.nodeType))) {
    throw hierarchyError()
  }

  const elements = children.filter(node => node.nodeType === Node.ELEMENT_NODE)
  const doctypes = children.filter(
    node => node.nodeType === Node.DOCUMENT_TYPE_NODE
  )
  if (elements.length > 1 || doctypes.length > 1) throw hierarchyError()
  if (
    elements.length &&
    doctypes.length &&
    children.indexOf(doctypes[0]) > children.indexOf(elements[0])
  ) {
    throw hierarchyError()
  }
}

const validateInsertedNodes = (parent, nodes, childrenAfterInsertion) => {
  if (!canHaveChildren(parent)) throw hierarchyError()
  if (nodes.some(node => !insertableNodeTypes.has(node.nodeType))) {
    throw hierarchyError()
  }
  for (const node of nodes) {
    for (let ancestor = parent; ancestor; ancestor = ancestor.parentNode) {
      if (ancestor === node) throw hierarchyError()
    }
  }
  if (parent.nodeType === Node.DOCUMENT_NODE) {
    validateDocumentChildren(childrenAfterInsertion)
  } else if (nodes.some(node => node.nodeType === Node.DOCUMENT_TYPE_NODE)) {
    throw hierarchyError()
  }
}

const insertionPlan = (
  parent,
  node,
  before,
  replacedNode = null,
  replaceAll = false
) => {
  const suppliedNodes = Array.isArray(node) ? node : [node]
  if (suppliedNodes.some(node => !(node instanceof Node))) {
    throw hierarchyError()
  }
  if (before != null && before.parentNode !== parent) throw notFoundError()
  if (replacedNode != null && replacedNode.parentNode !== parent) {
    throw notFoundError()
  }
  // Validate the supplied fragment before expanding it. Otherwise inserting a
  // fragment into itself would appear to be an empty, and therefore valid, edit.
  for (const suppliedNode of suppliedNodes) {
    for (let ancestor = parent; ancestor; ancestor = ancestor.parentNode) {
      if (ancestor === suppliedNode) throw hierarchyError()
    }
  }

  const nodes = suppliedNodes.flatMap(node =>
    node.nodeType === Node.DOCUMENT_FRAGMENT_NODE
      ? node.childNodes.slice()
      : node
  )
  const removed = new Set(nodes)
  const replacedNodes = replaceAll
    ? parent.childNodes.slice()
    : replacedNode
      ? [replacedNode]
      : []
  for (const replaced of replacedNodes) removed.add(replaced)

  // Calculate the final child list without mutating either tree. References
  // that are themselves moving resolve to the next child that remains in place.
  const remaining = parent.childNodes.filter(child => !removed.has(child))

  let index
  if (replaceAll) {
    index = 0
  } else if (replacedNode) {
    const following = parent.childNodes.find(
      (child, childIndex) =>
        childIndex > parent.childNodes.indexOf(replacedNode) &&
        !removed.has(child)
    )
    index = following ? remaining.indexOf(following) : remaining.length
  } else if (before == null) {
    index = remaining.length
  } else if (removed.has(before)) {
    const following = parent.childNodes.find(
      (child, childIndex) =>
        childIndex > parent.childNodes.indexOf(before) && !removed.has(child)
    )
    index = following ? remaining.indexOf(following) : remaining.length
  } else {
    index = remaining.indexOf(before)
  }

  const childrenAfterInsertion = remaining.slice()
  childrenAfterInsertion.splice(index, 0, ...nodes)
  validateInsertedNodes(parent, nodes, childrenAfterInsertion)
  return { nodes, index, replacedNodes }
}

const applyInsertionPlan = (parent, plan) => {
  const document = associatedDocument(parent)

  // Validation is complete before this commit phase starts, so detaching a
  // source node cannot leave either tree half-mutated after an error.
  for (const node of plan.nodes) {
    if (node.parentNode) {
      const index = node.parentNode.childNodes.indexOf(node)
      if (index !== -1) node.parentNode.childNodes.splice(index, 1)
      node.parentNode = null
    }
  }

  for (const replacedNode of plan.replacedNodes) {
    const index = parent.childNodes.indexOf(replacedNode)
    if (index !== -1) parent.childNodes.splice(index, 1)
    replacedNode.parentNode = null
  }

  // Adoption happens only after every old parent link has been removed. The
  // final splice then publishes the already-consistent subtree in one step.
  for (const node of plan.nodes) {
    setOwnerDocument(node, document)
    node.parentNode = parent
  }
  parent.childNodes.splice(plan.index, 0, ...plan.nodes)
}

export const replaceAllChildren = (parent, nodes) => {
  const plan = insertionPlan(parent, nodes, null, null, true)
  applyInsertionPlan(parent, plan)
}

export class Node extends EventTarget {
  constructor(name = '', props = {}, ns = null) {
    super()

    // If props.local is true, the element was Node was created with the non-namespace function
    // that means whatever was passed as name is the local name even though it might look like a prefix
    if (name.includes(':') && !props.local) {
      ;[this.prefix, this.localName] = name.split(':')
    } else {
      this.localName = name
      this.prefix = null
    }

    // Follow spec and uppercase nodeName for html
    this.nodeName =
      ns === html && props.ownerDocument?.namespaceURI === html
        ? name.toUpperCase()
        : name

    this.namespaceURI = ns
    this.nodeType = Node.ELEMENT_NODE
    this.nodeValue = props.nodeValue != null ? props.nodeValue : null
    this.childNodes = []

    this.attrs = props.attrs || new Set()

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null

    // this.namespaces = {}
    // if (this.prefix) {
    //   this.namespaces[this.prefix] = ns
    // } else {
    //   this.namespaces.default = ns
    // }

    if (props.childNodes) {
      for (let i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
    }
  }

  appendChild(node) {
    return this.insertBefore(node)
  }

  cloneNode(deep = false) {
    return cloneNode(this, deep)
  }

  contains(node) {
    if (node === this) return false

    while (node.parentNode) {
      if (node === this) return true
      node = node.parentNode
    }
    return false
  }

  getRootNode() {
    if (!this.parentNode || this.nodeType === Node.DOCUMENT_NODE) return this
    return this.parentNode.getRootNode()
  }

  hasChildNodes() {
    return !!this.childNodes.length
  }

  insertBefore(node, before) {
    const plan = insertionPlan(this, node, before)
    applyInsertionPlan(this, plan)
    return node
  }

  isDefaultNamespace(namespaceURI) {
    return this.lookupNamespaceURI(null) === normalizeNamespace(namespaceURI)
  }

  isEqualNode(node) {
    if (!(node instanceof Node)) return false
    if (
      this.nodeType !== node.nodeType ||
      this.nodeName !== node.nodeName ||
      this.localName !== node.localName ||
      this.namespaceURI !== node.namespaceURI ||
      this.prefix !== node.prefix ||
      this.nodeValue !== node.nodeValue ||
      this.attrs.size !== node.attrs.size ||
      this.childNodes.length !== node.childNodes.length
    ) {
      return false
    }

    // Attribute order is not significant even though svgdom stores attrs in a
    // Set, so compare each attribute structurally rather than by iteration slot.
    for (const attr of this.attrs) {
      if (![...node.attrs].some(other => attr.isEqualNode(other))) return false
    }

    if (this.nodeType === Node.DOCUMENT_TYPE_NODE) {
      if (
        this.publicId !== node.publicId ||
        this.systemId !== node.systemId ||
        this.internalSubset !== node.internalSubset
      ) {
        return false
      }
    }

    return this.childNodes.every((child, index) =>
      child.isEqualNode(node.childNodes[index])
    )
  }

  isSameNode(node) {
    return this === node
  }

  lookupNamespacePrefix(namespaceURI, originalElement) {
    // `originalElement` prevents returning an ancestor prefix that has been
    // rebound between that ancestor and the node where lookup began.
    originalElement = originalElement || this

    if (
      this.namespaceURI === namespaceURI &&
      this.prefix &&
      originalElement.lookupNamespaceURI(this.prefix) === namespaceURI
    ) {
      return this.prefix
    }

    for (const attr of this.attrs) {
      if (
        attr.namespaceURI === xmlns &&
        attr.prefix === 'xmlns' &&
        attr.value === namespaceURI &&
        originalElement.lookupNamespaceURI(attr.localName) === namespaceURI
      ) {
        return attr.localName
      }
    }

    if (this.parentNode && this.parentNode.nodeType === Node.ELEMENT_NODE) {
      return this.parentNode.lookupNamespacePrefix(
        namespaceURI,
        originalElement
      )
    }
    return null
  }

  lookupNamespaceURI(prefix) {
    prefix = normalizeNamespace(prefix)

    switch (this.nodeType) {
      case Node.ELEMENT_NODE:
        // These two prefixes are implicitly bound and need no xmlns attribute.
        if (prefix === 'xml') return xml
        if (prefix === 'xmlns') return xmlns

        if (this.namespaceURI != null && this.prefix === prefix) {
          return this.namespaceURI
        }

        for (const attr of this.attrs) {
          // Namespace declarations are Attr nodes in the XMLNS namespace. attrs
          // is a Set, so inspect the nodes rather than treating it like a Map.
          if (attr.namespaceURI !== xmlns) continue

          if (attr.prefix === 'xmlns' && attr.localName === prefix) {
            return attr.value || null
          }

          if (
            attr.prefix === null &&
            attr.localName === 'xmlns' &&
            prefix === null
          ) {
            return attr.value || null
          }
        }

        // Namespace scope follows parent elements; Document itself introduces no
        // additional bindings.
        if (this.parentNode && this.parentNode.nodeType === Node.ELEMENT_NODE) {
          return this.parentNode.lookupNamespaceURI(prefix)
        }
        return null
      case Node.DOCUMENT_NODE:
        return this.documentElement
          ? this.documentElement.lookupNamespaceURI(prefix)
          : null
      case Node.ENTITY_NODE:
      case Node.NOTATION_NODE:
      case Node.DOCUMENT_TYPE_NODE:
      case Node.DOCUMENT_FRAGMENT_NODE:
        return null
      case Node.ATTRIBUTE_NODE:
        if (this.ownerElement) {
          return this.ownerElement.lookupNamespaceURI(prefix)
        }
        return null
      default:
        if (this.parentNode && this.parentNode.nodeType === Node.ELEMENT_NODE) {
          return this.parentNode.lookupNamespaceURI(prefix)
        }
        return null
    }
  }

  lookupPrefix(namespaceURI) {
    namespaceURI = normalizeNamespace(namespaceURI)
    if (namespaceURI === null) return null

    const type = this.nodeType

    switch (type) {
      case Node.ELEMENT_NODE:
        return this.lookupNamespacePrefix(namespaceURI, this)
      case Node.DOCUMENT_NODE:
        return this.documentElement
          ? this.documentElement.lookupNamespacePrefix(
              namespaceURI,
              this.documentElement
            )
          : null
      case Node.ENTITY_NODE:
      case Node.NOTATION_NODE:
      case Node.DOCUMENT_FRAGMENT_NODE:
      case Node.DOCUMENT_TYPE_NODE:
        return null // type is unknown
      case Node.ATTRIBUTE_NODE:
        if (this.ownerElement) {
          return this.ownerElement.lookupNamespacePrefix(
            namespaceURI,
            this.ownerElement
          )
        }
        return null
      default:
        if (this.parentNode && this.parentNode.nodeType === Node.ELEMENT_NODE) {
          return this.parentNode.lookupNamespacePrefix(
            namespaceURI,
            this.parentNode
          )
        }
        return null
    }
  }

  normalize() {
    let index = 0
    while (index < this.childNodes.length) {
      const child = this.childNodes[index]
      child.normalize()

      if (child.nodeType !== Node.TEXT_NODE) {
        index++
        continue
      }

      if (!child.data) {
        // The next child shifts into this index and still needs processing.
        this.removeChild(child)
        continue
      }

      while (this.childNodes[index + 1]?.nodeType === Node.TEXT_NODE) {
        const adjacent = this.childNodes[index + 1]
        child.appendData(adjacent.data)
        this.removeChild(adjacent)
      }
      index++
    }
  }

  removeChild(node) {
    const index = this.childNodes.indexOf(node)
    if (index === -1) throw notFoundError()
    this.childNodes.splice(index, 1)
    node.parentNode = null
    return node
  }

  replaceChild(newChild, oldChild) {
    if (newChild === oldChild) {
      if (oldChild.parentNode !== this) throw notFoundError()
      return oldChild
    }
    const plan = insertionPlan(this, newChild, oldChild, oldChild)
    applyInsertionPlan(this, plan)
    return oldChild
  }

  get nextSibling() {
    const child =
      this.parentNode &&
      this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1]
    return child || null
  }

  get previousSibling() {
    const child =
      this.parentNode &&
      this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1]
    return child || null
  }

  get textContent() {
    if (
      this.nodeType === Node.TEXT_NODE ||
      this.nodeType === Node.CDATA_SECTION_NODE ||
      this.nodeType === Node.COMMENT_NODE
    ) {
      return this.data
    }
    if (this.nodeType === Node.ATTRIBUTE_NODE) return this.value
    if (
      this.nodeType !== Node.ELEMENT_NODE &&
      this.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
    ) {
      return null
    }

    // Element textContent includes descendant text and CDATA, but comments and
    // other non-character children do not contribute to the result.
    return this.childNodes.reduce((text, child) => {
      if (
        child.nodeType === Node.TEXT_NODE ||
        child.nodeType === Node.CDATA_SECTION_NODE
      ) {
        return text + child.data
      }
      return child.nodeType === Node.ELEMENT_NODE
        ? text + child.textContent
        : text
    }, '')
  }

  set textContent(text) {
    text = text == null ? '' : String(text)
    if (
      this.nodeType === Node.TEXT_NODE ||
      this.nodeType === Node.CDATA_SECTION_NODE ||
      this.nodeType === Node.COMMENT_NODE
    ) {
      this.data = text
      return
    }
    if (this.nodeType === Node.ATTRIBUTE_NODE) {
      this.value = text
      return
    }
    if (
      this.nodeType !== Node.ELEMENT_NODE &&
      this.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
    ) {
      return
    }
    while (this.firstChild) this.removeChild(this.firstChild)
    if (!text) return
    const document = associatedDocument(this)
    if (!document) throw wrongDocumentError()
    this.appendChild(document.createTextNode(text))
  }

  get lastChild() {
    return this.childNodes[this.childNodes.length - 1] || null
  }

  get firstChild() {
    return this.childNodes[0] || null
  }
}

extendStatic(Node, nodeTypes)
extend(Node, nodeTypes)
