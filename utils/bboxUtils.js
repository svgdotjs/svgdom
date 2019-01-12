const pathUtils = require('./pathUtils')
const { NoBox } = require('../class/Box')
const regex = require('./regex')
const textUtils = require('./textUtils')
const strUtils = require('./strUtils')
const PointCloud = require('./PointCloud.js')

const applyTransformation = (cloud, node, applyTransformations) => {
  if (applyTransformations) {
    return cloud.transform(node.matrixify())
  }
  return cloud
}

const getPointCloud = (node, applyTransformations) => {
  let cloud = getPathCloud(node, applyTransformations)
  return applyTransformation(cloud, node, applyTransformations)
}

const getPathCloud = (node, applyTransformations) => {
  if (node.nodeType !== 1) return new PointCloud()

  switch (node.nodeName) {
  case 'defs':
    return new PointCloud()
  case 'rect':
  case 'image':
    // Create Path from rect and create PointCloud from Path
    return pathUtils.getCloud(pathUtils.pathFrom.rect(node))
  case 'svg':
  case 'mask':
  case 'pattern':
  case 'symbol':
    return pathUtils.getCloud(pathUtils.pathFrom.rect(node))
  case 'g':
  case 'clipPath':
  case 'a':
  case 'marker':
    // Iterate trough all childs and get the point cloud of each
    // Then transform it with viewbox matrix if needed
    return node.childNodes.reduce((cloud, child) => {
      return cloud.merge(getPointCloud(child, true))
    }, new PointCloud())
  case 'circle':
    return pathUtils.getCloud(pathUtils.pathFrom.circle(node))
  case 'ellipse':
    return pathUtils.getCloud(pathUtils.pathFrom.ellipse(node))
  case 'line':
    return pathUtils.getCloud(pathUtils.pathFrom.line(node))
  case 'polyline':
  case 'polygon':
    return pathUtils.getCloud(pathUtils.pathFrom.polyline(node))
  case 'path':
  case 'glyph':
  case 'missing-glyph':
    return pathUtils.getCloud(node.getAttribute('d'))
  case 'use':
    // Get reference from element
    let ref = node.getAttribute('href')
    // Get the actual referenced Node
    let refNode = node.getRootNode().getElementById(ref.slice(1))
    // Get the BBox of the referenced element and apply the viewbox of <use>
    return getPointCloud(refNode).transform(node.generateViewBoxMatrix())
  case 'text':
  case 'tspan':
  case 'altGlyph':
    const boxes = textIterator(node).filter(box => box.x !== 0 || box.y !== 0 || box.width !== 0 || box.height !== 0)
    const box = boxes.reduce((last, curr) => last.merge(curr), new NoBox())

    if (box instanceof NoBox) {
      return new PointCloud()
    }

    return pathUtils.getCloud(pathUtils.pathFrom.box(box))

  default:
    return new PointCloud()
  }
}

// this function is passing dx and dy values by references. Dont assign new values to it!
// const textIterator = function(node, x0=0, y0=0, dx=[0], dy=[0]){
const textIterator = function (node, pos = { x: 0, y: 0 }, dx = [0], dy = [0]) {

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
    if (node.childNodes[i].nodeType === 3) {

      // get text data
      data = strUtils.unhtmlEntities(node.childNodes[i].data)

      let j = 0
      let jl = data.length

      // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
      if (dy.length || dx.length) {
        for (;j < jl; j++) {
          boxes.push(textUtils.bbox(data.substr(j, 1), pos.x, pos.y, node.getFontDetails()))

          pos.x += dx.shift() || 0
          pos.y += dy.shift() || 0

          if (!dy.length && !dx.length) break
        }
      }

      // in case it was only one dx/dy or no more dx/dy move the rest of the text

      boxes.push(textUtils.bbox(data.substr(j), pos.x, pos.y, node.getFontDetails()))
      pos.x += boxes[boxes.length - 1].width

    // node
    } else {
      // in case of node recursively call function again with new start values
      boxes = boxes.concat(textIterator(node.childNodes[i], pos, dx, dy))
    }
  }

  return boxes

}

module.exports = getPointCloud
