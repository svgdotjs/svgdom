import { mapMap } from './mapUtils.js'
import { html } from './namespaces.js'

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

  let { nodeName: name, prefix } = node

  // Follow browser behavior and lowercase tagnames on innerHTML
  if (node.namespaceURI === html) {
    name = name.toLowerCase()
  }

  // We need no prefix if it is the default namespace
  if (node.isDefaultNamespace(node.lookupNamespaceURI(prefix))) {
    prefix = null
  }

  const attrs = mapMap(node.attrs, function (value, key) {
    return key + '="' + htmlEntities(value) + '"'
  })

  const tagName = prefix ? [ prefix, name ].join(':') : name

  return '<' + [].concat(tagName, attrs).join(' ') + '>' + (emptyElements[name] ? '' : node.innerHTML + '</' + tagName + '>')
}

export const cloneNode = function (node) {

  const { name, prefix } = node
  const tagName = prefix ? [ prefix, name ].join(':') : name

  var clone = new node.constructor(tagName, {
    attrs: node.attrs,
    nodeValue: node.nodeValue,
    ownerDocument: node.ownerDocument
  }, node.namespaceURI)

  return clone
}
