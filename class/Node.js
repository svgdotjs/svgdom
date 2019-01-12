const { invent, extendClass } = require('../utils/objectCreationUtils')

const EventTarget = require('./EventTarget')

const { objectToMap, mapToObject, mapMap, mapToCss, cssToMap } = require('../utils/mapUtils')
const { hexToRGB, camelCase, htmlEntities } = require('../utils/strUtils')
const pathUtils = require('../utils/pathUtils')
const { tag, cloneNode } = require('../utils/tagUtils')
const bbox = require('../utils/bboxUtils')
const regex = require('../utils/regex')

const CssQuery = require('./CssQuery')
const SVGPoint = require('./SVGPoint')
const SVGMatrix = require('./SVGMatrix')
const Box = require('./Box')

// XMLParser
const sax = require('sax')

// Map matrix array to object
function arrayToMatrix (a) {
  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
}

var Node = invent({
  name: 'Node',
  create: function (name = '', props = {}) {
    EventTarget.call(this)

    this.nodeName = name
    this.nodeType = 1
    this.nodeValue = 0
    this.childNodes = []

    this._style = {}

    if (props.attrs && props.attrs.style) {
      this._style = mapToObject(cssToMap(props.attrs.style))
    }

    this.attrs = objectToMap(props.attrs || {})
    this.data = props.data || ''

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null
    this.cnt = 0

    this.style = this.getStyleProxy()

    if (props.childNodes) {
      for (var i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
    }
  },
  inherit: EventTarget,
  props: {
    attributes: {
      get: function () {
        var attributes = mapToAttributeArray(this.attrs)
        if (Object.keys(this._style).length) {
          attributes.push(new AttributeNode('style', this.getAttribute('style')))
        }
        return attributes
      }
    },
    className: {
      get: function () {
        return this.getAttribute('class')
      },
      set: function (c) {
        this.setAttribute('class', c)
      }
    },
    textContent: {
      get: function () {
        if (this.nodeType === 3) return this.data

        return this.childNodes.reduce(function (last, current) {
          return last + current.textContent
        }, '')
      },
      set: function (text) {
        this.childNodes = [new TextNode('#text', { data: htmlEntities(text) })]
      }
    },
    firstChild: {
      get: function () {
        return this.childNodes[0] || null
      }
    },
    lastChild: {
      get: function () {
        return this.childNodes[this.childNodes.length - 1] || null
      }
    },
    children: {
      get: function () {
        return this.childNodes.filter(function (node) { return node.nodeType === 1 })
      }
    },
    nextSibling: {
      get: function () {
        const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1]
        return child || null
      }
    },
    previousSibling: {
      get: function () {
        const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1]
        return child || null
      }
    },
    innerHTML: {
      get: function () {
        if (this.nodeType === 3) return this.data
        return this.childNodes.reduce(function (last, current) {
          return last + current.outerHTML
        }, '')
      },
      set: function (str) {
        while (this.firstChild) {
          this.removeChild(this.firstChild)
        }
        // The parser adds the html to this
        HTMLParser(str, this)
      }
    },
    outerHTML: {
      get: function () {
        if (this.nodeType === 3) return this.data
        if (this.nodeType === 9 || this.nodeType === 11) return this.innerHTML
        return tag(this)
      },
      set: function (str) {
        var well = new SVGElement('well')
        HTMLParser(str, well)
        for (var i = 0, il = well.childNodes.length; i < il; ++i) {
          this.parentNode.insertBefore(well.childNodes[i], this)
        }
        this.parentNode.removeChild(this)
      }
    },
    id: {
      get: function () {
        return this.attrs.get('id')
      },
      set: function (id) {
        this.attrs.set('id', id)
      }
    },
    ownerSVGElement: {
      get: function () {
        return this.ownerDocument ? this.ownerDocument.documentElement : null
      }
    }
  },
  extend: {
    getStyleProxy: function () {
      return new Proxy(this._style, {
        get: function (target, key) {
          if (typeof key !== 'string') return Reflect.get(target, key)
          if (key === 'cssText') {
            return mapToCss(objectToMap(target))
          }
          if (key === 'setProperty') {
            return function (propertyName, value, priority) {
              Reflect.set(target, propertyName, value)
            }
          }
          key = camelCase(key)
          if (!target[key]) return ''
          return Reflect.get(target, key)
        },
        set: function (target, key, value) {
          value = hexToRGB(value.toString())
          key = camelCase(key)
          return Reflect.set(target, key, value)
        }
      })
    },
    setNewStyle: function (obj) {
      this._style = hexToRGB(obj)
      this.style = this.getStyleProxy()
    },
    setAttribute: function (name, value) {
      if (name === 'style') {
        return this.setNewStyle(mapToObject(cssToMap(value)))
      }
      this.attrs.set(name, value)
    },
    setAttributeNS: function (ns, name, value) {
      this.setAttribute(name, value)
    },
    removeAttribute: function (name) {
      this.attrs.delete(name)
    },
    removeAttributeNS: function (ns, name) {
      this.removeAttribute(name)
    },
    hasAttribute: function (name) {
      if (name === 'style') return !!this.style.cssText // TODO check
      return this.attrs.get(name) != null
    },
    getAttribute: function (name) {
      if (name === 'style') return this.style.cssText
      return this.attrs.get(name) == null ? null : this.attrs.get(name)
    },
    getAttributeNS: function (ns, name) {
      return this.getAttribute(name)
    },
    hasChildNodes: function () {
      return !!this.childNodes.length
    },
    appendChild: function (node) {
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        for (var i = 0, il = node.childNodes.length; i < il; ++i) {
          node.parentNode = this
          this.childNodes.push(node.childNodes[i])
        }
        node.childNodes.splice(0)
        return node
      }

      if (node.parentNode) { node.parentNode.removeChild(node) }

      node.parentNode = this

      this.childNodes.push(node)
      return node
    },
    insertBefore: function (node, before) {
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        let index = this.childNodes.indexOf(before)
        if (index === -1) return this.appendChild(node)

        this.childNodes = this.childNodes.slice(0, index).concat(node.childNodes, this.childNodes.slice(index))

        node.childNodes.splice(0)
        return node
      }

      if (node.parentNode) { node.parentNode.removeChild(node) }

      node.parentNode = this

      let index = this.childNodes.indexOf(before)
      if (index === -1) return this.appendChild(node)

      this.childNodes = this.childNodes.slice(0, index).concat(node, this.childNodes.slice(index))
      return node
    },
    removeChild: function (node) {

      node.parentNode = null
      var index = this.childNodes.indexOf(node)
      if (index === -1) return node
      this.childNodes.splice(index, 1)
      return node
    },
    replaceChild: function (newChild, oldChild) {
      newChild.parentNode && newChild.parentNode.removeChild(newChild)

      var before = oldChild.nextSibling
      this.removeChild(oldChild)
      this.insertBefore(newChild, before)
      return oldChild
    },
    getElementsByTagName: function (name) {
      return this.childNodes.reduce(function (last, current) {
        if (current.nodeName === name) last.push(current)
        return last.concat(current.getElementsByTagName(name))
      }, [])
    },
    getElementById: function (id) {
      for (var i = this.childNodes.length; i--;) {
        if (this.childNodes[i].id === id) return this.childNodes[i]
        var el = this.childNodes[i].getElementById(id)
        if (el) return el
      }
      return null
    },
    cloneNode: function (deep) {
      var clone = cloneNode(this)

      if (deep) {
        this.childNodes.forEach(function (el) {
          var node = el.cloneNode(deep)
          clone.appendChild(node)
        })
      }

      return clone
    },
    getRootNode: function () {
      if (!this.parentNode || this.parentNode.nodeType === 9) return this
      return this.parentNode.getRootNode()
    },
    isDefaultNamespace: function (ns) {
      return ns === this.attrs.get('xmlns')
    },
    isEqualNode: function (node) {
      return node.nodeName === this.nodeName && node.constructor === this.constructor && node.nodeType === this.nodeType
    },
    isSameNode (node) {
      return this === node
    },
    contains: function (node) {
      if (node === this) return false

      while (node.parentNode) {
        if (node === this) return true
        node = node.parentNode
      }
      return false
    },
    normalize: function () {
      this.childNodes = this.childNodes.reduce((last, curr) => {
        var n = last[last.length - 1]
        if (!n) return [curr]
        if (curr.nodeType === Node.TEXT_NODE) {
          if (!curr.data) return last

          if (last.nodeType === Node.TEXT_NODE) {
            n = new TextNode(last + ' ' + curr)
            curr = []
          }
        }
        last[last.length - 1] = n
        return last.concat(curr)
      }, [])
    },
    dropNameSpace: function (ns) {
      if (this.parentNode) {
        if (this.parentNode.attrs.get('xmlns') === ns) return true
        return this.parentNode.dropNameSpace(ns)
      }
      return false
    },
    getBBox: function () {
      return bbox(this).bbox()
    },
    getBoundingClientRect: function () {
      // The bounding client rect takes the screen ctm of the element
      // and converts the bounding box with it

      // however, normal bounding consists of:
      // - all children transformed
      // - the viewbox of the element if available

      // The boundingClientRect is not affected by its own viewbox
      // So we apply only our own transformations and parents screenCTM

      let m = this.matrixify()

      if (this.parentNode && this.parentNode.nodeName !== '#document') {
        m = this.parentNode.getScreenCTM().multiply(m)
      }

      // let m = this.getScreenCTM()

      return bbox(this).transform(m).bbox()
    },
    matrixify: function () {
      var matrix = (this.getAttribute('transform') || '')
        // split transformations
        .split(regex.transforms).slice(0, -1).map(function (str) {
          // generate key => value pairs
          var kv = str.trim().split('(')
          return [kv[0].trim(), kv[1].split(regex.delimiter).map(function (str) { return parseFloat(str.trim()) })]
        })
        // merge every transformation into one matrix
        .reduce(function (matrix, transform) {

          if (transform[0] === 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
          return matrix[transform[0]].apply(matrix, transform[1])

        }, new SVGMatrix())

      return matrix
    },
    // TODO: https://www.w3.org/TR/SVG2/coords.html#ComputingAViewportsTransform
    generateViewBoxMatrix () {
      var view = (this.getAttribute('viewBox') || '').split(regex.delimiter).map(parseFloat).filter(el => !isNaN(el))
      var width = parseFloat(this.getAttribute('width')) || 0
      var height = parseFloat(this.getAttribute('height')) || 0
      var x = parseFloat(this.getAttribute('x')) || 0
      var y = parseFloat(this.getAttribute('y')) || 0

      // TODO: If no width and height is given, width and height of the outer svg element is used
      if (!width || !height) {
        return new SVGMatrix().translate(x, y)
      }

      if (view.length !== 4) {
        view = [0, 0, width, height]
      }

      // first apply x and y if nested, then viewbox scale, then viewBox move
      return new SVGMatrix().translate(x, y).scale(width / view[2], height / view[3]).translate(-view[0], -view[1])
    },
    getCTM: function () {
      var m = this.matrixify()

      var node = this
      while ((node = node.parentNode)) {
        if (['svg', 'symbol', 'image', 'pattern', 'marker'].indexOf(node.nodeName) > -1) break
        m = m.multiply(node.matrixify())
        if (node.nodeName === '#document') return this.getScreenCTM()
      }

      return node.generateViewBoxMatrix().multiply(m)
    },
    getScreenCTM: function () {
      // ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
      // We follow Chromes behavior and include the viewbox in the screenCTM
      var m = this.getInnerMatrix()

      if (this.parentNode && this.parentNode.nodeName !== '#document') {
        return this.parentNode.getScreenCTM().multiply(m)
      }

      return m
    },
    getInnerMatrix: function () {
      var m = this.matrixify()

      if (['svg', 'symbol', 'image', 'pattern', 'marker'].indexOf(this.nodeName) > -1) {
        m = this.generateViewBoxMatrix().multiply(m)
      }
      return m
    },
    createSVGRect: function () {
      return new Box()
    },
    createSVGMatrix: function () {
      return new SVGMatrix()
    },
    createSVGPoint: function () {
      return new SVGPoint()
    },
    matches: function (query) {
      return new CssQuery(query).matches(this)
    },
    querySelectorAll: function (query) {
      var ret = []
      for (var i = 0, il = this.childNodes.length; i < il; ++i) {
        if (this.childNodes[i].matches(query)) ret.push(this.childNodes[i])
        ret = ret.concat(this.childNodes[i].querySelectorAll(query))
      }
      return ret
    },
    querySelector: function (query) {
      var ret = []
      for (var i = 0, il = this.childNodes.length; i < il; ++i) {
        if (this.childNodes[i].matches(query)) ret.push(this.childNodes[i])
        ret = ret.concat(this.childNodes[i].querySelectorAll(query))
      }
      return ret[0] || null
    },
    getComputedTextLength: function () {
      return this.getBBox().width
    },
    getPointAtLength: function (len) {
      return pathUtils.pointAtLength(this.getAttribute('d'), len)
    },
    getTotalLength: function () {
      return pathUtils.length(this.getAttribute('d'))
    },
    getFontDetails: function () {
      var node = this
      var fontSize = null
      var fontFamily = null
      var textAnchor = null
      var dominantBaseline = null

      const textContentElements = {
        text: true,
        tspan: true,
        tref: true,
        textPath: true,
        altGlyph: true,
        g: true
      }

      do {
        // TODO: stop on
        if (!fontSize) { fontSize = node.style.fontSize || node.getAttribute('font-size') }
        if (!fontFamily) { fontFamily = node.style.fontFamily || node.getAttribute('font-family') }
        if (!textAnchor) { textAnchor = node.style.textAnchor || node.getAttribute('text-anchor') }
        if (!dominantBaseline) { dominantBaseline = node.style.dominantBaseline || node.getAttribute('dominant-baseline') }
        // TODO: check for alignment-baseline in tspan, tref, textPath, altGlyph
        // TODO: alignment-adjust, baseline-shift
        /*
        if(!alignmentBaseline)
        alignmentBaseline = this.style.alignmentBaseline || this.getAttribute('alignment-baseline')
        */

      } while (
        node.parentNode.nodeType === 1
        && (node.parentNode.nodeName in textContentElements)
        && (node = node.parentNode)
      )

      return {
        fontFamily,
        fontSize,
        textAnchor: textAnchor || 'start',
        // TODO: use central for writing-mode === horizontal https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
        dominantBaseline: dominantBaseline || 'alphabetical',
        fontFamilyMappings: this.ownerDocument.fontFamilyMappings,
        fontDir: this.ownerDocument.fontDir,
        preloaded: this.ownerDocument._preloaded
      }
    }
  }
})

