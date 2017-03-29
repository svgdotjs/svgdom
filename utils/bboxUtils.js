const pathUtils = require('./pathUtils')
const Box = require('../class/Box')
const regex = require('../utils/regex')

const bbox = (node) => {

  if(node.nodeType != 1) return new Box()

  switch(node.nodeName) {
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
    case 'defs':
    case 'glyph':
    case 'altGlyph,':
    case 'missing-glyph':
    case 'marker':
    case 'pattern':
    case 'symbol':
      var first = node.firstChild
      if(!first) return new Box
      return node.childNodes.slice(1).reduce((last,curr) => {
        return last.merge(bbox(curr))
      }, bbox(first))
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
        , points = node.getAttribute('points').split(regex.delimiter).map(parseFloat)
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
      var d = node.getAttribute('d')
        , arr = pathParser(d)
        , p = new Point()
        , r = new Point()
        , p0 = new Point()

      return arr
        .map(el => helpers.handle[el[0]](el.slice(1), p, r, p0)).reduce((l,c) => l.concat(c), [])
        .reduce((l,c) => l == null ? c.bbox() : l.merge(c.bbox()), null)
    case 'use':
      var ref = node.getAttribute('href')
      return node.getRootNode().getElementById(ref.slice(1)).getBBox()
    default: return new Box
  }
}

module.exports = bbox