matrix = require('gl-matrix').mat2d
var sizeOf = require('image-size');


var extend = function() {
  var modules, methods, key, i

  // Get list of modules
  modules = [].slice.call(arguments)

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--)
    for (key in methods)
      modules[i].prototype[key] = methods[key]
}

var invent = function(config) {
  var initializer = config.create || function() {}

  if(config.name)
    Object.defineProperty(initializer, 'name', { value: config.name })

  // Inherit prototype
  if (config.inherit)
    //initializer.prototype = new config.inherit
    initializer.prototype = Object.create(config.inherit.prototype);

  initializer.prototype.constructor = initializer

  // Extend with methods
  if (config.extend)
    extend(initializer, config.extend)

  if (config.props)
    for(var i in config.props)
      Object.defineProperty(initializer.prototype, i, config.props[i])

  return initializer
}

var map = function(map, cb) {
  var arr = []
  map.forEach(function(value, key){
    arr.push(cb(value, key))
  })
  return arr
}

var mapToCss = function(myMap){
  return map(myMap, function(value, key){
    if(!value) return false
    return key + ': ' + value
  }).filter(function(el){return !!el}).join('; ') || null
}

var cssToMap = function(css){
  return new Map(css.split(/\s*;\s*/).filter(function(el){return !!el}).map(function(el){
    return el.split(/\s*:\s*/)
  }))
}

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var tag = function(node) {

  var attrs = new Map(node.attrs)
    , name = node.nodeName
    , style = node.getAttribute('style')

  attrs.delete('style')
  if(style){
    attrs.set('style', style)
  }

  if(attrs.has('xmlns') && node.dropNameSpace(attrs.get('xmlns'))){
    attrs.delete('xmlns')
  }

  attrs = map(attrs, function(value, key) {
    return key + '="' + htmlEntities(value) + '"'
  })

  return '<' + [].concat(name, attrs).join(' ') + '>' + node.innerHTML + '</' + name + '>'
}

function objectToMap(obj) {
  if(obj instanceof Map) return new Map(obj)
  return Object.keys(obj).reduce((map, key) => map.set(key, obj[key]), new Map());
}

function mapToObject(map) {
  var obj = {}
  map.forEach(function(value, key) {
    obj[key] = value
  })
  return obj
}

function mapToAttributeArray(themap) {
  return map(themap, function(value, key) {
    return new AttributeNode(key, value)
  })
}

function indexOfAttribute(attributes, name){
  for(var i = attributes.length; i--;)
    if(attributes[i].nodeName == name) return i

  return -1
}

function cloneNode(node) {

  var clone = new node.constructor(node.nodeName, {
    attrs: node.attrs,
    data: node.data
  })

  // clone styles
  Object.keys(node._style).forEach(function(el){clone._style[el] = node._style })
  clone.nodeType = node.nodeType

  return clone
}

function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function(m, g) {
    return g.toUpperCase()
  })
}

// Ensure to six-based hex
function fullHex(hex) {
  return hex.length == 4 ?
    [ '#',
      hex.substring(1, 2), hex.substring(1, 2)
    , hex.substring(2, 3), hex.substring(2, 3)
    , hex.substring(3, 4), hex.substring(3, 4)
    ].join('') : hex
}

function hexToRGB(a) {
  if(typeof a == 'object'){
    for(var i in a) {
      a[i] = hexToRGB(a[i])
    }
    return a
  }

  if(!/#[0-9a-f]{3,6}/.test(a))
    return a

  a = fullHex(a)


  return 'rgb(' + [
    parseInt(a.slice(1,3), 16),
    parseInt(a.slice(3,5), 16),
    parseInt(a.slice(5,7), 16)
    ].join(',') + ')'
}

var EventTarget = invent({
  create: function() {
    this.events = {}
  },
  extend: {
    addEventListener: function(event, listener) {
      if(typeof listener != 'function') throw new Error('listener has to be a function')
      ;(this.events[event] = this.events[event] || []).push(listener)
    },
    removeEventListener: function(event, listener) {
      var e
      event = event.toLowerCase()
      if(!this.events[event]) return
      var index = (e = this.events[event]).indexOf(listener)
      this.events[event] = e.slice(0, index).concat(e.slice(index+1))
    },
    dispatchEvent: function(event) {
      var name = event.type
      if(!this.events[name]) return

      this.events[name].forEach(function(el) {
        el(event)
      })
    }
  }
})

var Event = invent({
  name: 'Event',
  create: function(type){
    this.type = type
    this.cancelable = false
    this.defaultPrevented = false
  },
  extend: {
    preventDefault: function(){
      this.defaultPrevented = true
    }
  }
})

var CustomEvent = invent({
  name: 'CustomEvent',
  create: function(name, props = {}) {
    Event.call(this, name)

    this.detail = props.detail || null
    this.cancelable = props.cancelable || false
  },
  inherit: Event
})

var regex = {
  // splits a transformation chain
  transforms:       /\)\s*,?\s*/
  // split at whitespace and comma
, delimiter:        /[\s,]+/

  // The following regex are used to parse the d attribute of a path

  // Matches all hyphens which are not after an exponent
, hyphen:           /([^e])\-/gi

  // Replaces and tests for all path letters
, pathLetters:      /[MLHVCSQTAZ]/gi

  // yes we need this one, too
, isPathLetter:     /[MLHVCSQTAZ]/i

  // matches 0.154.23.45
, numbersWithDots:  /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi

  // matches .
, dots:             /\./g
}

// Map matrix array to object
function arrayToMatrix(a) {
  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
}

