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
    const clone = cloneNode(this)

    if (deep) {
      this.childNodes.forEach(function (el) {
        const node = el.cloneNode(deep)
        clone.appendChild(node)
      })
    }

    return clone
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
    let index = this.childNodes.indexOf(before)
    if (index === -1) {
      index = this.childNodes.length
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      let child
      let oldChild = before
      while ((child = node.childNodes.pop())) {
        this.insertBefore(child, oldChild)
        oldChild = child
      }
      return node
    }

    if (node.parentNode) {
      node.parentNode.removeChild(node)
    }

    node.parentNode = this
    // Object.setPrototypeOf(node.namespaces.prototype, this.namespaces.prototype)

    this.childNodes.splice(index, 0, node)
    return node
  }

  isDefaultNamespace(namespaceURI) {
    return this.lookupNamespaceURI(null) === normalizeNamespace(namespaceURI)
  }

  isEqualNode(node) {
    this.normalize()
    node.normalize()

    let bool = this.nodeName === node.nodeName
    bool = bool && this.localName === node.localName
    bool = bool && this.namespaceURI === node.namespaceURI
    bool = bool && this.prefix === node.prefix
    bool = bool && this.nodeValue === node.nodeValue

    bool = bool && this.childNodes.length === node.childNodes.length

    // dont check children recursively when the count doesnt event add up
    if (!bool) return false

    bool =
      bool &&
      !this.childNodes.reduce((last, curr, index) => {
        return last && curr.isEqualNode(node.childNodes[index])
      }, true)

    // FIXME: Use attr nodes
    /* bool = bool && ![ ...this.attrs.entries() ].reduce((last, curr, index) => {
      const [ key, val ] = node.attrs.entries()
      return last && curr[0] === key && curr[1] === val
    }, true) */

    /*
    TODO:
    For two DocumentType nodes to be equal, the following conditions must also be satisfied:

    The following string attributes are equal: publicId, systemId, internalSubset.
    The entities NamedNodeMaps are equal.
    The notations NamedNodeMaps are equal.
    */

    if (
      this.nodeType === Node.DOCUMENT_TYPE_NODE &&
      node.nodeType === Node.DOCUMENT_TYPE_NODE
    ) {
      bool = bool && this.publicId === node.publicId
      bool = bool && this.systemId === node.systemId
      bool = bool && this.internalSubset === node.internalSubset
    }

    return bool
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
    const childNodes = []
    for (const node of this.childNodes) {
      const last = childNodes.shift()
      if (!last) {
        if (node.data) {
          childNodes.unshift(node)
        }
        continue
      }

      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.data) {
          childNodes.unshift(last)
          continue
        }

        if (last.nodeType === Node.TEXT_NODE) {
          const merged = this.ownerDocument.createTextNode(
            last.data + node.data
          )
          childNodes.push(merged)
          continue
        }

        childNodes.push(last, node)
      }
    }

    childNodes.forEach(node => {
      node.parentNode = this
    })
    this.childNodes = childNodes
    // this.childNodes = this.childNodes.forEach((textNodes, node) => {
    //   // FIXME: If first node is an empty textnode, what do we do? -> spec
    //   if (!textNodes) return [ node ]
    //   var last = textNodes.pop()

    //   if (node.nodeType === Node.TEXT_NODE) {
    //     if (!node.data) return textNodes

    //     if (last.nodeType === Node.TEXT_NODE) {
    //       const merged = this.ownerDocument.createTextNode(last.data + ' ' + node.data)
    //       textNodes.push(merged)
    //       return textNodes.concat(merged)
    //     }
    //   } else {
    //     textNodes.push(last, node)
    //   }

    //   return textNodes
    // }, null)
  }

  removeChild(node) {
    node.parentNode = null
    // Object.setPrototypeOf(node, null)
    const index = this.childNodes.indexOf(node)
    if (index === -1) return node
    this.childNodes.splice(index, 1)
    return node
  }

  replaceChild(newChild, oldChild) {
    const before = oldChild.nextSibling
    this.removeChild(oldChild)
    this.insertBefore(newChild, before)
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
    if (this.nodeType === Node.TEXT_NODE) return this.data
    if (this.nodeType === Node.CDATA_SECTION_NODE) return this.data
    if (this.nodeType === Node.COMMENT_NODE) return this.data

    return this.childNodes.reduce(function (last, current) {
      return last + current.textContent
    }, '')
  }

  set textContent(text) {
    if (
      this.nodeType === Node.TEXT_NODE ||
      this.nodeType === Node.CDATA_SECTION_NODE ||
      this.nodeType === Node.COMMENT_NODE
    ) {
      this.data = text
      return
    }
    this.childNodes = []
    this.appendChild(this.ownerDocument.createTextNode(text))
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
