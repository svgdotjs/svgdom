import { extendStatic } from '../utils/objectCreationUtils.js'

import { EventTarget } from './EventTarget.js'

import { objectToMap } from '../utils/mapUtils.js'
import { htmlEntities } from '../utils/strUtils.js'
import * as pathUtils from '../utils/pathUtils.js'
import { cloneNode } from '../utils/tagUtils.js'
import { getPointCloud } from '../utils/bboxUtils.js'
import * as regex from '../utils/regex.js'

import { SVGPoint } from './SVGPoint.js'
import { SVGMatrix } from './SVGMatrix.js'
import { Box } from '../other/Box.js'
import { TextNode } from './TextNode.js'
// import {
//   extendStatic,
//   EventTarget,
//   objectToMap,
//   htmlEntities,
//   pathUtils,
//   cloneNode,
//   getPointCloud,
//   SVGPoint,
//   SVGMatrix,
//   Box,
//   TextNode
// } from '../intern.js'

// Map matrix array to object
function arrayToMatrix (a) {
  return { a: a[0], b: a[1], c: a[2], d: a[3], e: a[4], f: a[5] }
}

export class Node extends EventTarget {
  constructor (name = '', props = {}, ns = null) {
    super()

    this.prefix = null
    this.nodeName = this.localName = name

    if (name.includes(':')) {
      ;[ this.prefix, this.localName ] = name.split(':')
      this.nodeName = this.localName
    }

    this.namespaceURI = ns
    this.nodeType = Node.ELEMENT_NODE
    this.nodeValue = 0
    this.childNodes = []

    this.attrs = objectToMap(props.attrs || {})
    this.data = props.data || ''

    this.ownerDocument = props.ownerDocument || null
    this.parentNode = null

    if (props.childNodes) {
      for (var i = 0, il = props.childNodes.length; i < il; ++i) {
        this.appendChild(props.childNodes[i])
      }
    }
  }

  appendChild (node) {
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
  }

  insertBefore (node, before) {
    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const index = this.childNodes.indexOf(before)
      if (index === -1) return this.appendChild(node)

      this.childNodes = this.childNodes.slice(0, index).concat(node.childNodes, this.childNodes.slice(index))

      node.childNodes.splice(0)
      return node
    }

    if (node.parentNode) { node.parentNode.removeChild(node) }

    node.parentNode = this

    const index = this.childNodes.indexOf(before)
    if (index === -1) return this.appendChild(node)