var Node = invent({
  name: 'Node',
  create: function(name = '', props = {}) {
    EventTarget.call(this)

    this.nodeName = name
    this.nodeType = 1
    this.nodeValue = 0
    this.childNodes = []

    this._style = props.attrs && props.attrs.style && mapToObject(cssToMap(props.attrs.style)) || {}

    this.attrs = objectToMap(props.attrs || {})
    this.data = props.data || ''

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null
    this.cnt = 0

    this.style = this.getStyleProxy()

    if(props.childNodes)
      for(var i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
  },
  inherit: EventTarget,
  props: {
    attributes: {
      get: function() {
        return mapToAttributeArray(this.attrs)
      }
    },
    textContent: {
      get: function() {
        if (this.nodeType == 3) return this.data

        return this.childNodes.reduce(function(last, current){
          return last + current.textContent
        }, '')
      },
      set: function(text) {
        this.childNodes = [new TextNode('#text', {data:text})]
      }
    },
    firstChild: {
      get: function() {
        return this.childNodes[0]
      }
    },
    lastChild: {
      get: function() {
        return this.childNodes[this.childNodes.length-1]
      }
    },
    nextSibling: {
      get: function() {
        return this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this)+1] || null
      }
    },
    previousSibling: {
      get: function() {
        return this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this)-1] || null
      }
    },
    innerHTML: {
      get: function() {
        if (this.nodeType == 3) return this.data
        return this.childNodes.reduce(function(last, current){
          return last + current.outerHTML
        }, '')
      }
    },
    outerHTML: {
      get: function() {
        if (this.nodeType == 3) return this.data
        return tag(this)
      }
    },
    id: {
      get: function() {
        return this.attrs.get('id')
      },
      set: function(id) {
        this.attrs.set('id', id)
      }
    }
  },
  extend: {
    getStyleProxy: function(){
      return new Proxy(this._style, {
        get: function(target, key) {
          if(typeof key !== 'string') return Reflect.get(target, key)
          if(key == 'cssText') {
            return mapToCss(objectToMap(target))
          }
          key = camelCase(key)
          if(!target[key]) return ''
          return Reflect.get(target, key)
        },
        set: function(target, key, value) {
          value = hexToRGB(value.toString())
          key = camelCase(key)
          Reflect.set(target, key, value)
        }
      })
    },
    setNewStyle: function(obj) {
      this._style = hexToRGB(obj)
      this.style = this.getStyleProxy()
    },
    setAttribute: function(name, value) {
      if(name == 'style') {
        return this.setNewStyle(mapToObject(cssToMap(value)))
      }
      this.attrs.set(name, value)
    },
    setAttributeNS: function(ns, name, value) {
      this.setAttribute(name, value)
    },
    removeAttribute: function(name) {
      this.attrs.delete(name)
    },
    removeAttributeNS: function(ns, name) {
      this.removeAttribute(name)
    },
    getAttribute: function(name) {
      if(name == 'style') return this.style.cssText
      return this.attrs.get(name) == null ? null : this.attrs.get(name)
    },
    getAttributeNS: function(ns, name) {
      return this.getAttribute(name)
    },
    hasChildNodes: function() {
      return !!this.childNodes.length
    },
    appendChild: function(node) {
      if(node.parentNode)
        node.parentNode.removeChild(node)

      node.parentNode = this

      this.childNodes.push(node)
      return node
    },
    insertBefore: function(node, before) {
      if(node.parentNode)
        node.parentNode.removeChild(node)

      node.parentNode = this

      var index = this.childNodes.indexOf(before)
      if(index == -1) return this.appendChild(node)

      this.childNodes = this.childNodes.slice(0, index).concat(node, this.childNodes.slice(index))
      return node
    },
    removeChild: function(node) {

      node.parentNode = null
      var index = this.childNodes.indexOf(node)
      if(index == -1) return node
      this.childNodes.splice(index, 1)
      return node
    },
    getElementsByTagName: function(name) {
      return this.childNodes.reduce(function(last, current) {
        if(current.nodeName == name) last.push(current)
        return last.concat(current.getElementsByTagName(name))
      }, [])
    },
    getElementById: function(id) {
      for(var i = this.childNodes.length; i--;) {
        if(this.childNodes[i].id == id) return this.childNodes[i]
        var el = this.childNodes[i].getElementById(id)
        if(el) return el
      }
      return null
    },
    cloneNode: function(deep) {
      var clone = cloneNode(this)

      if(deep) {
        this.childNodes.forEach(function(el) {
          var node = el.cloneNode(deep)
          clone.appendChild(node)
        })
      }

      return clone
    },
    getRootNode: function() {
      if(!this.parentNode || this.parentNode.nodeType == 9) return this
      return this.parentNode.getRootNode()
    },
    isDefaultNamespace: function(ns) {
      return ns == this.attrs.xmlns
    },
    dropNameSpace: function(ns) {
      if(this.parentNode){
        if(this.parentNode.attrs.get('xmlns') == ns) return true
        return this.parentNode.dropNameSpace(ns)
      }
      return false
    },
    getBBox: function() {
      return getBBoxFor(this)
    },
    getBoundingClientRect: function() {
      return getBBoxFor(this).transform(this.getScreenCTM())
    },
    matrixify: function() {
      var matrix = (this.getAttribute('transform') || '')
        // split transformations
        .split(regex.transforms).slice(0,-1).map(function(str){
          // generate key => value pairs
          var kv = str.trim().split('(')
          return [kv[0], kv[1].split(regex.delimiter).map(function(str){ return parseFloat(str) })]
        })
        // merge every transformation into one matrix
        .reduce(function(matrix, transform){

          if(transform[0] == 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
          return matrix[transform[0]].apply(matrix, transform[1])

        }, new SVGMatrix())

      return matrix
    },
    generateViewBoxMatrix() {
      var view = (this.getAttribute('viewBox') || '').split(regex.delimiter).map(parseFloat).filter(el => !isNaN(el))
      var width = parseFloat(this.getAttribute('width')) || 0
      var height = parseFloat(this.getAttribute('height')) || 0
      var x = parseFloat(this.getAttribute('x')) || 0
      var y = parseFloat(this.getAttribute('y')) || 0

      // TODO: If no width and height is given, width and height of the outer svg element is used
      if(!width || !height){
        return new SVGMatrix().translate(x, y)
      }

      if(view.length != 4){
        view = [0, 0, width, height]
      }

      // first apply x and y if nested, then viewbox scale, then viewBox move
      return new SVGMatrix().translate(x, y).scale(width/view[2], height/view[3]).translate(-view[0], -view[1])
    },
    getCTM: function() {SVG.Doc, SVG.Nested, SVG.Symbol, SVG.Image, SVG.Pattern, SVG.Marker, SVG.ForeignObject, SVG.View
      var m = this.matrixify()
      
      var node = this
      while(node = this.parentNode){
        if(['svg', 'symbol', 'image', 'pattern', 'marker'].indexOf(node.nodeName) > -1) break
        m = m.multiply(node.matrixify())
        if(node.nodeName == '#document') return this.getScreenCTM()
      }

      return node.generateViewBoxMatrix().multiply(m)
    },
    getScreenCTM: function() {
      var m = this.matrixify()

      if(['svg', 'symbol', 'image', 'pattern', 'marker'].indexOf(this.nodeName) > -1){
        m = this.generateViewBoxMatrix().multiply(m)
      }

      if(this.parentNode && this.parentNode.nodeName != '#document'){
        return this.parentNode.getScreenCTM().multiply(m)
      }

      return m
    },
    createSVGRect: function() {},
    createSVGMatrix: function() {
      return new SVGMatrix()
    },
    createSVGPoint: function() {
      return new SVGPoint()
    },
    matches: function(query) {

      if(query.indexOf(',') > -1){
        var parts = query.split(',')
        for(var i = 0, il = parts.length; i < il; ++i){
          if(this.matches(parts[i])) return true
        }
        return false
      }

      query = ['%'].concat(query
        .trim()
        .replace(/\s+/g, ' ').replace(/(\w) (\w)/g, '$1%$2')
        .replace(/[>~+,%]/g, " $& ")
        .split(/\s+/)
        )
        .reduce((l,c,i) => {
          i % 2 ? l[l.length-1].push(c) : l.push([c])
          return l
        }, [])

      return this.matchHelper(query)
    },
    matchHelper: function(query) {
      query = query.slice()
      var last = query.pop()

      if(!new QueryNode(last[1]).matches(this))
        return false

      if(!query.length) return true

      if(last[0] == ',') return true

      if(last[0] == '+'){
        return !!this.previousSibling && this.previousSibling.matchHelper(query)
      }

      if(last[0] == '>'){
        return !!this.parentNode && this.parentNode.matchHelper(query)
      }

      if(last[0] == '~'){
        var node = this
        while(node = node.previousSibling){
          if(node.matchHelper(query))
            return true
        }
        return false
      }

      if(last[0] == '%'){
        var node = this
        while(node = node.parentNode){
          if(node.matchHelper(query))
            return true
        }
        return false
      }
    },
    querySelectorAll: function(query) {
      var ret = []
      for(var i = 0, il = this.childNodes.length; i < il; ++i){
        if(this.childNodes[i].matches(query)) ret.push(this.childNodes[i])
        ret = ret.concat(this.childNodes[i].querySelectorAll(query))
      }
      return ret
    },
    querySelector: function(query) {
      var ret = []
      for(var i = 0, il = this.childNodes.length; i < il; ++i){
        if(this.childNodes[i].matches(query)) ret.push(this.childNodes[i])
        ret = ret.concat(this.childNodes[i].querySelectorAll(query))
      }
      return ret[0] || null
    },
    getComputedTextLength: function() {
      return (this.attrs.get('font-size')||12) * this.textContent.length * 0.6
    },
    getPointAtLength: function(len) {
      var segs = this._getSegments()
        , segLengths = segs.map(el => el.length())
        , length = segLengths.reduce((l,c) => l+c,0)
        , i = 0

      t = len/length

      // shortcut for trivial cases
      if(t >= 1) return segs[segs.length-1].p2.native()
      if(t <= 0) return segs[0].p1.native()

      // remove move commands at the very end of the path
      while(segs[segs.length-1] instanceof Move) segs.pop()

      var segEnd = 0

      for(il = segLengths.length; i < il; ++i) {
        var k = segLengths[i]/length
        segEnd+= k

        if(segEnd > t){
          break
        }
      }

      var ratio = length/segLengths[i]
      t = ratio*(t - segEnd) + 1

      return segs[i].pointAt(t).native()
    },
    _getSegments: function() {
      var d = this.getAttribute('d')
        , arr = pathParser(d)
        , p = new Point()
        , r = new Point()
        , p0 = new Point()

      return arr.map(el => helpers.handle[el[0]](el.slice(1), p, r, p0))
    },
    getTotalLength: function() {
      return this._getSegments()
        .reduce((l,c) => l+c.length(), 0)
    }
  }
})



