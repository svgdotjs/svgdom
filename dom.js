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
    this.childNodes = props.childNodes || []

    this._style = props.attrs && props.attrs.style && mapToObject(cssToMap(props.attrs.style)) || {}

    this.attrs = objectToMap(props.attrs || {})
    this.data = props.data || ''

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null
    this.cnt = 0

    this.style = this.getStyleProxy()
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
          if(key == 'cssText') {
            return mapToCss(objectToMap(target))
          }
          key = camelCase(key)
          if(!target[key]) return ''
          return Reflect.get(target, key)
        },
        set: function(target, key, value) {
          value = value.toString()
          key = camelCase(key)
          Reflect.set(target, key, value)
        }
      })
    },
    setNewStyle: function(obj) {
      this._style = obj
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
      return this.attrs.get(name) || null
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
      if(!this.parent || this.parent.nodeType == 9) return this
      return this.parent.getRootNode()
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
      return {
        x:0,y:0,width:0,height:0
      }
    },
    getBoundingClientRect: function() {
      return {
        x:0,y:0,width:0,height:0
      }
    },
    getCTM: function() {
      return this.matrixify()
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
    getScreenCTM: function() {
      return this.matrixify()
    },
    createSVGRect: function() {},
    createSVGMatrix: function() {
      return new SVGMatrix()
    },
    createSVGPoint: function() {
      return new SVGPoint()
    },
    matches: function(selector) {
      var selectors = selector.split(/[\s,>~]+/)
      var last = selectors.pop()

      return this.matchSingle(last)
    },
    querySelectorAll: function(selector) {
      var selectors = selector.trim().split(/[\s,>~^]+/)
      var first = selectors.shift()
      var ret = []

      if(this.matchSingle(first)) {
        selector = selector.substr(first.length).trim()
        if(selector == '') return [this]
      }

      for(var i = this.childNodes.length; i--;) {
        ret = ret.concat(this.childNodes[i].querySelectorAll(selector))
      }

      return ret
    },
    matchSingle: function(selector) {
      if(selector.indexOf('#') == 0 && this.id == selector.slice(1))
        return true

      var classes = this.attrs.get('class')
      if(classes && selector.indexOf('.') == 0 && classes.split(/\s+/).indexOf(selector.slice(1)) != -1)
        return true

      if(selector == this.nodeName)
        return true

      if(selector == '*')
        return true

      return false
    },
    getComputedTextLength: function() {
      return (this.attrs.get('font-size')||12) * this.textContent.length * 0.6
    },
    getPointAtLength: function() {
      return new SVGPoint
    },
    getTotalLength: function() {
      return 0
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
    },
    getTotalLength: function() {
      return 0
    },
    getPointAtLength: function() {
      return new SVGPoint()
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

extend(Window, {
  Node: Node,
  SVGElement: SVGElement,
  CustomEvent: CustomEvent,
  Event: Event,
  SVGMatrix: SVGMatrix,
  SVGPoint: SVGPoint,
  Image: HTMLImageElement,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
})

module.exports = new Window