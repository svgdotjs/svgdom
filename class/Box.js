const {invent} = require('../utils/objectCreationUtils')
const regex = require('../utils/regex')

const Point = require('./Point')

const Box = invent({
  name:'Box',
  create: function(source) {
    var base = [0,0,0,0]
    source = typeof source === 'string' ?
        source.split(regex.delimiter).map(parseFloat) :
      Array.isArray(source) ?
        source :
      typeof source == 'object' ?
        [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] :
      arguments.length == 4 ?
        [].slice.call(arguments) :
        base

    this.x = this.left = source[0]
    this.y = this.top = source[1]
    this.width = source[2]
    this.height = source[3]
  }
, extend: {
    // Merge rect box with another, return a new instance
    merge: function(box) {
      if(!box.x && !box.y && !box.width && !box.height) return new Box(this)
      var x = Math.min(this.x, box.x)
        , y = Math.min(this.y, box.y)

      return new Box(
        x, y,
        Math.max(this.x + this.width,  box.x + box.width)  - x,
        Math.max(this.y + this.height, box.y + box.height) - y
      )
    }

  , transform: function(m) {
      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity, p

      var pts = [
        new Point(this.x, this.y),
        new Point(this.x+this.width, this.y),
        new Point(this.x, this.y+this.height),
        new Point(this.x+this.width, this.y+this.height)
      ]

      pts.forEach(function(p) {
        p = p.transform(m)
        xMin = Math.min(xMin,p.x)
        xMax = Math.max(xMax,p.x)
        yMin = Math.min(yMin,p.y)
        yMax = Math.max(yMax,p.y)
      })

      return new Box(
        xMin, yMin,
        xMax-xMin,
        yMax-yMin
      )
    }
  }
})

module.exports = Box