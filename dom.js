const { invent, extend } = require('./utils/objectCreationUtils')
const EventTarget = require('./class/EventTarget')
const SVGPoint = require('./class/SVGPoint')
const SVGMatrix = require('./class/SVGMatrix')
const { SVGElement, DocumentFragment, Node, TextNode, Comment, AttributeNode } = require('./class/Node')
const sizeOf = require('image-size')
const path = require('path')
const fontkit = require('fontkit')
const { htmlEntities } = require('./utils/strUtils')

var HTMLLinkElement = invent({
  name: 'HTMLLinkElement',
  create: function () {
    Node.call(this, 'link')
  },
  inherit: Node,
  props: {
    href: {
      get: function () {
        return this.attrs.get('href')
      },
      set: function (val) {
        this.attrs.set('href', val)
      }
    },
    rel: {
      get: function () {
        return this.attrs.get('rel')
      },
      set: function (val) {
        this.attrs.set('rel', val)
      }
    },
    type: {
      get: function () {
        return this.attrs.get('type')
      },
      set: function (val) {
        this.attrs.set('type', val)
      }
    }
  }
})

var HTMLScriptElement = invent({
  name: 'HTMLScriptElement',
  create: function () {
    Node.call(this, 'script')
  },
  inherit: Node,
  props: {
    src: {
      get: function () {
        return this.attrs.get('src')
      },
      set: function (val) {
        this.attrs.set('src', val)
      }
    },
    type: {
      get: function () {
        return this.attrs.get('type')
      },
      set: function (val) {
        this.attrs.set('type', val)
      }
    }
  }
})

var HTMLImageElement = invent({
  name: 'HTMLImageElement',
  create: function () {
    Node.call(this, 'img')
    this.width = 0
    this.height = 0
    this.naturalWidth = 0
    this.naturalHeight = 0
  },
  inherit: Node,
  props: {
    src: {
      get: function () {
        return this.attrs.get('src')
      },
      set: function (val) {
        this.attrs.set('src', val)
        sizeOf(val, function (err, size) {
          if (err) {
            this.dispatchEvent(new Event('error', this))
            return
          }

          this.width = this.naturalWidth = size.width
          this.height = this.naturalHeight = size.height

          this.dispatchEvent(new Event('load', this))
        }.bind(this))
      }
    },
    height: {
      get: function () {
        return this.attrs.get('height')
      },
      set: function (val) {
        this.attrs.set('height', val)
      }
    },
    width: {
      get: function () {
        return this.attrs.get('width')
      },
      set: function (val) {
        this.attrs.set('width', val)
      }
    }
  }
})

var Event = invent({
  name: 'Event',
  create: function (type) {
    this.type = type
    this.cancelable = false
    this.defaultPrevented = false
  },
  extend: {
    preventDefault: function () {
      this.defaultPrevented = true
    }
  }
})

var CustomEvent = invent({
  name: 'CustomEvent',
  create: function (name, props = {}) {
    Event.call(this, name)

    this.detail = props.detail || null
    this.cancelable = props.cancelable || false
  },
  inherit: Event
})

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
var supportedFeatures = {
  'xml': { '': true, '1.0': true, '2.0': true }, // DOM Core
  'core': { '': true, '2.0': true }, // DOM Core
  'html': { '': true, '1.0': true, '2.0': true }, // HTML
  'xhtml': { '': true, '1.0': true, '2.0': true } // HTML
}

var DOMImplementation = invent({
  name: 'DOMImplementation',
  extend: {
    hasFeature: function hasFeature (feature, version) {
      var f = supportedFeatures[(feature || '').toLowerCase()]
      return (f && f[version || '']) || false
    },

    createDocumentType: function createDocumentType (qualifiedName, publicId, systemId) {
      throw new Error('createDocumentType not implemented yet')
    },

    createDocument: function createDocument (namespace, qualifiedName, doctype) {
      var doc = new Document()

      if (doctype) {
        if (doctype.ownerDocument) { throw new Error('the object is in the wrong Document, a call to importNode is required') }
        doc.appendChild(doctype)
      }

      if (qualifiedName) { doc.appendChild(doc.createElementNS(namespace, qualifiedName)) }

      return doc
    },

    createHTMLDocument: function createHTMLDocument (titleText) {
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
})

function getChildByTagName (parent, name) {
  for (var child = parent.firstChild; child != null; child = child.nextSibling) {
    if (child.nodeType === Node.ELEMENT_NODE && child.nodeName === name) {
      return child
    }
  }
  return null
}

var Document = invent({
  name: 'Document',
  create: function (root) {
    Node.call(this, '#document')
    this.nodeType = 9
    root = this.createElement(root)
    this.appendChild(root)
    root.ownerDocument = this
    this.documentElement = root
    this._preloaded = {}
    this._implementation = new DOMImplementation()
  },
  inherit: Node,
  props: {
    implementation: {
      get: function () {
        return this._implementation
      }
    },
    compatMode: {
      get: function () {
        return 'CSS1Compat' // always be in standards-mode
      }
    },
    body: {
      get: function () {
        return getChildByTagName(this.documentElement, 'body')
      },
      set: function () {
        throw new Error('setting body not implemented yet')
      }
    },
    head: {
      get: function () {
        return getChildByTagName(this.documentElement, 'head')
      }
    }
  },
  extend: {
    createElementNS: function (ns, name) {
      return new SVGElement(name, {
        attrs: { xmlns: ns },
        ownerDocument: this
      })
    },
    createDocumentFragment: function (name) {
      return new DocumentFragment()
    },
    createElement: function (name) {
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
    },
    createTextNode: function (text) {
      return new TextNode('#text', { data: htmlEntities(text), ownerDocument: this })
    },
    createComment: function (text) {
      return new Comment('#comment', { data: text, ownerDocument: this })
    },
    createAttribute: function (name) {
      return new AttributeNode(name, { ownerDocument: this })
    }
  }
})

var Window = invent({
  create: function () {
    EventTarget.call(this)
    this.document = new Document('svg')
  },
  inherit: EventTarget,
  extend: {
    setFontDir: function (dir) {
      this.document.fontDir = dir
      return this
    },
    setFontFamilyMappings: function (map) {
      this.document.fontFamilyMappings = map
      return this
    },
    preloadFonts: function () {
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

    },
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
            (node = node.parentNode)
            && node.parentNode.nodeType === 1
          )

          return value || null
        }
      }
    }
  }
})

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