var TextNode = invent({
  name: 'TextNode',
  create: function(name, props) {
    Node.call(this, name, props)
    this.nodeType = 3
  },
  inherit: Node
})

var AttributeNode = invent({
  name: 'AttributeNode',
  create: function(name='', value=null) {
    Node.call(this, name)
    this.nodeValue = value
  },
  inherit: Node
})

var Document = invent({
  name: 'Document',
  create: function(root) {
    Node.call(this, '#document')
    this.nodeType = 9
    var root = this.createElement(root)
    this.appendChild(root)
    root.ownerDocument = this
    this.documentElement = root
  },
  inherit: Node,
  extend: {
    createElementNS: function(ns, name){
      return new SVGElement(name, {
        attrs: {xmlns: ns}
      })
    },
    createElement: function(name) {
      return new SVGElement(name, {ownerDocument: this})
    },
    createTextNode: function(text) {
      return new TextNode('#text', {data:text})
    },
    createAttribute: function(name) {
      return new AttributeNode(name)
    }
  }
})

var Window = invent({
  create: function() {
    EventTarget.call(this)
    this.document = new Document('svg')
  },
  inherit: EventTarget
})

var SVGElement = invent({
  name: 'SVGElement',
  create: function(name, props) {
    Node.call(this, name, props)
  },
  inherit: Node
})

var SVGPoint = invent({
  name: 'SVGPoint',
  create: function() {
    this.x = 0
    this.y = 0
  },
  extend: {
    matrixTransform: function(m) {
      var r = new SVGPoint()
      r.x = m.a * this.x + m.c * this.y + m.e * 1
      r.y = m.b * this.x + m.d * this.y + m.f * 1
      return r
    }
  }
})

