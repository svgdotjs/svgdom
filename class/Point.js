const SVGPoint = require('./SVGPoint')

class Point {
  // Initialize
  constructor (x, y) {
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
  }

  // Clone point
  clone () {
    return new Point(this)
  }
  // Convert to native SVGPoint
  native () {
    // create new point
    var point = new SVGPoint()

    // update with current values
    point.x = this.x
    point.y = this.y

    return point
  }
  // transform point with matrix
  transform (matrix) {
    return new Point(this.native().matrixTransform(matrix))
  }
  add (x, y) {
    var p = new Point(x, y)
    return new Point(this.x + p.x, this.y + p.y)
  }
  sub (x, y) {
    var p = new Point(x, y)
    return new Point(this.x - p.x, this.y - p.y)
  }
  mul (factor) {
    return new Point(this.x * factor, this.y * factor)
  }
  div (factor) {
    return new Point(this.x / factor, this.y / factor)
  }
  absQuad () {
    return this.x * this.x + this.y * this.y
  }
  abs () {
    return Math.sqrt(this.absQuad())
  }
  normalize () {
    var abs = this.abs()
    if (!abs) throw new Error('Can\'t normalize vector of zero length')
    return this.div(abs)
  }
  normal () {
    return new Point(this.y, -this.x)
  }
  toArray () {
    return [this.x, this.y]
  }
  reflectAt (p) {
    return p.add(p.sub(this))
  }
  toPath () {
    return ['M', this.x, this.y].join(' ')
  }
  equals (p) {
    return this.x === p.x && this.y === p.y
  }
  closeTo (p, eta = 0.00001) {
    return this.equals(p) || (Math.abs(this.x - p.x) < eta && Math.abs(this.y - p.y) < eta)
  }
  angleTo (p) {
    var sign = Math.sign(this.x * p.y - this.y * p.x)
    sign = sign || 1
    return sign * Math.acos(Math.round((this.dot(p) / (this.abs() * p.abs())) * 1000000) / 1000000)
  }
  dot (p) {
    return this.x * p.x + this.y * p.y
  }
}

module.exports = Point