    this.childNodes = this.childNodes.slice(0, index).concat(node, this.childNodes.slice(index))
    return node
  }

  removeChild (node) {

    node.parentNode = null
    var index = this.childNodes.indexOf(node)
    if (index === -1) return node
    this.childNodes.splice(index, 1)
    return node
  }

  replaceChild (newChild, oldChild) {
    newChild.parentNode && newChild.parentNode.removeChild(newChild)

    var before = oldChild.nextSibling
    this.removeChild(oldChild)
    this.insertBefore(newChild, before)
    return oldChild
  }

  hasChildNodes () {
    return !!this.childNodes.length
  }

  cloneNode (deep = false) {
    var clone = cloneNode(this)

    if (deep) {
      this.childNodes.forEach(function (el) {
        var node = el.cloneNode(deep)
        clone.appendChild(node)
      })
    }

    return clone
  }

  getRootNode () {
    if (!this.parentNode || this.parentNode.nodeType === Node.DOCUMENT_NODE) return this
    return this.parentNode.getRootNode()
  }

  isEqualNode (node) {
    this.normalize()
    node.normalize()

    let bool = this.nodeName === node.nodeName
    bool = bool && this.localName === node.localName
    bool = bool && this.namespaceURI === node.namespaceURI
    bool = bool && this.prefix === node.prefix
    bool = bool && this.nodeValue === node.nodeValue

    bool = bool && !this.childNodes.reduce((last, curr, index) => {
      return last && curr.isEqualNode(node.childNodes[index])
    }, true)

    bool = bool && ![ ...this.attrs.entries() ].reduce((last, curr, index) => {
      const [ key, val ] = node.attrs.entries()
      return last && curr[0] === key && curr[1] === val
    }, true)

    /*
    TODO:
    For two DocumentType nodes to be equal, the following conditions must also be satisfied:

    The following string attributes are equal: publicId, systemId, internalSubset.
    The entities NamedNodeMaps are equal.
    The notations NamedNodeMaps are equal.
    */

    if (this.nodeType === Node.DOCUMENT_TYPE_NODE && node.nodeType === Node.DOCUMENT_TYPE_NODE) {
      bool = bool && this.publicId === node.publicId
      bool = bool && this.systemId === node.systemId
      bool = bool && this.internalSubset === node.internalSubset
    }

    return bool
  }

  isSameNode (node) {
    return this === node
  }

  contains (node) {
    if (node === this) return false

    while (node.parentNode) {
      if (node === this) return true
      node = node.parentNode
    }
    return false
  }

  normalize () {
    this.childNodes = this.childNodes.reduce((textNodes, node) => {
      // FIXME: If first node is an empty textnode, what do we do? -> spec
      if (!textNodes) return [ node ]
      var last = textNodes.pop()

      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.data) return textNodes

        if (last.nodeType === Node.TEXT_NODE) {
          const merged = new TextNode(last.data + ' ' + node.data)
          textNodes.push(merged)
          return textNodes.concat(merged)
        }
      } else {
        textNodes.push(last, node)
      }

      return textNodes
    }, null)
  }

  lookupPrefix (namespaceURI) {
    if (!namespaceURI) {
      return null
    }

    const type = this.nodeType

    switch (type) {
    case Node.ELEMENT_NODE:
      return this.lookupNamespacePrefix(namespaceURI, this)
    case Node.DOCUMENT_NODE:
      return this.documentElement.lookupNamespacePrefix(namespaceURI)
    case Node.ENTITY_NODE :
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
    case Node.DOCUMENT_TYPE_NODE:
      return null // type is unknown
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.lookupNamespacePrefix(namespaceURI)
      }
      return null
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentElement) {
        return this.parentElement.lookupNamespacePrefix(namespaceURI)
      }
      return null
    }
  }

  lookupNamespacePrefix (namespaceURI, originalElement) {
    if (this.ns && this.ns === namespaceURI && this.prefix
         && originalElement.lookupNamespaceURI(this.prefix) === namespaceURI) {
      return this.prefix
    }

    for (const [ key, val ] of this.attrs.entries()) {
      if (!key.includes(':')) continue

      const [ prefix, name ] = key.split(':')
      if (prefix === 'xmlns' && val === namespaceURI && originalElement.lookupNamespaceURI(name) === namespaceURI) {
        return name
      }
    }

    // EntityReferences may have to be skipped to get to it
    if (this.parentElement) {
      return this.parentElement.lookupNamespacePrefix(namespaceURI, originalElement)
    }
    return null
  }

  isDefaultNamespace (namespaceURI) {
    switch (this.nodeType) {
    case Node.ELEMENT_NODE:
      if (!this.prefix) {
        return this.ns === namespaceURI
      }

      if (this.hasAttribute('xmlns')) {
        return this.getAttribute('xmlns')
      }

      // EntityReferences may have to be skipped to get to it
      if (this.parentElement) {
        return this.parentElement.isDefaultNamespace(namespaceURI)
      }

      return false
    case Node.DOCUMENT_NODE:
      return this.documentElement.isDefaultNamespace(namespaceURI)
    case Node.ENTITY_NODE:
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_TYPE_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      return false
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.isDefaultNamespace(namespaceURI)
      }
      return false
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentElement) {
        return this.parentElement.isDefaultNamespace(namespaceURI)
      }
      return false
    }
  }

  lookupNamespaceURI (prefix) {
    switch (this.nodeType) {
    case Node.ELEMENT_NODE:
      if (this.ns != null && this.prefix === prefix) {
        // Note: prefix could be "null" in this case Node.we are looking for default namespace
        return this.ns
      }

      for (const [ key, val ] of this.attrs.entries()) {
        if (!key.includes(':')) continue

        const [ prefix, name ] = key.split(':')
        if (prefix === 'xmlns' && name === prefix) {
          if (val != null) {
            return val
          }
          return null
        } else if (name === 'xmlns' && prefix == null) {
          if (val != null) {
            return val
          }
          return null
        }
      }

      // EntityReferences may have to be skipped to get to it
      if (this.parentElement) {
        return this.parentElement.lookupNamespaceURI(prefix)
      }
      return null
    case Node.DOCUMENT_NODE:
      return this.documentElement.lookupNamespaceURI(prefix)
    case Node.ENTITY_NODE:
    case Node.NOTATION_NODE:
    case Node.DOCUMENT_TYPE_NODE:
    case Node.DOCUMENT_FRAGMENT_NODE:
      return null
    case Node.ATTRIBUTE_NODE:
      if (this.ownerElement) {
        return this.ownerElement.lookupNamespaceURI(prefix)
      }
      return null
    default:
      // EntityReferences may have to be skipped to get to it
      if (this.parentElement) {
        return this.parentElement.lookupNamespaceURI(prefix)
      }
      return null
    }
  }

  getBBox () {
    return getPointCloud(this).bbox()
  }

  getBoundingClientRect () {
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

    return getPointCloud(this).transform(m).bbox()
  }

  matrixify () {
    var matrix = (this.getAttribute('transform') || '')
      // split transformations
      .split(regex.transforms).slice(0, -1).map(function (str) {
        // generate key => value pairs
        var kv = str.trim().split('(')
        return [ kv[0].trim(), kv[1].split(regex.delimiter).map(function (str) { return parseFloat(str.trim()) }) ]
      })
      // merge every transformation into one matrix
      .reduce(function (matrix, transform) {

        if (transform[0] === 'matrix') return matrix.multiply(arrayToMatrix(transform[1]))
        return matrix[transform[0]].apply(matrix, transform[1])

      }, new SVGMatrix())

    return matrix
  }

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
      view = [ 0, 0, width, height ]
    }

    // first apply x and y if nested, then viewbox scale, then viewBox move
    return new SVGMatrix().translate(x, y).scale(width / view[2], height / view[3]).translate(-view[0], -view[1])
  }

  getCTM () {
    var m = this.matrixify()

    var node = this
    while ((node = node.parentNode)) {
      if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(node.nodeName) > -1) break
      m = m.multiply(node.matrixify())
      if (node.nodeName === '#document') return this.getScreenCTM()
    }

    return node.generateViewBoxMatrix().multiply(m)
  }

  getScreenCTM () {
    // ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
    // We follow Chromes behavior and include the viewbox in the screenCTM
    var m = this.getInnerMatrix()

    if (this.parentNode && this.parentNode.nodeName !== '#document') {
      return this.parentNode.getScreenCTM().multiply(m)
    }

    return m
  }

  getInnerMatrix () {
    var m = this.matrixify()

    if ([ 'svg', 'symbol', 'image', 'pattern', 'marker' ].indexOf(this.nodeName) > -1) {
      m = this.generateViewBoxMatrix().multiply(m)
    }
    return m
  }

  createSVGRect () {
    return new Box()
  }

  createSVGMatrix () {
    return new SVGMatrix()
  }

  createSVGPoint () {
    return new SVGPoint()
  }

  getComputedTextLength () {
    return this.getBBox().width
  }

  getPointAtLength (len) {
    return pathUtils.pointAtLength(this.getAttribute('d'), len)
  }

  getTotalLength () {
    return pathUtils.length(this.getAttribute('d'))
  }

  getFontDetails () {
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
      node.parentNode.nodeType === Node.ELEMENT_NODE
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

// Define dynamic properties
Object.defineProperties(Node.prototype, {
  textContent: {
    get () {
      if (this.nodeType === Node.TEXT_NODE) return this.data

      return this.childNodes.reduce(function (last, current) {
        return last + current.textContent
      }, '')
    },
    set (text) {
      this.childNodes = [ new TextNode('#text', { data: htmlEntities(text) }) ]
    }
  },
  firstChild: {
    get () {
      return this.childNodes[0] || null
    }
  },
  lastChild: {
    get () {
      return this.childNodes[this.childNodes.length - 1] || null
    }
  },
  nextSibling: {
    get () {
      const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) + 1]
      return child || null
    }
  },
  previousSibling: {
    get () {
      const child = this.parentNode && this.parentNode.childNodes[this.parentNode.childNodes.indexOf(this) - 1]
      return child || null
    }
  }
})

extendStatic(Node, {
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
