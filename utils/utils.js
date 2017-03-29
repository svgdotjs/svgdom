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

var extendClass = function() {
  var modules, methods, key, i

  // Get list of modules
  modules = [].slice.call(arguments)

  // Get object with extensions
  methods = modules.pop()

  for (i = modules.length - 1; i >= 0; i--)
    for (key in methods)
      modules[i][key] = methods[key]
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


module.exports = {
  extend: extend,
  extendClass: extendClass,
  invent: invent,
  mapMap: map,
  mapToCss: mapToCss,
  cssToMap: cssToMap,
  objectToMap: objectToMap,
  mapToObject: mapToObject,
  htmlEntities: htmlEntities,
  tag: tag,
  mapToAttributeArray: mapToAttributeArray,
  indexOfAttribute: indexOfAttribute,
  cloneNode: cloneNode,
  camelCase: camelCase
}