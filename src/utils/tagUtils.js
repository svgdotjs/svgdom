import { mapMap } from './mapUtils.js'

const htmlEntities = function (str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

var emptyElements = {
  br: true,
  hr: true,
  img: true,
  link: true
}

export const tag = function (node) {

  var attrs = new Map(node.attrs)

  var name = node.nodeName

  attrs = mapMap(attrs, function (value, key) {
    return key + '="' + htmlEntities(value) + '"'
  })

  return '<' + [].concat(name, attrs).join(' ') + '>' + (emptyElements[name] ? '' : node.innerHTML + '</' + name + '>')
}

export const cloneNode = function (node) {

  var clone = new node.constructor(node.nodeName, {
    attrs: node.attrs,
    data: node.data,
    ownerDocument: node.ownerDocument
  })

  return clone
}
