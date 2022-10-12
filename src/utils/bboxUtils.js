import * as pathUtils from './pathUtils.js'
import * as regex from './regex.js'
import * as textUtils from './textUtils.js'
import { NoBox } from '../other/Box.js'
import { NodeIterator } from './NodeIterator.js'
import { NodeFilter } from '../dom/NodeFilter.js'

const applyTransformation = (segments, node, applyTransformations) => {
  if (node.matrixify && applyTransformations) {
    return segments.transform(node.matrixify())
  }
  return segments
}

export const getSegments = (node, applyTransformations, rbox = false) => {
  const segments = getPathSegments(node, rbox)
  return applyTransformation(segments, node, applyTransformations)
}

const getPathSegments = (node, rbox) => {
  if (node.nodeType !== 1) return new pathUtils.PathSegmentArray()

  switch (node.nodeName) {
  case 'rect':
  case 'image':
  case 'pattern':
  case 'mask':
  case 'foreignObject':
    // Create Path from rect and create PointCloud from Path
    return pathUtils.getPathSegments(pathUtils.pathFrom.rect(node))
  case 'svg':
  case 'symbol':
    // return pathUtils.getPathSegments(pathUtils.pathFrom.rect(node))
    if (rbox) {
      return pathUtils.getPathSegments(pathUtils.pathFrom.rect(node))
    }
  // ATTENTION: FALL THROUGH
  // Because normal bbox is calculated by the content of the element and not its width and height
  // eslint-disable-next-line
  case 'g':
  case 'clipPath':
  case 'a':
  case 'marker':
    // Iterate trough all children and get the point cloud of each
    // Then transform it with viewbox matrix if needed
    return node.childNodes.reduce((segments, child) => {
      if (!child.matrixify) return segments
      return segments.merge(getSegments(child, true).transform(child.generateViewBoxMatrix()))
    }, new pathUtils.PathSegmentArray())
  case 'circle':
    return pathUtils.getPathSegments(pathUtils.pathFrom.circle(node))
  case 'ellipse':
    return pathUtils.getPathSegments(pathUtils.pathFrom.ellipse(node))
  case 'line':
    return pathUtils.getPathSegments(pathUtils.pathFrom.line(node))
  case 'polyline':
  case 'polygon':
    return pathUtils.getPathSegments(pathUtils.pathFrom.polyline(node))
  case 'path':
  case 'glyph':
  case 'missing-glyph':
    return pathUtils.getPathSegments(node.getAttribute('d'))
  case 'use': {
    // Get reference from element
    const ref = node.getAttribute('href') || node.getAttribute('xlink:href')
    // Get the actual referenced Node
    const refNode = node.getRootNode().querySelector(ref)
    // Get the BBox of the referenced element and apply the viewbox of <use>
    // TODO: Do we need to apply the transformations of the element?
    // Check bbox of transformed element which is reused with <use>
    return getSegments(refNode).transform(node.generateViewBoxMatrix())
  }
  case 'tspan':
  case 'text':
  case 'altGlyph': {
    const box = getTextBBox(node)

    if (box instanceof NoBox) {
      return new pathUtils.PathSegmentArray()
    }

    return pathUtils.getPathSegments(pathUtils.pathFrom.box(box))
  }
  default:
    return new pathUtils.PathSegmentArray()
  }
}

const getTextBBox = (node) => {
  const textRoot = findTextRoot(node)
  const boxes = getTextBBoxes(node, textRoot)
  return boxes.filter(isNotEmptyBox).reduce((last, curr) => last.merge(curr), new NoBox())
}

const findTextRoot = (node) => {
  while (node.parentNode) {
    if ((node.nodeName === 'text' && node.parentNode.nodeName === 'text')
    || ((node.nodeName === 'tspan' || node.nodeName === 'textPath') && [ 'tspan', 'text', 'textPath' ].includes(node.parentNode.nodeName))) {
      node = node.parentNode
    } else {
      break
    }
  }

  return node
}

// This function takes a node of which the bbox needs to be calculated
// In order to position the box correctly, we need to know were the parent and were the siblings *before* our node are
// Thats why a textRoot is passed which is the most outer textElement needed to calculate all boxes
// When the iterator hits the element we need the bbox of, it is terminated and this function is called again
// only for the substree of our node and without textRoor but instead pos, dx and dy are known
const getTextBBoxes = function (target, textRoot = target, pos = { x: 0, y: 0 }, dx = [ 0 ], dy = [ 0 ], boxes = []) {

  // Create NodeIterator. Only show elemnts and text and skip descriptive elements
  // TODO: make an instanceof check for DescriptiveElement instead of testing one by one
  // Only title is skipped atm
  const iter = new NodeIterator(textRoot, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, (node) => {
    if (node.nodeName === 'title') return NodeFilter.FILTER_IGNORE
    return NodeFilter.FILTER_ACCEPT
  })

  // Iterate trough all nodes top to bottom, left to right
  for (const node of iter) {

    // If we hit our target, we gathered all positional information we need to move the bbox to the correct spot
    if (node === target && node !== textRoot) {
      return getTextBBoxes(node, node, pos, dx, dy)
    }

    // Traverse trough this node updating positions and add boxes
    getPositionDetailsFor(node, pos, dx, dy, boxes)
  }

  return boxes
}

