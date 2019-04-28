const { extend } = require('./utils/objectCreationUtils')
const EventTarget = require('./class/EventTarget')
const SVGPoint = require('./class/SVGPoint')
const SVGMatrix = require('./class/SVGMatrix')
const { SVGElement, DocumentFragment, Node, TextNode, Comment, AttributeNode } = require('./class/Node')
const sizeOf = require('image-size')
const path = require('path')
const fontkit = require('fontkit')
const { htmlEntities } = require('./utils/strUtils')

class HTMLLinkElement extends Node {
  constructor () {
    super('link')
  }
}

Object.defineProperties(HTMLLinkElement.prototype, {
  href: {
    get () {
      return this.attrs.get('href')
    },
    set (val) {
      this.attrs.set('href', val)
    }
  },
  rel: {
    get () {
      return this.attrs.get('rel')
    },
    set (val) {
      this.attrs.set('rel', val)
    }
  },
  type: {
    get () {
      return this.attrs.get('type')
    },
    set (val) {
      this.attrs.set('type', val)
    }
  }
})

class HTMLScriptElement extends Node {
  constructor () {
    super('script')
  }
}

Object.defineProperties(HTMLScriptElement.prototype, {
  src: {
    get () {
      return this.attrs.get('src')
    },
    set (val) {
      this.attrs.set('src', val)
    }
  },
  type: {
    get () {
      return this.attrs.get('type')
    },
    set (val) {
      this.attrs.set('type', val)
    }
  }
})

class HTMLImageElement extends Node {
  constructor () {
    super('img')
    this.width = 0
    this.height = 0
    this.naturalWidth = 0
    this.naturalHeight = 0
  }
}

Object.defineProperties(HTMLImageElement.prototype, {
  src: {
    get () {
      return this.attrs.get('src')
    },
    set (val) {
      this.attrs.set('src', val)
      sizeOf(val, (err, size) => {
        if (err) {
          this.dispatchEvent(new Event('error', this))
          return
        }

        this.width = this.naturalWidth = size.width
        this.height = this.naturalHeight = size.height

        this.dispatchEvent(new Event('load', this))
      })
    }
  },
  height: {
    get () {
      return this.attrs.get('height')
    },
    set (val) {
      this.attrs.set('height', val)
    }
  },
  width: {
    get () {
      return this.attrs.get('width')
    },
    set (val) {
      this.attrs.set('width', val)
    }
  }
})

class Event {
  constructor (type) {
    this.type = type
    this.cancelable = false
    this.defaultPrevented = false
  }

  preventDefault () {
    this.defaultPrevented = true
  }
}

class CustomEvent extends Event {
  constructor (name, props = {}) {
    super(name)

    this.detail = props.detail || null
    this.cancelable = props.cancelable || false
  }
}

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
var supportedFeatures = {
  'xml': { '': true, '1.0': true, '2.0': true }, // DOM Core
  'core': { '': true, '2.0': true }, // DOM Core
  'html': { '': true, '1.0': true, '2.0': true }, // HTML
  'xhtml': { '': true, '1.0': true, '2.0': true } // HTML
}

class DOMImplementation {
  hasFeature (feature, version) {
    var f = supportedFeatures[(feature || '').toLowerCase()]
    return (f && f[version || '']) || false
  }

  createDocumentType (qualifiedName, publicId, systemId) {
    throw new Error('createDocumentType not implemented yet')
  }

  createDocument (namespace, qualifiedName, doctype) {
    var doc = new Document()

    if (doctype) {
      if (doctype.ownerDocument) { throw new Error('the object is in the wrong Document, a call to importNode is required') }
      doc.appendChild(doctype)
    }

    if (qualifiedName) { doc.appendChild(doc.createElementNS(namespace, qualifiedName)) }

    return doc
  }

  createHTMLDocument (titleText) {
    var d = new Document('html')
    var root = d.documentElement
    var head = d.createElement('head')
    root.appendChild(head)
    var title = d.createElement('title')
    head.appendChild(title)
    title.appendChild(d.createTextNode(titleText))
    root.appendChild(d.createElement('body'))
    return d
  }
}

function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

class Document extends Node {
  constructor (root) {
    super('#document')
    this.nodeType = Node.DOCUMENT_NODE
    root = this.createElement(root)
    this.appendChild(root)
    root.ownerDocument = this
    this.documentElement = root
    this._preloaded = {}
    this._implementation = new DOMImplementation()
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
    return new TextNode('#text', { data: htmlEntities(text), ownerDocument: this })
  }
  createComment (text) {
    return new Comment('#comment', { data: text, ownerDocument: this })
  }
  createAttribute (name) {
    return new AttributeNode(name, { ownerDocument: this })
  }
}

Object.defineProperties(Document.prototype, {
  implementation: {
    get () {
      return this._implementation
    }
  },
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

class Window extends EventTarget {
  constructor () {
    super()
    this.document = new Document('svg')
  }
  setFontDir (dir) {
    this.document.fontDir = dir
    return this
  }
  setFontFamilyMappings (map) {
    this.document.fontFamilyMappings = map
    return this
  }
  preloadFonts () {
    var map = this.document.fontFamilyMappings
    var filename

    for (var i in map) {
      filename = path.join(this.document.fontDir, map[i])

      try {
        this.document._preloaded[i] = fontkit.openSync(filename)
      } catch (e) {
        console.warn('Could not load font file for ' + i + '.' + e)
      }
    }

    return this

  }
  getComputedStyle (node) {

    return {
      // FIXME: Currently this function treats every given attr
      // as inheritable from its parents which is ofc not always true
      // but good enough for svg.js
      getPropertyValue (attr) {
        let value

        do {
          value = node.style[attr] || node.getAttribute(attr)
        } while (
          value == null
          && (node = node.parentNode)
          && node.nodeType === 1
        )

        return value || null
      }
    }
  }
}

extend(Window, {
  Window: Window,
  DocumentFragment: DocumentFragment,
  Node: Node,
  Text: TextNode,
  Element: SVGElement,
  SVGElement: SVGElement,
  CustomEvent: CustomEvent,
  Event: Event,
  SVGMatrix: SVGMatrix,
  SVGPoint: SVGPoint,
  HTMLLinkElement: HTMLLinkElement,
  HTMLScriptElement: HTMLScriptElement,
  Image: HTMLImageElement,
  HTMLImageElement: HTMLImageElement,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0
})

module.exports = new Window()
