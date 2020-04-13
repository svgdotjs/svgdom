import { TextNode } from './TextNode.js'
import { Element } from './Element.js'
import sax from 'sax'

// TODO: Make it recognize the correct namespace
export const HTMLParser = function (str, el) {
  let currentTag = el
  var ownerDocument = el.ownerDocument
  var parser = sax.parser(true)

  parser.ontext = t => currentTag.appendChild(new TextNode('#text', {
    data: t,
    ownerDocument: ownerDocument
  }))
  parser.onopentag = node => {
    var newElement = new Element(node.name, {
      attrs: node.attributes,
      ownerDocument: ownerDocument
    })
    currentTag.appendChild(newElement)
    currentTag = newElement
  }
  parser.onclosetag = node => {
    currentTag = currentTag.parentNode
  }
  parser.write(str)
}