var matrixFactory = function(a,b,c,d,e,f){
  var r = new SVGMatrix()
  r.a = a
  r.b = b
  r.c = c
  r.d = d
  r.e = e
  r.f = f
  return r
}

var radians = function(d){
  return d % 360 * Math.PI / 180
}

var SVGMatrix = invent({
  name: 'SVGMatrix',
  create: function() {
    this.a = this.d = 1
    this.b = this.c = this.e = this.f = 0
  },
  extend: {
    multiply: function(m) {
      var r = new SVGMatrix()
      r.a = this.a * m.a + this.c * m.b + this.e * 0
      r.b = this.b * m.a + this.d * m.b + this.f * 0
      r.c = this.a * m.c + this.c * m.d + this.e * 0
      r.d = this.b * m.c + this.d * m.d + this.f * 0
      r.e = this.a * m.e + this.c * m.f + this.e * 1
      r.f = this.b * m.e + this.d * m.f + this.f * 1
      return r
    },
    translate: function(x, y) {
      return this.multiply(matrixFactory(1,0,0,1,x,y))
    },
    inverse: function() {
      var t = matrix.fromValues(this.a, this.b, this.c, this.d, this.e, this.f)
      var r = matrix.create()
      matrix.invert(r, t)
      return matrixFactory(...r)
    },
    toString: function() {
      return 'SVGMatrix'
    },
    scale: function(scale) {
      return this.multiply(matrixFactory(scale,0,0,scale,0,0))
    },
    rotate: function(r) {
      r = r % 360 * Math.PI / 180
      return this.multiply(matrixFactory(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0))
    },
    skew: function(x, y) {
      return this.multiply(matrixFactory(1, Math.tan(radians(y)), Math.tan(radians(x)), 1, 0, 0))
    },
    skewX: function(x) {
      return this.skew(x,0)
    },
    skewY: function(y) {
      return this.skew(0,y)
    }
  }
})

var HTMLImageElement  = invent({
  name: 'HTMLImageElement',
  create: function(){
    Node.call(this, 'img')
    this.width = 0
    this.height = 0
    this.naturalWidth = 0
    this.naturalHeight = 0
  },
  inherit: Node,
  props: {
    src: {
      get: function() {
        return this.attrs.get('src')
      },
      set: function(val) {
        this.attrs.set('src', val)
        sizeOf(val, function (err, size) {
          if(err){
            this.dispatchEvent(new Event('error', this))
            return
          }

          this.width = this.naturalWidth = size.width
          this.height = this.naturalHeight = size.height

          this.dispatchEvent(new Event('load', this))
        }.bind(this));
      }
    },
    height: {
      get: function() {
        return this.attrs.get('height')
      },
      set: function(val) {
        this.attrs.set('height', val)
      }
    },
    height: {
      get: function() {
        return this.attrs.get('height')
      },
      set: function(val) {
        this.attrs.set('height', val)
      }
    },
  }
})


var getBBoxFor = (node) => {

  if(node.nodeType != 1) return new Box()

  switch(node.nodeName) {
    case 'rect':
    case 'image':
      return new Box(
        parseFloat(node.getAttribute('x')) || 0,
        parseFloat(node.getAttribute('y')) || 0,
        parseFloat(node.getAttribute('width')) || 0,
        parseFloat(node.getAttribute('height')) || 0
      )
    case 'svg':
    case 'g':
    case 'mask':
    case 'clipPath':
    case 'a':
    case 'defs':
    case 'glyph':
    case 'altGlyph,':
    case 'missing-glyph':
    case 'marker':
    case 'pattern':
    case 'symbol':
      var first = node.firstChild
      if(!first) return new Box
      return node.childNodes.slice(1).reduce((last,curr) => {
        return last.merge(getBBoxFor(curr))
      }, getBBoxFor(first))
    case 'circle':
      var r = parseFloat(node.getAttribute('r'))
        , x = parseFloat(node.getAttribute('cx')) - r
        , y = parseFloat(node.getAttribute('cy')) - r

      return new Box(
        x, y,
        2 * r,
        2 * r
      )
    case 'ellipse':
      var rx = parseFloat(node.getAttribute('rx'))
        , ry = parseFloat(node.getAttribute('ry'))
        , x  = parseFloat(node.getAttribute('cx')) - rx
        , y  = parseFloat(node.getAttribute('cy')) - ry

      return new Box(
        x, y,
        2 * rx,
        2 * ry
      )
    case 'line':
      var x1 = parseFloat(node.getAttribute('x1'))
      var x2 = parseFloat(node.getAttribute('x2'))
      var y1 = parseFloat(node.getAttribute('y1'))
      var y2 = parseFloat(node.getAttribute('y2'))
      return new Box(
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.abs(x2-x1),
        Math.abs(y2-y1)
      )
    case 'polyline':
    case 'polygon':

      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
        , points = node.getAttribute('points').split(regex.delimiter).map(parseFloat)
            .reduce((l,c,i) => {
              i % 2 ? l[l.length-1].push(c) : l.push([c])
              return l
            }, [])
            .forEach(el => {
              xMin = Math.min(xMin,el[0])
              xMax = Math.max(xMax,el[0])
              yMin = Math.min(yMin,el[1])
              yMax = Math.max(yMax,el[1])
            })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )
    case 'path':
      var d = node.getAttribute('d')
        , arr = pathParser(d)
        , p = new Point()
        , r = new Point()
        , p0 = new Point()

      return arr
        .map(el => helpers.handle[el[0]](el.slice(1), p, r, p0)).reduce((l,c) => l.concat(c), [])
        .reduce((l,c) => l == null ? c.bbox() : l.merge(c.bbox()), null)
    case 'use':
      var ref = node.getAttribute('href')
      return node.getRootNode().getElementById(ref.slice(1)).getBBox()
    default: return new Box
  }
}

var Move = invent({
  name: 'Move',
  create: function(p) {
    this.p1 = p.clone()
  }, extend: {
    bbox(){ return new Box(this.p1.x, this.p1.y, 0, 0) },
    length() { return 0 }
  }
})

