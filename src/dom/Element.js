import { Node } from './Node.js'

import { ParentNode } from './mixins/ParentNode.js'
import { elementAccess } from './mixins/elementAccess.js'
import { parseFragment } from './html/HTMLParser.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { tag } from '../utils/tagUtils.js'
import { htmlEntities, cdata, comment } from '../utils/strUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'
import {
  html,
  normalizeNamespace,
  validateAndExtract,
  validateName
} from '../utils/namespaces.js'
import { createCSSStyleDeclaration } from './CSSStyleDeclaration.js'

const getAttributeByNsAndLocalName = (el, ns, localName) => {
  ns = normalizeNamespace(ns)
  return [...el.attrs].find(
    node => node.localName === localName && node.namespaceURI === ns
  )
}

const getAttributeByQualifiedName = (el, qualifiedName) => {
  if (el.namespaceURI === html && el.ownerDocument.namespaceURI === html) {
    qualifiedName = qualifiedName.toLowerCase()
  }

  return [...el.attrs].find(node => node.name === qualifiedName)
}

const attachAttribute = (element, node, oldAttribute) => {
  if (node.ownerDocument && node.ownerDocument !== element.ownerDocument) {
    throw new Error('Wrong Document Error')
  }

  if (node.ownerElement && node.ownerElement !== element) {
    throw new Error('Attribute is already in use by another element')
  }

  if (oldAttribute === node) return node

  if (oldAttribute) {
    element.attrs.delete(oldAttribute)
    oldAttribute.ownerElement = null
  }

  element.attrs.add(node)
  node.ownerElement = element
  return oldAttribute || null
}

// https://dom.spec.whatwg.org/#dom-element-setattributens
export class Element extends Node {
  constructor(name, props, ns) {
    super(name, props, ns)

    this.style = createCSSStyleDeclaration(this)
    this.tagName = this.nodeName
  }

  getAttribute(qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return attr ? attr.value : null
  }

  getAttributeNode(qualifiedName) {
    return getAttributeByQualifiedName(this, qualifiedName)
  }

  getAttributeNodeNS(ns, localName) {
    return getAttributeByNsAndLocalName(this, ns, localName)
  }

  getAttributeNS(ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return attr ? attr.value : null
  }

  getBoundingClientRect() {
    throw new Error('Only implemented for SVG Elements')
  }

  hasAttribute(qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return !!attr
  }

  hasAttributeNS(ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return !!attr
  }

  matches(query) {
    return this.matchWithScope(query, this)
  }

  removeAttribute(qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  removeAttributeNode(node) {
    if (!this.attrs.delete(node))
      throw new Error(
        'Attribute cannot be removed because it was not found on the element'
      )
    node.ownerElement = null
    return node
  }

  // call is: d.removeAttributeNS('http://www.mozilla.org/ns/specialspace', 'align', 'center');
  removeAttributeNS(ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  // Namespace-unaware attributes are identified by their qualified name.
  setAttribute(qualifiedName, value) {
    qualifiedName = validateName(qualifiedName)

    // We have to do that here because we cannot check if `this` is in the correct namespace
    // when doing it in createAttribute
    if (
      this.namespaceURI === html &&
      this.ownerDocument.namespaceURI === html
    ) {
      qualifiedName = qualifiedName.toLowerCase()
    }

    let attr = this.getAttributeNode(qualifiedName)
    if (!attr) {
      // Because createAttribute lowercases the attribute in an html doc we have to use createAttributeNS
      attr = this.ownerDocument.createAttributeNS(null, qualifiedName, true)
      this.setAttributeNode(attr)
    }

    attr.value = value
  }

  setAttributeNode(node) {
    // The non-namespace variant replaces by qualified name.
    return attachAttribute(this, node, this.getAttributeNode(node.name))
  }

  setAttributeNodeNS(node) {
    // Prefixes are aliases and therefore do not participate in identity here.
    return attachAttribute(
      this,
      node,
      this.getAttributeNodeNS(node.namespaceURI, node.localName)
    )
  }

  // call is: d.setAttributeNS('http://www.mozilla.org/ns/specialspace', 'spec:align', 'center');
  setAttributeNS(namespace, name, value) {
    const [ns, prefix, localName] = validateAndExtract(namespace, name)

    let attr = this.getAttributeNodeNS(ns, localName)
    if (!attr) {
      attr = this.ownerDocument.createAttributeNS(ns, name)
      this.setAttributeNodeNS(attr)
    }

    // An existing attribute keeps its identity, but its requested prefix and
    // qualified name must still change (for example a:value -> b:value).
    attr.prefix = prefix
    attr.localName = localName
    attr.nodeName = name
    attr.value = value
  }

  get attributes() {
    return [...this.attrs]
  }

  get className() {
    return this.getAttribute('class') || ''
  }

  set className(c) {
    this.setAttribute('class', c)
  }

  get id() {
    return this.getAttribute('id') || ''
  }

  set id(id) {
    this.setAttribute('id', id)
  }

  get innerHTML() {
    return this.childNodes
      .map(node => {
        if (node.nodeType === Node.TEXT_NODE) return htmlEntities(node.data)
        if (node.nodeType === Node.CDATA_SECTION_NODE) return cdata(node.data)
        if (node.nodeType === Node.COMMENT_NODE) return comment(node.data)
        return node.outerHTML
      })
      .join('')
  }

  set innerHTML(str) {
    const fragment = parseFragment(str, this)
    this.replaceChildren(fragment)
  }

  get outerHTML() {
    return tag(this)
  }

  set outerHTML(str) {
    const parent = this.parentNode
    if (!parent) return
    // A document cannot be the fragment parsing context because the replacement
    // may contain several nodes. Parse detached, then let replaceChild validate
    // the final document structure atomically.
    const context =
      parent.nodeType === Node.DOCUMENT_NODE
        ? this.ownerDocument.createDocumentFragment()
        : parent
    const fragment = parseFragment(str, context)
    parent.replaceChild(fragment, this)
  }
}

mixin(ParentNode, Element)
mixin(elementAccess, Element)
mixin(NonDocumentTypeChildNode, Element)
mixin(ChildNode, Element)