extendClass(Node, {
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
})

const SVGElement = invent({
  name: 'SVGElement',
  create: function (name, props) {
    Node.call(this, name, props)
  },
  inherit: Node
})

const mapToAttributeArray = function (themap) {
  return mapMap(themap, function (value, key) {
    return new AttributeNode(key, value)
  })
}

const DocumentFragment = invent({
  name: 'DocumentFragment',
  create: function () {
    Node.call(this, '#document-fragment')
    this.nodeType = 11
  },
  inherit: Node
})

const AttributeNode = invent({
  name: 'AttributeNode',
  create: function (name = '', value = null) {
    Node.call(this, name)
    this.nodeValue = value
  },
  inherit: Node
})

const CharacterData = invent({
  name: 'CharacterData',
  create: function (name, props) {
    throw new Error('CharacterData cannot be created directly')
  },
  inherit: Node
})

const TextNode = invent({
  name: 'TextNode',
  create: function (name, props) {
    Node.call(this, name, props)
    this.nodeType = 3
  },
  inherit: CharacterData
})

const Comment = invent({
  name: 'Comment',
  create: function (name, props) {
    Node.call(this, name, props)
    this.nodeType = 8
  },
  inherit: CharacterData
})

const HTMLParser = function (str, el) {
  this.currentTag = el
  var ownerDocument = el.ownerDocument

  var parser = sax.parser(true)
  parser.ontext = t => this.currentTag.appendChild(new TextNode('#text', {
    data: t,
    ownerDocument: ownerDocument
  }))
  parser.onopentag = node => {
    var newSvgElement = new SVGElement(node.name, {
      attrs: node.attributes,
      ownerDocument: ownerDocument
    })
    this.currentTag.appendChild(newSvgElement)
    this.currentTag = newSvgElement
  }
  parser.onclosetag = node => {
    this.currentTag = this.currentTag.parentNode
  }

  parser.write(str)
}

module.exports = {
  Node,
  SVGElement,
  DocumentFragment,
  AttributeNode,
  TextNode,
  Comment
}
