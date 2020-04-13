import { Node } from './Node.js'
import { Comment } from './Comment.js'
import { TextNode } from './TextNode.js'
import { AttributeNode } from './AttributeNode.js'
import { DocumentFragment } from './DocumentFragment.js'
import { SVGElement } from './SVGElement.js'
import { HTMLLinkElement } from './HTMLLinkElement.js'
import { HTMLScriptElement } from './HTMLScriptElement.js'
import { HTMLImageElement } from './HTMLImageElement.js'
import { DOMImplementation } from './DOMImplementation.js'
import { htmlEntities } from '../utils/strUtils.js'

export function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

export class Document extends Node {
  constructor (root) {
    super('#document')
    this.nodeType = Node.DOCUMENT_NODE
    root = this.createElement(root)
    this.appendChild(root)
    root.ownerDocument = this
    this.documentElement = root
    this._preloaded = {}
    this.implementation = DOMImplementation
  }

  createElementNS (ns, name) {
    return new SVGElement(name, {
      attrs: { xmlns: ns },
      ownerDocument: this
    })
  }

  createDocumentFragment (name) {
    return new DocumentFragment()
  }

  createElement (name) {
    switch (name) {
    case 'img':
      return new HTMLImageElement({ ownerDocument: this })
    case 'link':
      return new HTMLLinkElement({ ownerDocument: this })
    case 'script':
      return new HTMLScriptElement({ ownerDocument: this })
    default:
      return new SVGElement(name, { ownerDocument: this })
    }
  }

  createTextNode (text) {
    // TODO: No entities here. Do it in innerHTML only
    return new TextNode('#text', { data: htmlEntities(text), ownerDocument: this })
  }

  createComment (text) {
    return new Comment('#comment', { data: text, ownerDocument: this })
  }

  createAttribute (name) {
    return new AttributeNode(name, { ownerDocument: this })
  }

  getElementById (id) {
    for (var i = this.childNodes.length; i--;) {
      if (this.childNodes[i].id === id) { return this.childNodes[i] }
      var el = this.childNodes[i].getElementById(id)
      if (el) { return el }
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
  }
})
