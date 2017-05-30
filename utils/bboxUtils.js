const pathUtils = require('./pathUtils')
const Box = require('../class/Box')
const NoBox = require('../class/Box').NoBox
const regex = require('./regex')
const textUtils = require('./textUtils')

const bbox = (node, applyTransformations) => {

  if(node.nodeType != 1) return new NoBox()

  switch(node.nodeName) {
    case 'defs':
      return new NoBox()
    case 'rect':
    case 'image':
      return new Box(
        parseFloat(node.getAttribute('x')) || 0,
        parseFloat(node.getAttribute('y')) || 0,
        parseFloat(node.getAttribute('width')) || 0,
        parseFloat(node.getAttribute('height')) || 0
      )
    case 'svg':
    case 'g':
    case 'mask':
    case 'clipPath':
    case 'a':
    case 'glyph':
    case 'altGlyph,':
    case 'missing-glyph':
    case 'marker':
    case 'pattern':
    case 'symbol':
      return node.childNodes.reduce((last,curr) => {
        return last.merge(bbox(curr, applyTransformations).transform(curr.getInnerMatrix()))
      }, new NoBox)
    case 'circle':
      var r = parseFloat(node.getAttribute('r'))
        , x = parseFloat(node.getAttribute('cx')) - r
        , y = parseFloat(node.getAttribute('cy')) - r

      return new Box(
        x, y,
        2 * r,
        2 * r
      )
    case 'ellipse':
      var rx = parseFloat(node.getAttribute('rx'))
        , ry = parseFloat(node.getAttribute('ry'))
        , x  = parseFloat(node.getAttribute('cx')) - rx
        , y  = parseFloat(node.getAttribute('cy')) - ry

      return new Box(
        x, y,
        2 * rx,
        2 * ry
      )
    case 'line':
      var x1 = parseFloat(node.getAttribute('x1'))
      var x2 = parseFloat(node.getAttribute('x2'))
      var y1 = parseFloat(node.getAttribute('y1'))
      var y2 = parseFloat(node.getAttribute('y2'))
      return new Box(
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.abs(x2-x1),
        Math.abs(y2-y1)
      )
    case 'polyline':
    case 'polygon':

      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
        , points = node.getAttribute('points').trim().split(regex.delimiter).map(parseFloat)
            .reduce((l,c,i) => {
              i % 2 ? l[l.length-1].push(c) : l.push([c])
              return l
            }, [])
            .forEach(el => {
              xMin = Math.min(xMin,el[0])
              xMax = Math.max(xMax,el[0])
              yMin = Math.min(yMin,el[1])
              yMax = Math.max(yMax,el[1])
            })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )
    case 'path':
      return pathUtils.bbox(node.getAttribute('d'))
    case 'use':
      var ref = node.getAttribute('href')
      return node.getRootNode().getElementById(ref.slice(1)).getBBox()
    case 'text':
    case 'tspan':
      //console.warn('itering')
      var boxes = textIterator(node).filter(box => box.x != 0 || box.y != 0 || box.width != 0 || box.height != 0)
      //var first = boxes.pop()
      //if(!first) return new Box
      return boxes.reduce((last, curr) => last.merge(curr), new NoBox())

    default: return new NoBox
  }
}

// this function is passing dx and dy values by references. Dont assign new values to it!
//const textIterator = function(node, x0=0, y0=0, dx=[0], dy=[0]){
const textIterator = function(node, pos={x:0, y:0}, dx=[0], dy=[0]){

  var x = parseFloat(node.getAttribute('x'))
    , y = parseFloat(node.getAttribute('y'))

  pos.x = isNaN(x) ? pos.x : x
  pos.y = isNaN(y) ? pos.y : y
  
  var dx0 = (node.getAttribute('dx') || '').split(regex.delimiter).filter(num => num != '').map(parseFloat)
    , dy0 = (node.getAttribute('dy') || '').split(regex.delimiter).filter(num => num != '').map(parseFloat)
    , boxes = []
    , data = ''

    // TODO: eventually replace only as much values as we have text chars (node.textContent.length) because we could end up adding to much
  // replace initial values with node values if present
  dx.splice(0, dx0.length, ...dx0)
  dy.splice(0, dy0.length, ...dy0)

  // iterate through all children
  for(var i = 0, il = node.childNodes.length; i < il; ++i) {

    // shift next child
    pos.x += dx.shift() || 0
    pos.y += dy.shift() || 0

    // text
    if(node.childNodes[i].nodeType == 3) {

      // get text data
      data = node.childNodes[i].data

      j = 0

      // if it is more than one dx/dy single letters are moved by the amount (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dx)
      if(dy.length || dx.length) {
        for(jl = data.length; j < ij; j++){
          boxes.push(textUtils.bbox(data.substr(j, 1), pos.x, pos.y, node.getFontDetails()))

          pos.x += dx.shift() || 0
          pos.y += dy.shift() || 0

          if(!dy.length && !dx.length) break
        }
      }

      // in case it was only one dx/dy or no more dx/dy move the rest of the text
      boxes.push(textUtils.bbox(data.substr(j), pos.x, pos.y, node.getFontDetails()))
      pos.x += boxes[boxes.length-1].width

    // node
    }else{
      // in case of node recursively call function again with new start values
      boxes = boxes.concat(textIterator(node.childNodes[i], pos, dx, dy))
    }
  }

  return boxes

}

module.exports = bbox