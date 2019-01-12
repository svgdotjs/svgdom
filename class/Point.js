const { invent } = require('../utils/objectCreationUtils')
const SVGPoint = require('./SVGPoint')

const Point = invent({
  // Initialize
  create: function (x, y) {
    var source
    var base = { x: 0, y: 0 }

    // ensure source as object
    source = Array.isArray(x)
      ? { x: x[0], y: x[1] }
      : typeof x === 'object'
        ? { x: x.x, y: x.y }
        : x != null
          ? { x: x, y: (y != null ? y : x) } : base // If y has no value, then x is used has its value

    // merge source
    this.x = source.x
    this.y = source.y
  },

  // Add methods
  extend: {
    // Clone point
    clone: function () {
      return new Point(this)
    },
    // Convert to native SVGPoint
    native: function () {
      // create new point
      var point = new SVGPoint()

      // update with current values
      point.x = this.x
      point.y = this.y

      return point
    },
    // transform point with matrix
    transform: function (matrix) {
      return new Point(this.native().matrixTransform(matrix))
    },
    add: function (x, y) {
      var p = new Point(x, y)
      return new Point(this.x + p.x, this.y + p.y)
    },
    sub: function (x, y) {
      var p = new Point(x, y)
      return new Point(this.x - p.x, this.y - p.y)
    },
    mul: function (factor) {
      return new Point(this.x * factor, this.y * factor)
    },
    div: function (factor) {
      return new Point(this.x / factor, this.y / factor)
    },
    absQuad: function () {
      return this.x * this.x + this.y * this.y
    },
    abs: function () {
      return Math.sqrt(this.absQuad())
    },
    normalize: function () {
      var abs = this.abs()
      if (!abs) throw new Error('Can\'t normalize vector of zero length')
      return this.div(abs)
    },
    normal: function () {
      return new Point(this.y, -this.x)
    },
    toArray: function () {
      return [this.x, this.y]
    },
    reflectAt: function (p) {
      return p.add(p.sub(this))
    },
    toPath: function () {
      return ['M', this.x, this.y].join(' ')
    },
    equals: function (p) {
      return this.x === p.x && this.y === p.y
    },
    closeTo: function (p, eta = 0.00001) {
      return this.equals(p) || (Math.abs(this.x - p.x) < eta && Math.abs(this.y - p.y) < eta)
    },
    angleTo: function (p) {
      var sign = Math.sign(this.x * p.y - this.y * p.x)
      sign = sign || 1
      return sign * Math.acos(Math.round((this.dot(p) / (this.abs() * p.abs())) * 1000000) / 1000000)
    },
    dot: function (p) {
      return this.x * p.x + this.y * p.y
    }

  }

})

module.exports = Point
