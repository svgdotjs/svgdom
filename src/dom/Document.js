import { Node } from './Node.js'
import { Comment } from './Comment.js'
import { Text } from './Text.js'
import { Attr } from './Attr.js'
import { DocumentFragment } from './DocumentFragment.js'
import { HTMLLinkElement } from './html/HTMLLinkElement.js'
import { HTMLScriptElement } from './html/HTMLScriptElement.js'
import { HTMLImageElement } from './html/HTMLImageElement.js'
import { HTMLElement } from './html/HTMLElement.js'
import { elementAccess } from './mixins/elementAccess.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { SVGSVGElement } from './svg/SVGSVGElement.js'
import { SVGPathElement } from './svg/SVGPathElement.js'
import { SVGTextContentElement } from './svg/SVGTextContentElement.js'
import { SVGGraphicsElement } from './svg/SVGGraphicsElement.js'
import { ParentNode } from './mixins/ParentNode.js'
import { svg, html } from '../utils/namespaces.js'
import { DocumentType } from './DocumentType.js'
import { NonElementParentNode } from './mixins/NonElementParentNode.js'
import { SVGRectElement } from './svg/SVGRectElement.js'
import { SVGCircleElement } from './svg/SVGCircleElement.js'
import { SVGLineElement } from './svg/SVGLineElement.js'
import { SVGEllipseElement } from './svg/SVGEllipseElement.js'
import { SVGForeignObjectElement } from './svg/SVGForeignObjectElement.js'
import { SVGImageElement } from './svg/SVGImageElement.js'

function getChildByTagName (parent, name) {
  for (let child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

const getSVGElementForName = (name) => {
  switch (name.toLowerCase()) {
  case 'svg':
    return SVGSVGElement
  case 'path':
    return SVGPathElement
  case 'circle':
    return SVGCircleElement
  case 'ellipse':
    return SVGEllipseElement
  case 'line':
    return SVGLineElement
  case 'rect':
    return SVGRectElement
  case 'foreignObject':
    return SVGForeignObjectElement
  case 'image':
    return SVGImageElement
  case 'text':
  case 'tspan':
  case 'tref':
  case 'altglyph':
  case 'textpath':
    return SVGTextContentElement
  default:
    return SVGGraphicsElement
  }
}

const getHTMLElementForName = (name) => {
  switch (name.toLowerCase()) {
  case 'img':
    return HTMLImageElement
  case 'link':
    return HTMLLinkElement
  case 'script':
    return HTMLScriptElement
  default:
    return HTMLElement
  }
}

const getElementForNamespace = (ns, name) => {
  switch (ns) {
  case svg:
    return getSVGElementForName(name)
  case html:
  case null:
  case '':
  default:
    return getHTMLElementForName(name)
  }
}

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
const supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
}

export const DOMImplementation = {
  hasFeature (feature, version) {
    const f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  },

  createDocumentType (qualifiedName, publicId, systemId) {
    return new DocumentType(qualifiedName, { publicId, systemId, ownerDocument: this })
  },

  createDocument (namespace, qualifiedName, doctype) {
    const doc = new Document(namespace)
    if (doctype) {
      if (doctype.ownerDocument) {
        throw new Error('the object is in the wrong Document, a call to importNode is required')
      }
      doctype.ownerDocument = doc
      doc.appendChild(doctype)
    }
    if (qualifiedName) {
      doc.appendChild(doc.createElementNS(namespace, qualifiedName))
    }
    return doc
  },

  createHTMLDocument (titleText = '') {
    const d = new Document(html)
    const root = d.createElement('html')
    const head = d.createElement('head')
    const title = d.createElement('title')
    title.appendChild(d.createTextNode(titleText))
    head.appendChild(title)
    root.appendChild(head)
    root.appendChild(d.createElement('body'))

    d.appendChild(root)
    return d
  }
}

export class Document extends Node {
  constructor (ns) {
    super('#document', {}, ns)
    this.nodeType = Node.DOCUMENT_NODE
    this.implementation = DOMImplementation
    this.defaultView = null
  }

  // https://dom.spec.whatwg.org/#dom-document-createattribute
  createAttribute (localName) {
    if (this.namespaceURI === html) {
      localName = localName.toLowerCase()
    }
    return this.createAttributeNS(null, localName, true)
  }

  createAttributeNS (ns, qualifiedName, local = false) {
    return new Attr(qualifiedName, { ownerDocument: this, local }, ns)
  }

  createComment (text) {
    return new Comment('#comment', { nodeValue: text, ownerDocument: this })
  }

  createDocumentFragment (name) {
    return new DocumentFragment('#document-fragment', { ownerDocument: this })
  }

  createElement (localName) {
    return this.createElementNS(this.namespaceURI, localName, true)
  }

  createElementNS (ns, qualifiedName, local = false) {
    const Element = getElementForNamespace(ns, qualifiedName)

    return new Element(qualifiedName, {
      ownerDocument: this,
      local
    }, ns)
  }

  createTextNode (text) {
    return new Text('#text', { nodeValue: text, ownerDocument: this })
  }

  get compatMode () {
    return 'CSS1Compat' // always be in standards-mode
  }

  get body () {
    return getChildByTagName(this.documentElement, 'BODY')
  }

  get head () {
    return getChildByTagName(this.documentElement, 'HEAD')
  }

  get documentElement () {
    return this.lastChild
  }
}

mixin(elementAccess, Document)
mixin(ParentNode, Document)
mixin(NonElementParentNode, Document)
