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

function htmlEntities(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var tag = function(node) {

  var attrs = new Map(node.attrs)
    , name = node.nodeName
    , style = map(node._style, function(value, key) {
        return key + ':' + value
      }).join(';')


  if(style) attrs.set('style', style)

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

  clone.nodeType = node.nodeType
  clone._style = new Map(node._style)
  clone.ownerDocument = null

  return clone
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
  }
})

var CustomEvent = invent({
  name: 'CustomEvent',
  create: function(name, props = {}) {
    Event.call(this, name)

    this.detail = props.detail || {}
    this.cancelable = props.cancelable || false
  },
  inherit: Event
})

var Node = invent({
  name: 'Node',
  create: function(name = '', props = {}) {
    EventTarget.call(this)

    this.nodeName = name.toLowerCase()
    this.nodeType = 1
    this.nodeValue = 0
    this.childNodes = props.childNodes || []
    this.attrs = objectToMap(props.attrs || {})
    this.data = props.data || ''
    this._style = new Map()
    this.ownerDocument = null
    this.parentNode = null

    this.style = new Proxy(this._style, {
      set: function(target, name, value){
        target.set(name, value)
      },
      get: function(target, name){
        return target.get(name)
      }
    });
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
        return this.attributes['id']
      },
      set: function(id) {
        this.attributes['id'] = id
      }
    }
  },
  extend: {
    setAttribute: function(name, value) {
      //if(name == 'style') return this.setStyle(value)
      this.attrs.set(name, value)
    },
    setAttributeNS: function(ns, name, value) {
      //this.setAttribute(ns+':'+name, value)
      this.setAttribute(name, value)
    },
    removeAttribute: function(name) {
      this.attrs.delete(name)
    },
    removeAttributeNS: function(ns, name) {
      this.removeAttribute(ns+':'+name)
    },
    getAttribute: function(name) {
      return this.attrs.get(name) || null
    },
    getAttributeNS: function(ns, name) {
      this.getAttribute(ns+':'+name)
    },
    hasChildNodes: function() {
      return !!this.childNodes.length
    },
    appendChild: function(node) {
      if(node.parentNode)
        node.parentNode.removeChild(node)

      node.parentNode = this
      node.ownerDocument = this.ownerDocument

      this.childNodes.push(node)
      return node
    },
    insertBefore: function(node, before) {
      if(node.parentNode)
        node.parentNode.removeChild(node)

      node.parentNode = this
      node.ownerDocument = this.ownerDocument

      var index = this.childNodes.indexOf(before)
      if(index == -1) return this.append(node)

      this.childNodes = this.childNodes.splice(0, index).concat(node, this.childNodes.splice(index))
      return node
    },
    removeChild: function(node) {
      node.parentNode = null
      node.ownerDocument = null
      var index = this.childNodes.indexOf(node)
      if(index == -1) return node
      this.childNodes = this.childNodes.slice(0, index).concat(this.childNodes.slice(index+1))
    },
    getElementsByTagName: function(name) {
      return this.childNodes.reduce(function(last, current) {
        if(current.nodeName == name.toLowerCase()) last.push(current)
        return last.concat(current.getElementsByTagName(name))
      }, [])
    },
    getElementById: function(id) {
      for(var i = this.childNodes.length; i--;) {
        if(this.childNodes[i].id == id) return id
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
    createSVGRect: function() {},
    createSVGMatrix: function() {
      return new SVGMatrix()
    },
    createSVGPoint: function() {
      return new SVG.Point()
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
  }
})

var Document = invent({
  name: 'Document',
  create: function(root) {
    Node.call(this, '#document')
    this.nodeType = 9
    this.ownerDocument = null
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
      return new SVGElement(name)
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
    this.x = this.y = 0
  },
  matrixTransform: function(m) {
    var r = new SVGPoint()
    r.x = m.a * this.x + m.c * this.y + m.e * 1
    r.y = m.b * this.x + m.d * this.y + m.f * 1
    return r
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
    }
    // not used in svg.js
    /*,
    scale: function(scale) {
      return this.multiply(matrixFactory(scale,0,0,scale,0,0))
    },
    rotate: function(r) {
      r = r % 360 * Math.PI / 180
      return this.multiply(matrixFactory(Math.cos(r), Math.sin(r), -Math.sin(r), Math.cos(r), 0, 0))
    },
    skew: function(x, y) {
      return this.multiply(matrixFactory(1, Math.tan(radians(y)), Math.tan(radians(x)), 1, 0, 0))
    }*/
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
  Image: HTMLImageElement
})

module.exports = new Window