var Arc = invent({
  name: 'Arc',
  create: function(p1, p2, rx, ry, φ, arc, sweep) {
    this.p1 = p1.clone()
    this.p2 = p2.clone()
    this.arc = arc
    this.sweep = sweep

    var cosφ = Math.cos(φ/180 * Math.PI)
      , sinφ = Math.sin(φ/180 * Math.PI)

    var p1_ = new Point(
      (p1.x - p2.x) / 2,
      (p1.y - p2.y) / 2
    ).transform(matrixFactory(
      cosφ, -sinφ, sinφ, cosφ, 0, 0
    ))

    var ratio = (p1_.x*p1_.x)/(rx*rx) + (p1_.y*p1_.y)/(ry*ry)

    if(ratio > 1) {
      rx = Math.sqrt(ratio)*rx
      ry = Math.sqrt(ratio)*ry
    }

    var divisor1 = rx*rx*p1_.y*p1_.y
    var divisor2 = ry*ry*p1_.x*p1_.x

    var c_ = new Point(
      rx*p1_.y/ry,
      -ry*p1_.x/rx
    ).mul(Math.sqrt(
      (rx*rx*ry*ry - divisor1 - divisor2) /
      //-------------------------------//
             (divisor1 + divisor2)
    ))

    if(arc == sweep) c_ = c_.mul(-1)

    var c = c_.transform(matrixFactory(
      cosφ, sinφ, -sinφ, cosφ, 0, 0
    )).add(new Point(
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2
    ))

    var anglePoint = new Point(
      (p1_.x - c_.x) / rx,
      (p1_.y - c_.y) / ry
    )

    var θ = new Point(1,0).angleTo(anglePoint)

    var Δθ = anglePoint.angleTo(new Point(
      (-p1_.x - c_.x) / rx,
      (-p1_.y - c_.y) / ry
    ))

    Δθ = (Δθ % (2*Math.PI))

    if( sweep && θ > 0) θ -= 2*Math.PI
    if(!sweep && θ < 0) θ += 2*Math.PI

    this.c = c
    this.theta = θ * 180 / Math.PI
    this.theta2 = (θ + Δθ) * 180 / Math.PI
    this.delta = Δθ * 180 / Math.PI
    this.rx = rx
    this.ry = ry
    this.phi = φ
    this.cosφ = cosφ
    this.sinφ = sinφ

  }, extend: {
    pointAt: function(t) {
      var tInAngle = (this.theta + t * this.delta) / 180 * Math.PI
        , sinθ = Math.sin(tInAngle)
        , cosθ = Math.cos(tInAngle)
        
      return new Point(
        this.cosφ * this.rx*cosθ - this.sinφ * this.ry*sinθ + this.c.x,
        this.sinφ * this.rx*cosθ + this.cosφ * this.ry*sinθ + this.c.y
      )
    },
    length: function() {
      var length = this.p2.sub(this.p1).abs()

      var ret = this.splitAt(0.5)
      var len1 = ret[0].p2.sub(ret[0].p1).abs()
      var len2 = ret[1].p2.sub(ret[1].p1).abs()

      if(len1 + len2 - length < 0.00001){
        return len1 + len2
      }

      return ret[0].length() + ret[1].length()
    },
    splitAt: function(t) {
      var tInAngle = (this.theta + t * this.delta) / 180 * Math.PI

      var arc1 = this.clone()
      var arc2 = this.clone()

      arc1.delta = this.delta * t
      arc2.delta = this.delta * (1-t)

      arc1.p2 = this.pointAt(t)
      arc2.p1 = this.pointAt(1-t)

      arc1.theta2 = (this.theta + arc1.delta)
      arc2.theta = (this.theta + arc1.delta)

      return [arc1, arc2]
    },
    clone: function() {
      return new Arc(this.p1, this.p2, this.rx, this.ry, this.phi, this.arc, this.sweep)
    },
    bbox: function(t) {
      var θ01 = Math.atan(-this.sinφ/this.cosφ * this.ry/this.rx) * 180/Math.PI
        , θ02 = Math.atan( this.cosφ/this.sinφ * this.ry/this.rx) * 180/Math.PI
        , θ1 = this.theta
        , θ2 = this.theta2
        , angleToTest = [θ01, θ02, (θ01+180), (θ02+180), (θ01-180), (θ02-180)]

      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
        , points = angleToTest.filter(function(angle) {
            return angle > θ1 && angle < θ2
          }).map(function(angle) {
            return this.pointAt((angle-θ1)/this.delta)
          }.bind(this)).concat(this.p1, this.p2)

      points.forEach(function(p) {
        xMin = Math.min(xMin,p.x)
        xMax = Math.max(xMax,p.x)
        yMin = Math.min(yMin,p.y)
        yMax = Math.max(yMax,p.y)
      })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )
    },
    toPathFragment: function() {
      var arc = Arc.fromCenterForm(
        this.c,
        this.ry, this.ry,
        this.phi,
        this.theta,
        this.delta
      )

      return ['A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y].join(' ')
    },
    toPath: function() {
      var arc = Arc.fromCenterForm(
        this.c,
        this.ry, this.ry,
        this.phi,
        this.theta,
        this.delta
      )

      return ['M', this.p1.x, this.p1.y, 'A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y].join(' ')
    }
  }
})

Arc.fromCenterForm = function(c, rx, ry, φ, θ, Δθ) {
  var cosφ = Math.cos(φ/180 * Math.PI)
    , sinφ = Math.sin(φ/180 * Math.PI)
    , cosθ = Math.cos(θ/180 * Math.PI)
    , sinθ = Math.sin(θ/180 * Math.PI)
    , m = matrixFactory(cosφ, sinφ, -sinφ, cosφ, 0, 0)

  var p1 = new Point(
    rx * Math.cos(θ/180 * Math.PI),
    ry * Math.sin(θ/180 * Math.PI)
  ).transform(m).add(c)

  var p2 = new Point(
    rx * Math.cos((θ+Δθ)/180 * Math.PI),
    ry * Math.sin((θ+Δθ)/180 * Math.PI)
  ).transform(m).add(c)

  var arc = Math.abs(Δθ) > 180 ? 1 : 0
  var sweep = Δθ > 0 ? 1 : 0

  return new Arc(p1, p2, rx, ry, φ, arc, sweep)
}

var helpers = {
  handle: {
    M: function(c, p, r, p0) {
      p.x = p0.x = c[0]
      p.y = p0.y = c[1]

      return new Move(p)
    },
    L: function(c, p) {
      var ret = new Line(p.x, p.y, c[0], c[1])//.offset(o)
      p.x = c[0]
      p.y = c[1]
      return ret
    },
    H: function(c, p) {
      return this.L([c[0], p.y], p)
    },
    V: function(c, p) {
      return this.L([p.x, c[0]], p)
    },
    Q: function(c, p, r) {
      var ret = Cubic.fromQuad(p, new Point(c[0], c[1]), new Point(c[2], c[3]))//.offset(o)
      p.x = c[2]
      p.y = c[3]

      var reflect = new Point(c[0], c[1]).reflectAt(p)
      r.x = reflect.x
      r.y = reflect.y

      return ret
    },
    T: function(c, p, r) {
      c = [r.x, r.y].concat(c)
      return this.Q(c, p, r)
    },
    C: function(c, p, r) {
      var ret = new Cubic(p, new Point(c[0], c[1]), new Point(c[2], c[3]), new Point(c[4], c[5]))//.offset(o)
      p.x = c[4]
      p.y = c[5]
      var reflect = new Point(c[2], c[3]).reflectAt(p)
      r.x = reflect.x
      r.y = reflect.y
      return ret
    },
    S: function(c, p, r) {
      c = [r.x, r.y].concat(c)
      return this.C(c, p, r)
    },
    Z: function(c, p, r, p0) {
      return this.L([p.x, p.y],p0)
    },
    A: function(c, p, r) {
      return new Arc(p, new Point(c[5], c[6]), c[0], c[1], c[2], c[3], c[4])
    }
  }
}

var mlhvqtcsa = 'mlhvqtcsa'.split()

for(var i = 0, il = mlhvqtcsa.length; i < il; ++i){
  helpers.handle[mlhvqtcsa[i]] = function(c, p, r, p0) {
    if(i == 'h') c[0] = c[0] + p.x
    else if(i == 'v') c[0] = c[0] + p.y
    else if(i == 'a'){
      c[5] = c[5] + p.x,
      c[6] = c[6] + p.y
    }
    else
      for(var j = 0, jl = c.length; j < jl; ++j) {
        c[j] = c[j] + (j%2 ? p.x : p.y)
      }

    this[mlhvqtcsa[i].toUpperCase()](c, p, r, p0)
  }
}


Box = invent({
  name:'Box',
  create: function(source) {
    var base = [0,0,0,0]
    source = typeof source === 'string' ?
        source.split(regex.delimiter).map(parseFloat) :
      Array.isArray(source) ?
        source :
      typeof source == 'object' ?
        [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] :
      arguments.length == 4 ?
        [].slice.call(arguments) :
        base

    this.x = this.left = source[0]
    this.y = this.top = source[1]
    this.width = source[2]
    this.height = source[3]
  }
, extend: {
    // Merge rect box with another, return a new instance
    merge: function(box) {
      if(!box.x && !box.y && !box.width && !box.height) return new Box(this)
      var x = Math.min(this.x, box.x)
        , y = Math.min(this.y, box.y)

      return new Box(
        x, y,
        Math.max(this.x + this.width,  box.x + box.width)  - x,
        Math.max(this.y + this.height, box.y + box.height) - y
      )
    }

  , transform: function(m) {
      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, p

      var pts = [
        new Point(this.x, this.y),
        new Point(this.x+this.width, this.y),
        new Point(this.x, this.y+this.height),
        new Point(this.x+this.width, this.y+this.height)
      ]

      pts.forEach(function(p) {
        p = p.transform(m)
        xMin = Math.min(xMin,p.x)
        xMax = Math.max(xMax,p.x)
        yMin = Math.min(yMin,p.y)
        yMax = Math.max(yMax,p.y)
      })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )
    }
  }
})