const isNotEmptyBox = box => box.x !== 0 || box.y !== 0 || box.width !== 0 || box.height !== 0

// This function either updates pos, dx and dy (when its an element) or calculates the boxes for text with the passed arguments
// All arguments are passed by reference so dont overwrite them (treat them as const!)
// TODO: Break this into two functions?
const getPositionDetailsFor = (node, pos, dx, dy, boxes) => {
  if (node.nodeType === node.ELEMENT_NODE) {
    const x = parseFloat(node.getAttribute('x'))
    const y = parseFloat(node.getAttribute('y'))

    pos.x = isNaN(x) ? pos.x : x
    pos.y = isNaN(y) ? pos.y : y

    const dx0 = (node.getAttribute('dx') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)
    const dy0 = (node.getAttribute('dy') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)

    // TODO: eventually replace only as much values as we have text chars (node.textContent.length) because we could end up adding to much
    // replace initial values with node values if present
    dx.splice(0, dx0.length, ...dx0)
    dy.splice(0, dy0.length, ...dy0)
  } else {
    // get text data
    const data = node.data

    let j = 0
    const jl = data.length
    const details = getFontDetails(node)

    // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
    if (dy.length || dx.length) {
      for (;j < jl; j++) {
        // Calculate a box for a single letter
        boxes.push(textUtils.textBBox(data.substr(j, 1), pos.x, pos.y, details))

        // Add the next position to current one
        pos.x += dx.shift() || 0
        pos.y += dy.shift() || 0

        if (!dy.length && !dx.length) break
      }
    }

    // in case it was only one dx/dy or no more dx/dy move the rest of the text
    boxes.push(textUtils.textBBox(data.substr(j), pos.x, pos.y, details))
    pos.x += boxes[boxes.length - 1].width
  }
}

/*
// this function is passing dx and dy values by references. Dont assign new values to it
const textIterator = function (node, pos = { x: 0, y: 0 }, dx = [ 0 ], dy = [ 0 ]) {

  var x = parseFloat(node.getAttribute('x'))
  var y = parseFloat(node.getAttribute('y'))

  pos.x = isNaN(x) ? pos.x : x
  pos.y = isNaN(y) ? pos.y : y

  var dx0 = (node.getAttribute('dx') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)
  var dy0 = (node.getAttribute('dy') || '').split(regex.delimiter).filter(num => num !== '').map(parseFloat)
  var boxes = []
  var data = ''

  // TODO: eventually replace only as much values as we have text chars (node.textContent.length) because we could end up adding to much
  // replace initial values with node values if present
  dx.splice(0, dx0.length, ...dx0)
  dy.splice(0, dy0.length, ...dy0)

  var i = 0
  var il = node.childNodes.length

  // iterate through all children
  for (; i < il; ++i) {

    // shift next child
    pos.x += dx.shift() || 0
    pos.y += dy.shift() || 0

    // text
    if (node.childNodes[i].nodeType === node.TEXT_NODE) {

      // get text data
      data = node.childNodes[i].data

      let j = 0
      const jl = data.length

      // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
      if (dy.length || dx.length) {
        for (;j < jl; j++) {
          boxes.push(textUtils.textBBox(data.substr(j, 1), pos.x, pos.y, getFontDetails(node)))

          pos.x += dx.shift() || 0
          pos.y += dy.shift() || 0

          if (!dy.length && !dx.length) break
        }
      }

      // in case it was only one dx/dy or no more dx/dy move the rest of the text

      boxes.push(textUtils.textBBox(data.substr(j), pos.x, pos.y, getFontDetails(node)))
      pos.x += boxes[boxes.length - 1].width

    // element
    } else {
      // in case of element, recursively call function again with new start values
      boxes = boxes.concat(textIterator(node.childNodes[i], pos, dx, dy))
    }
  }

  return boxes
} */

const getFontDetails = (node) => {
  if (node.nodeType === node.TEXT_NODE) node = node.parentNode

  let fontSize = null
  let fontFamily = null
  let textAnchor = null
  let dominantBaseline = null

  const textContentElements = [
    'text',
    'tspan',
    'tref',
    'textPath',
    'altGlyph',
    'g'
  ]

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
    (node = node.parentNode)
    && node.nodeType === node.ELEMENT_NODE
    && (textContentElements.includes(node.nodeName))
  )

  return {
    fontFamily,
    fontSize,
    textAnchor: textAnchor || 'start',
    // TODO: use central for writing-mode === horizontal https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline
    dominantBaseline: dominantBaseline || 'alphabetical'
    // fontFamilyMappings: this.ownerDocument.fontFamilyMappings,
    // fontDir: this.ownerDocument.fontDir,
    // preloaded: this.ownerDocument._preloaded
  }
}
