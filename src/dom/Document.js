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
import * as namespaces from '../utils/namespaces.js'
import { DocumentType } from './DocumentType.js'
import { NonElementParentNode } from './mixins/NonElementParentNode.js'

export function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
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
  case namespaces.svg:
    return getSVGElementForName(name)
  case namespaces.html:
  case null:
  case '':
  default:
    return getHTMLElementForName(name)
  }
}

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
var supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
}

export const DOMImplementation = {
  hasFeature (feature, version) {
    var f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  },

  createDocumentType (qualifiedName, publicId, systemId) {
    return new DocumentType(qualifiedName, { publicId, systemId, ownerDocument: this })
  },

  createDocument (namespace, qualifiedName, doctype) {
    var doc = new Document()
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
    const d = new Document('html')
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
  constructor () {
    super('#document')
    this.nodeType = Node.DOCUMENT_NODE
    this.implementation = DOMImplementation
    this.defaultView = null
  }

  createElementNS (ns, name) {
    const Element = getElementForNamespace(ns, name)

    return new Element(name, {
      ownerDocument: this
    }, ns)
  }

  createDocumentFragment (name) {
    return new DocumentFragment({ ownerDocument: this })
  }

  createElement (name) {
    return this.createElementNS(namespaces.html, name)
  }

  createTextNode (text) {
    return new Text('#text', { nodeValue: text, ownerDocument: this })
  }

  createComment (text) {
    return new Comment('#comment', { nodeValue: text, ownerDocument: this })
  }

  createAttribute (name) {
    return this.createAttributeNS(null, name)
  }

  createAttributeNS (ns, name) {
    return new Attr(name, ns)
  }
}

Object.defineProperties(Document.prototype, {
  compatMode: {
    get () {
      return 'CSS1Compat' // always be in standards-mode
    }
  },
  body: {
    get () {
      return getChildByTagName(this.documentElement, 'BODY')
    }
  },
  head: {
    get () {
      return getChildByTagName(this.documentElement, 'HEAD')
    }
  },
  documentElement: {
    get () {
      return this.lastChild
    }
  }
})

mixin(elementAccess, Document)
mixin(ParentNode, Document)
mixin(NonElementParentNode, Document)