function pathRegReplace(a, b, c, d) {
  return c + d.replace(SVG.regex.dots, ' .')
}

var pathParser = (d) => {
  // prepare for parsing
  var i, x0, y0, s, seg, arr
    , x = 0
    , y = 0
    , paramCnt = { 'M':2, 'L':2, 'H':1, 'V':1, 'C':6, 'S':4, 'Q':4, 'T':2, 'A':7 }


  d = d
    .replace(regex.numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
    .replace(regex.pathLetters, ' $& ') // put some room between letters and numbers
    .replace(regex.hyphen, '$1 -')      // add space before hyphen
    .trim()                                 // trim
    .split(regex.delimiter)   // split into d


  // d now is an d containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]

  var array = []

  do{

    // Test if we have a path letter
    if(regex.isPathLetter.test(d[0])){
      s = d[0]
      d.shift()
    // If last letter was a move command and we got no new, it defaults to [L]ine
    }else if(s == 'M'){
      s = 'L'
    }else if(s == 'm'){
      s = 'l'
    }

    // add path letter as first element
    seg = [s.toUpperCase()]

    // push all necessary parameters to segment
    for(i = 0; i < paramCnt[seg[0]]; ++i){
      seg.push(parseFloat(d.shift()))
    }

    // upper case
    if(s == seg[0]){

      if(s == 'M' || s == 'L' || s == 'C' || s == 'Q' || s == 'S' || s == 'T'){
        x = seg[paramCnt[seg[0]]-1]
        y = seg[paramCnt[seg[0]]]
      }else if(s == 'V'){
        y = seg[1]
      }else if(s == 'H'){
        x = seg[1]
      }else if(s == 'A'){
        x = seg[6]
        y = seg[7]
      }

    // lower case
    }else{

      // convert relative to absolute values
      if(s == 'm' || s == 'l' || s == 'c' || s == 's' || s == 'q' || s == 't'){

        seg[1] += x
        seg[2] += y

        if(seg[3] != null){
          seg[3] += x
          seg[4] += y
        }

        if(seg[5] != null){
          seg[5] += x
          seg[6] += y
        }

        // move pointer
        x = seg[paramCnt[seg[0]]-1]
        y = seg[paramCnt[seg[0]]]

      }else if(s == 'v'){
        seg[1] += y
        y = seg[1]
      }else if(s == 'h'){
        seg[1] += x
        x = seg[1]
      }else if(s == 'a'){
        seg[6] += x
        seg[7] += y
        x = seg[6]
        y = seg[7]
      }

    }

    if(seg[0] == 'M'){
      x0 = x
      y0 = y
    }

    if(seg[0] == 'Z'){
      x = x0
      y = y0
    }

    array.push(seg)

  }while(d.length)

  return array
}


var Point = invent({
  // Initialize
  create: function(x,y) {
    var i, source, base = {x:0, y:0}

    // ensure source as object
    source = Array.isArray(x) ?
      {x:x[0], y:x[1]} :
    typeof x === 'object' ?
      {x:x.x, y:x.y} :
    x != null ?
      {x:x, y:(y != null ? y : x)} : base // If y has no value, then x is used has its value

    // merge source
    this.x = source.x
    this.y = source.y
  }

  // Add methods
, extend: {
    // Clone point
    clone: function() {
      return new Point(this)
    }
    // Convert to native SVGPoint
  , native: function() {
      // create new point
      var point = new SVGPoint()

      // update with current values
      point.x = this.x
      point.y = this.y

      return point
    }
    // transform point with matrix
  , transform: function(matrix) {
      return new Point(this.native().matrixTransform(matrix))
    }

  }

})


extend(Point, {
  add: function(x,y) {
    var p = new Point(x,y)
    return new Point(this.x + p.x, this.y + p.y)
  },
  sub: function(x,y) {
    var p = new Point(x,y)
    return new Point(this.x - p.x, this.y - p.y)
  },
  mul: function(factor) {
    return new Point(this.x * factor,this.y * factor)
  },
  div: function(factor) {
    return new Point(this.x / factor,this.y / factor)
  },
  absQuad: function() {
    return this.x * this.x + this.y * this.y
  },
  abs: function() {
    return Math.sqrt(this.absQuad())
  },
  normalize: function() {
    var abs = this.abs()
    if(!abs) throw new Error('Can\'t normalize vector of zero length')
    return this.div(abs)
  },
  normal: function() {
    return new Point(this.y, -this.x)
  },
  toArray: function() {
    return [this.x, this.y]
  },
  reflectAt: function(p) {
    return p.add(p.sub(this))
  },
  toPath: function() {
    return ['M', this.x, this.y].join(' ')
  },
  equals: function(p) {
    return this.x == p.x && this.y == p.y
  },
  closeTo: function(p) {
    return this.equals(p) || (Math.abs(this.x-p.x) < eta && Math.abs(this.y-p.y) < eta)
  },
  angleTo: function(p) {
    var sign = Math.sign(this.x * p.y - this.y * p.x)
    sign = sign ? sign : 1
    return sign * Math.acos(Math.round((this.dot(p)/(this.abs() * p.abs()))*1000000)/1000000)
  },
  dot: function(p) {
    return this.x*p.x + this.y * p.y
  }
})


var Cubic = invent({
  name: 'Cubic',
  create: function(p1, c1, c2, p2) {
    if(p1 instanceof Point){
      this.p1 = new Point(p1)
      this.c1 = new Point(c1)
      this.c2 = new Point(c2)
      this.p2 = new Point(p2)
    }else{
      this.p1 = new Point(p1.p1)
      this.c1 = new Point(p1.c1)
      this.c2 = new Point(p1.c2)
      this.p2 = new Point(p1.p2)
    }
  },
  extend: {
    pointAt: function(t) {
      return new Point(
        (1-t)*(1-t)*(1-t)*this.p1.x + 3*(1-t)*(1-t)*t*this.c1.x + 3*(1-t)*t*t*this.c2.x + t*t*t*this.p2.x,
        (1-t)*(1-t)*(1-t)*this.p1.y + 3*(1-t)*(1-t)*t*this.c1.y + 3*(1-t)*t*t*this.c2.y + t*t*t*this.p2.y
      )
    },
    findRootsX: function() {
      return this.findRootsXY(this.p1.x, this.c1.x, this.c2.x, this.p2.x)
    },
    findRootsY: function() {
      return this.findRootsXY(this.p1.y, this.c1.y, this.c2.y, this.p2.y)
    },
    findRootsXY: function(p1, p2, p3, p4) {

      var a = 3*(-p1+3*p2-3*p3+p4)
        , b = 6*(p1-2*p2+p3)
        , c = 3*(p2-p1)

      if(b*b-4*a*c < 0) return []
      if(b*b-4*a*c == 0) return [Math.round((-b/(2*a))*100000)/100000].filter(function(el){ return el > 0 && el < 1 })

      return [
        Math.round((-b + Math.sqrt(b*b-4*a*c))/(2*a)*100000)/100000,
        Math.round((-b - Math.sqrt(b*b-4*a*c))/(2*a)*100000)/100000
      ].filter(function(el){ return el > 0 && el < 1 })
    },
    findRoots: function() {
      return this.findRootsX().concat(this.findRootsY())
    },
    lengthAt: function(t) {
      t = t == null ? 1 : t

      var curves = this.splitAt(t)[0].makeFlat(t)

      var length = 0
      for(var i = 0, len = curves.length; i < len; ++i) {
        length += curves[i].p2.sub(curves[i].p1).abs()
      }

      return length
    },
    length: function() {
      return this.lengthAt(1)
    },
    flatness:function(){
        var ux = Math.pow( 3 * this.c1.x - 2 * this.p1.x - this.p2.x, 2 );
        var uy = Math.pow( 3 * this.c1.y - 2 * this.p1.y - this.p2.y, 2 );
        var vx = Math.pow( 3 * this.c2.x - 2 * this.p2.x - this.p1.x, 2 );
        var vy = Math.pow( 3 * this.c2.y - 2 * this.p2.y - this.p1.y, 2 );

        if( ux < vx )
            ux = vx

        if( uy < vy )
            uy = vy

        return ux + uy
    },
    makeFlat: function(t) {
      if(this.flatness() > 0.15) {
        return this.splitAt(0.5)
          .map(function(el){ return el.makeFlat(t*0.5) })
          .reduce(function(last, current){ return last.concat(current) }, [])
      }else{
        this.t_value = t
        return [this]
      }
    },
    splitAtScalar: function(z, p) {
      var p1 = this.p1[p]
        , p2 = this.c1[p]
        , p3 = this.c2[p]
        , p4 = this.p2[p]

      var t = z*z*z*p4 - 3*z*z*(z-1)*p3 + 3*z*(z-1)*(z-1)*p2 - (z-1)*(z-1)*(z-1)*p1

      return [
        [
          p1,
          z*p2-(z-1)*p1,
          z*z*p3-2*z*(z-1)*p2+(z-1)*(z-1)*p1,
          t
        ],
        [
          t,
          z*z*p4-2*z*(z-1)*p3+(z-1)*(z-1)*p2,
          z*p4-(z-1)*p3,
          p4
        ]
      ]
    },
    splitAt: function(z) {
      var x = this.splitAtScalar(z, 'x')
      var y = this.splitAtScalar(z, 'y')

      var a = new Cubic(
        new Point(x[0][0], y[0][0]),
        new Point(x[0][1], y[0][1]),
        new Point(x[0][2], y[0][2]),
        new Point(x[0][3], y[0][3])
      )

      var b = new Cubic(
        new Point(x[1][0], y[1][0]),
        new Point(x[1][1], y[1][1]),
        new Point(x[1][2], y[1][2]),
        new Point(x[1][3], y[1][3])
      )

      return [a, b]
    },
    bbox: function() {
      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
      var points = this.findRoots()
          .filter(root => root != 0 && root != 1)
          .map(root => this.pointAt(root))
          .concat(this.p1, this.p2)
          .forEach(p => {
            xMin = Math.min(xMin,p.x)
            xMax = Math.max(xMax,p.x)
            yMin = Math.min(yMin,p.y)
            yMax = Math.max(yMax,p.y)
          })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )

    }
  }
})

