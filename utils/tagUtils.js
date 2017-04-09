const {objectToMap, mapToObject, mapMap, mapToCss, cssToMap} = require('./mapUtils')

const htmlEntities = function(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const tag = function(node) {

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

  attrs = mapMap(attrs, function(value, key) {
    return key + '="' + htmlEntities(value) + '"'
  })

  return '<' + [].concat(name, attrs).join(' ') + '>' + node.innerHTML + '</' + name + '>'
}

const cloneNode = function(node) {

  var clone = new node.constructor(node.nodeName, {
    attrs: node.attrs,
    data: node.data,
    ownerDocument: node.ownerDocument
  })

  // clone styles
  Object.keys(node._style).forEach(function(el){clone._style[el] = node._style[el] })
  clone.nodeType = node.nodeType

  return clone
}

module.exports = {
  tag,
  cloneNode
}