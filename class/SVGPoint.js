const { invent } = require('../utils/objectCreationUtils')

const SVGPoint = invent({
  name: 'SVGPoint',
  create: function () {
    this.x = 0
    this.y = 0
  },
  extend: {
    matrixTransform: function (m) {
      var r = new SVGPoint()
      r.x = m.a * this.x + m.c * this.y + m.e * 1
      r.y = m.b * this.x + m.d * this.y + m.f * 1
      return r
    }
  }
})

module.exports = SVGPoint