Cubic.fromQuad = function(p1, c, p2) {
  var c1 = p1.mul(1/3).add(c.mul(2/3))
  var c2 = c.mul(2/3).add(p2.mul(1/3))
  return new Cubic(p1, c1, c2, p2)
}


var Line = invent({
  name: 'Line',
  create: function(x1, y1, x2, y2) {
    if(x1 instanceof Object){
      this.p1 = new Point(x1)
      this.p2 = new Point(y1)
    }else{
      this.p1 = new Point(x1, y1)
      this.p2 = new Point(x2, y2)
    }
  },
  extend: {
    bbox: function() {
      var size = this.p2.sub(this.p1)
      return new Box(
        Math.min(this.p1.x, this.p2.x),
        Math.min(this.p1.y, this.p2.y),
        Math.abs(size.x),
        Math.abs(size.y)
      )
    },
    pointAt: function(t) {
      var vec = this.p2.sub(this.p1).mul(t)
      return this.p1.add(vec)
    },
    length: function() {
      return this.p2.sub(this.p1).abs()
    }
  }
})

var matcherFuncs = {
  '=': (a,b) => a == b,
  '~=': (a,b) => a.split(regex.delimiter).indexOf(b) > -1,
  '|=': (a,b) => a.split(regex.delimiter)[0] == b,
  '^=': (a,b) => a.startsWith(b),
  '$=': (a,b) => a.endsWith(b),
  '*=': (a,b) => a.includes(b),
  '*': (a,b) => a != null,
}

