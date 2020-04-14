import { Node } from './Node.js'
import { Comment } from './Comment.js'
import { TextNode } from './TextNode.js'
import { AttributeNode } from './AttributeNode.js'
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
import { NodeIterator } from './NodeIterator.js'
import { NodeFilter } from './NodeFilter.js'

export function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

export const namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',
  html: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
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
    throw new Error('createDocumentType not implemented yet')
  },

  createDocument (namespace, qualifiedName, doctype) {
    var doc = new Document()
    if (doctype) {
      if (doctype.ownerDocument) {
        throw new Error('the object is in the wrong Document, a call to importNode is required')
      }
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
    d.documentElement = root
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
    return new DocumentFragment()
  }

  createElement (name) {
    return this.createElementNS(null, name)
  }

  createTextNode (text) {
    return new TextNode('#text', { data: text, ownerDocument: this })
  }

  createComment (text) {
    return new Comment('#comment', { data: text, ownerDocument: this })
  }

  createAttribute (name) {
    return this.createAttributeNS(null, name)
  }

  createAttributeNS (ns, name) {
    return new AttributeNode(name, { ownerDocument: this }, ns)
  }

  getElementById (id) {
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => id === node.id ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE })
    for (const node of iter) {
      return node
    }
    return null
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
      return getChildByTagName(this.documentElement, 'body')
    },
    set () {
      throw new Error('setting body not implemented yet')
    }
  },
  head: {
    get () {
      return getChildByTagName(this.documentElement, 'head')
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