var QueryNode = invent({
  name:'QueryNode',
  create: function(node){
    this.tag = ''
    this.id = ''
    this.classList = []
    this.attrs = []

    // match the tag name
    var matches = node.match(/^[\w-]*|\*/)
    if(matches){
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match the id
    matches = node.match(/#([\w-]+)/)
    if(matches){
      this.id = matches[1]
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }

    // match classes
    while(matches = /\.([\w-]+)/g.exec(node)){
      this.classList.push(matches[1])
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }

    // match attributes
    while(matches = /\[([\w-]+)(([=^~$|*]+)(.+?))?\]/g.exec(node)){
      this.attrs.push({key: matches[1], value: removeQuotes(matches[4] || ''), matcher: matcherFuncs[matches[3] || '*']})
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[1].length)
    }
  }, extend: {
    matches: function(node) {
      var i

      if(this.tag && this.tag != node.nodeName && this.tag != '*')
        return false

      if(this.id && this.id != node.id){
        return false
      }

      var classList = (node.getAttribute('class') || '').split(regex.delimiter).filter(el => !!el.length)
      if(this.classList.filter(className => classList.indexOf(className) < 0).length) {
        return false
      }

      for(i = this.attrs.length; i--;){
        if(!this.attrs[i].matcher(node.getAttribute(this.attrs[i].key), this.attrs[i].value)) {
          return false
        }
      }

      return true
    }
  }
})

function removeQuotes(str){
  if(str.startsWith('"')){
    return str.slice(1,-1)
  }
  return str
}


extend(Window, {
  Node: Node,
  SVGElement: SVGElement,
  CustomEvent: CustomEvent,
  Event: Event,
  SVGMatrix: SVGMatrix,
  SVGPoint: SVGPoint,
  Image: HTMLImageElement,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0
})

var n = new Node('div', {childNodes:[
  new Node('div', {childNodes:[
    new Node('div'),
    new Node('span'),
    new Node('strong'),
    new Node('ul')
  ]}),
  new Node('span', {childNodes:[
    new Node('div'),
    new Node('span'),
    new Node('strong'),
    new Node('ul')
  ]}),
  new Node('strong', {childNodes:[
    new Node('div'),
    new Node('span'),
    new Node('strong'),
    new Node('ul')
  ]}),
  new Node('ul', {childNodes:[
    new Node('li'),
    new Node('li'),
    new Node('li'),
    new Node('li')
  ]}),
  new Node('div', {childNodes:[
    new Node('div'),
    new Node('span'),
    new Node('strong'),
    new Node('ul')
  ]})
]})

module.exports = new Window