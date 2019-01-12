const Box = require('../class/Box')
const Point = require('../class/Point')
const regex = require('./regex')
const matrixFactory = require('../class/SVGMatrix').matrixFactory
const PointCloud = require('./PointCloud.js')
const { NoBox } = Box

var pathHandlers = {
  M (c, p, r, p0) {
    p.x = p0.x = c[0]
    p.y = p0.y = c[1]

    return new Move(p)
  },
  L (c, p) {
    var ret = new Line(p.x, p.y, c[0], c[1])// .offset(o)
    p.x = c[0]
    p.y = c[1]
    return ret
  },
  H (c, p) {
    return pathHandlers.L([c[0], p.y], p)
  },
  V (c, p) {
    return pathHandlers.L([p.x, c[0]], p)
  },
  Q (c, p, r) {
    var ret = Cubic.fromQuad(p, new Point(c[0], c[1]), new Point(c[2], c[3]))// .offset(o)
    p.x = c[2]
    p.y = c[3]

    var reflect = new Point(c[0], c[1]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y

    return ret
  },
  T (c, p, r, p0, reflectionIsPossible) {
    if (reflectionIsPossible) { c = [r.x, r.y].concat(c) } else { c = [p.x, p.y].concat(c) }
    return pathHandlers.Q(c, p, r)
  },
  C (c, p, r) {
    var ret = new Cubic(p, new Point(c[0], c[1]), new Point(c[2], c[3]), new Point(c[4], c[5]))// .offset(o)
    p.x = c[4]
    p.y = c[5]
    var reflect = new Point(c[2], c[3]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y
    return ret
  },
  S (c, p, r, p0, reflectionIsPossible) {
    // reflection makes only sense if this command was preceeded by another beziere command (QTSC)
    if (reflectionIsPossible) { c = [r.x, r.y].concat(c) } else { c = [p.x, p.y].concat(c) }
    return pathHandlers.C(c, p, r)
  },
  Z (c, p, r, p0) {
    // FIXME: The behavior of Z depends on the command before
    return pathHandlers.L([p0.x, p0.y], p)
  },
  A (c, p, r) {
    var ret = new Arc(p, new Point(c[5], c[6]), c[0], c[1], c[2], c[3], c[4])
    p.x = c[5]
    p.y = c[6]
    return ret
  }
}

var mlhvqtcsa = 'mlhvqtcsaz'.split('')

for (var i = 0, il = mlhvqtcsa.length; i < il; ++i) {
  pathHandlers[mlhvqtcsa[i]] = (function (i) {
    return function (c, p, r, p0, reflectionIsPossible) {
      if (i === 'H') c[0] = c[0] + p.x
      else if (i === 'V') c[0] = c[0] + p.y
      else if (i === 'A') {
        c[5] = c[5] + p.x
        c[6] = c[6] + p.y
      } else {
        for (var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x)
        }
      }

      return pathHandlers[i](c, p, r, p0, reflectionIsPossible)
    }
  })(mlhvqtcsa[i].toUpperCase())
}

function pathRegReplace (a, b, c, d) {
  return c + d.replace(regex.dots, ' .')
}

function isBeziere (obj) {
  return obj instanceof Cubic
}

const pathParser = (array) => {

  // prepare for parsing
  var paramCnt = { 'M': 2, 'L': 2, 'H': 1, 'V': 1, 'C': 6, 'S': 4, 'Q': 4, 'T': 2, 'A': 7, 'Z': 0 }

  array = array
    .replace(regex.numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
    .replace(regex.pathLetters, ' $& ') // put some room between letters and numbers
    .replace(regex.hyphen, '$1 -') // add space before hyphen
    .trim() // trim
    .split(regex.delimiter) // split into array

  // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
  var arr = []
  var p = new Point()
  var p0 = new Point()
  var r = new Point()
  var index = 0
  var len = array.length
  var s

  do {
    // Test if we have a path letter
    if (regex.isPathLetter.test(array[index])) {
      s = array[index]
      ++index
    // If last letter was a move command and we got no new, it defaults to [L]ine
    } else if (s === 'M') {
      s = 'L'
    } else if (s === 'm') {
      s = 'l'
    }

    arr.push(
      pathHandlers[s].call(null,
        array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
        p, r, p0,
        isBeziere(arr[arr.length - 1])
      )
    )

  } while (len > index)

  return arr
}

class Move {
  constructor (p) {
    this.p1 = p.clone()
  }

  getCloud () {
    return new PointCloud([this.p1])
  }

  // FIXME: Use pointcloud
  bbox () {
    let p = this.p1
    return new Box(p.x, p.y, 0, 0)
  }

  length () { return 0 }

  toPath () {
    return ['M', this.p1.x, this.p1.y].join(' ')
  }

  toPathFragment () {
    return ['M', this.p1.x, this.p1.y]
  }
}

class Arc {
  constructor (p1, p2, rx, ry, φ, arc, sweep) {
    this.p1 = p1.clone()
    this.p2 = p2.clone()
    this.arc = arc ? 1 : 0
    this.sweep = sweep ? 1 : 0

    var cosφ = Math.cos(φ / 180 * Math.PI)

    var sinφ = Math.sin(φ / 180 * Math.PI)

    var p1_ = new Point(
      (p1.x - p2.x) / 2,
      (p1.y - p2.y) / 2
    ).transform(matrixFactory(
      cosφ, -sinφ, sinφ, cosφ, 0, 0
    ))

    var ratio = (p1_.x * p1_.x) / (rx * rx) + (p1_.y * p1_.y) / (ry * ry)

    if (ratio > 1) {
      rx = Math.sqrt(ratio) * rx
      ry = Math.sqrt(ratio) * ry
    }

    var divisor1 = rx * rx * p1_.y * p1_.y
    var divisor2 = ry * ry * p1_.x * p1_.x

    var c_ = new Point(
      rx * p1_.y / ry,
      -ry * p1_.x / rx
    ).mul(Math.sqrt(
      Math.round((rx * rx * ry * ry - divisor1 - divisor2) * 100000) / 100000
      // -------------------------------//
             / (divisor1 + divisor2)
    ))

    if (arc === sweep) c_ = c_.mul(-1)

    var c = c_.transform(matrixFactory(
      cosφ, sinφ, -sinφ, cosφ, 0, 0
    )).add(new Point(
      (p1.x + p2.x) / 2,
      (p1.y + p2.y) / 2
    ))

    var anglePoint = new Point(
      (p1_.x - c_.x) / rx,
      (p1_.y - c_.y) / ry
    )

    var θ = new Point(1, 0).angleTo(anglePoint)

    var Δθ = anglePoint.angleTo(new Point(
      (-p1_.x - c_.x) / rx,
      (-p1_.y - c_.y) / ry
    ))

    Δθ = (Δθ % (2 * Math.PI))

    if (!sweep && Δθ > 0) Δθ -= 2 * Math.PI
    if (sweep && Δθ < 0) Δθ += 2 * Math.PI

    this.c = c
    this.theta = θ * 180 / Math.PI
    this.theta2 = (θ + Δθ) * 180 / Math.PI

    this.delta = Δθ * 180 / Math.PI
    this.rx = rx
    this.ry = ry
    this.phi = φ
    this.cosφ = cosφ
    this.sinφ = sinφ
  }

  pointAt (t) {
    const tInAngle = (this.theta + t * this.delta) / 180 * Math.PI
    const sinθ = Math.sin(tInAngle)
    const cosθ = Math.cos(tInAngle)

    return new Point(
      this.cosφ * this.rx * cosθ - this.sinφ * this.ry * sinθ + this.c.x,
      this.sinφ * this.rx * cosθ + this.cosφ * this.ry * sinθ + this.c.y
    )
  }

  length () {
    var length = this.p2.sub(this.p1).abs()

    var ret = this.splitAt(0.5)
    var len1 = ret[0].p2.sub(ret[0].p1).abs()
    var len2 = ret[1].p2.sub(ret[1].p1).abs()

    if (len1 + len2 - length < 0.00001) {
      return len1 + len2
    }

    return ret[0].length() + ret[1].length()
  }

  splitAt (t) {
    var absDelta = Math.abs(this.delta)
    var delta1 = absDelta * t
    var delta2 = absDelta * (1 - t)

    return [
      new Arc(this.p1, this.pointAt(t), this.rx, this.ry, this.phi, delta1 > 180, this.sweep),
      new Arc(this.pointAt(t), this.p2, this.rx, this.ry, this.phi, delta2 > 180, this.sweep)
    ]
  }

  clone () {
    return new Arc(this.p1, this.p2, this.rx, this.ry, this.phi, this.arc, this.sweep)
  }

  getCloud () {
    // arc could be rotated. the min and max values then dont lie on multiples of 90 degress but are shifted by the rotation angle
    // so we first calculate our 0/90 degree angle
    var θ01 = Math.atan(-this.sinφ / this.cosφ * this.ry / this.rx) * 180 / Math.PI
    var θ02 = Math.atan(this.cosφ / this.sinφ * this.ry / this.rx) * 180 / Math.PI
    var θ1 = this.theta
    var θ2 = this.theta2

    if (θ1 < 0 || θ2 < 0) {
      θ1 += 360
      θ2 += 360
    }

    if (θ2 < θ1) {
      let temp = θ1
      θ1 = θ2
      θ2 = temp

    }

    while (θ01 - 90 > θ01) θ01 -= 90
    while (θ01 < θ1) θ01 += 90
    while (θ02 - 90 > θ02) θ02 -= 90
    while (θ02 < θ1) θ02 += 90

    const angleToTest = [θ01, θ02, (θ01 + 90), (θ02 + 90), (θ01 + 180), (θ02 + 180), (θ01 + 270), (θ02 + 270)]

    let points = angleToTest.filter(function (angle) {
      return (angle > θ1 && angle < θ2)
    }).map(function (angle) {
      while (this.theta < angle) angle -= 360
      return this.pointAt(((angle - this.theta) % 360) / (this.delta)) // TODO: replace that call with pointAtAngle
    }.bind(this)).concat(this.p1, this.p2)

    return new PointCloud(points)
  }

  bbox () {
    const cloud = this.getCloud()
    return cloud.bbox()
  }

  toPathFragment () {
    return ['A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y]
  }

  toPath () {
    return ['M', this.p1.x, this.p1.y, 'A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y].join(' ')
  }

  static fromCenterForm (c, rx, ry, φ, θ, Δθ) {
    var cosφ = Math.cos(φ / 180 * Math.PI)
    var sinφ = Math.sin(φ / 180 * Math.PI)
    var m = matrixFactory(cosφ, sinφ, -sinφ, cosφ, 0, 0)

    var p1 = new Point(
      rx * Math.cos(θ / 180 * Math.PI),
      ry * Math.sin(θ / 180 * Math.PI)
    ).transform(m).add(c)

    var p2 = new Point(
      rx * Math.cos((θ + Δθ) / 180 * Math.PI),
      ry * Math.sin((θ + Δθ) / 180 * Math.PI)
    ).transform(m).add(c)

    var arc = Math.abs(Δθ) > 180 ? 1 : 0
    var sweep = Δθ > 0 ? 1 : 0

    return new Arc(p1, p2, rx, ry, φ, arc, sweep)
  }
}

class Cubic {
  constructor (p1, c1, c2, p2) {
    if (p1 instanceof Point) {
      this.p1 = new Point(p1)
      this.c1 = new Point(c1)
      this.c2 = new Point(c2)
      this.p2 = new Point(p2)
    } else {
      this.p1 = new Point(p1.p1)
      this.c1 = new Point(p1.c1)
      this.c2 = new Point(p1.c2)
      this.p2 = new Point(p1.p2)
    }
  }

  pointAt (t) {
    return new Point(
      (1 - t) * (1 - t) * (1 - t) * this.p1.x + 3 * (1 - t) * (1 - t) * t * this.c1.x + 3 * (1 - t) * t * t * this.c2.x + t * t * t * this.p2.x,
      (1 - t) * (1 - t) * (1 - t) * this.p1.y + 3 * (1 - t) * (1 - t) * t * this.c1.y + 3 * (1 - t) * t * t * this.c2.y + t * t * t * this.p2.y
    )
  }

  findRootsX () {
    return this.findRootsXY(this.p1.x, this.c1.x, this.c2.x, this.p2.x)
  }

  findRootsY () {
    return this.findRootsXY(this.p1.y, this.c1.y, this.c2.y, this.p2.y)
  }

  findRootsXY (p1, p2, p3, p4) {
    var a = 3 * (-p1 + 3 * p2 - 3 * p3 + p4)
    var b = 6 * (p1 - 2 * p2 + p3)
    var c = 3 * (p2 - p1)

    if (a === 0) return [-c / b].filter(function (el) { return el > 0 && el < 1 })

    if (b * b - 4 * a * c < 0) return []
    if (b * b - 4 * a * c === 0) return [Math.round((-b / (2 * a)) * 100000) / 100000].filter(function (el) { return el > 0 && el < 1 })

    return [
      Math.round((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a) * 100000) / 100000,
      Math.round((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a) * 100000) / 100000
    ].filter(function (el) { return el > 0 && el < 1 })
  }

  findRoots () {
    return this.findRootsX().concat(this.findRootsY())
  }

  lengthAt (t = 1) {
    var curves = this.splitAt(t)[0].makeFlat(t)

    var length = 0
    for (var i = 0, len = curves.length; i < len; ++i) {
      length += curves[i].p2.sub(curves[i].p1).abs()
    }

    return length
  }

  length () {
    return this.lengthAt()
  }

  flatness () {
    var ux = Math.pow(3 * this.c1.x - 2 * this.p1.x - this.p2.x, 2)
    var uy = Math.pow(3 * this.c1.y - 2 * this.p1.y - this.p2.y, 2)
    var vx = Math.pow(3 * this.c2.x - 2 * this.p2.x - this.p1.x, 2)
    var vy = Math.pow(3 * this.c2.y - 2 * this.p2.y - this.p1.y, 2)

    if (ux < vx) { ux = vx }
    if (uy < vy) { uy = vy }

    return ux + uy
  }

  makeFlat (t) {
    if (this.flatness() > 0.15) {
      return this.splitAt(0.5)
        .map(function (el) { return el.makeFlat(t * 0.5) })
        .reduce(function (last, current) { return last.concat(current) }, [])
    } else {
      this.t_value = t
      return [this]
    }
  }

  splitAtScalar (z, p) {
    var p1 = this.p1[p]
    var p2 = this.c1[p]
    var p3 = this.c2[p]
    var p4 = this.p2[p]

    var t = z * z * z * p4 - 3 * z * z * (z - 1) * p3 + 3 * z * (z - 1) * (z - 1) * p2 - (z - 1) * (z - 1) * (z - 1) * p1

    return [
      [
        p1,
        z * p2 - (z - 1) * p1,
        z * z * p3 - 2 * z * (z - 1) * p2 + (z - 1) * (z - 1) * p1,
        t
      ],
      [
        t,
        z * z * p4 - 2 * z * (z - 1) * p3 + (z - 1) * (z - 1) * p2,
        z * p4 - (z - 1) * p3,
        p4
      ]
    ]
  }

  splitAt (z) {
    var x = this.splitAtScalar(z, 'x')
    var y = this.splitAtScalar(z, 'y')

    var a = new Cubic(
      new Point(x[0][0], y[0][0]),
      new Point(x[0][1], y[0][1]),
      new Point(x[0][2], y[0][2]),
      new Point(x[0][3], y[0][3])
    )

    var b = new Cubic(
      new Point(x[1][0], y[1][0]),
      new Point(x[1][1], y[1][1]),
      new Point(x[1][2], y[1][2]),
      new Point(x[1][3], y[1][3])
    )

    return [a, b]
  }

  getCloud () {
    var points = this.findRoots()
      .filter(root => root !== 0 && root !== 1)
      .map(root => this.pointAt(root))
      .concat(this.p1, this.p2)

    return new PointCloud(points)
  }

  bbox () {
    return this.getCloud().bbox()
  }

  toPathFragment () {
    return ['C', this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.p2.x, this.p2.y]
  }

  toPath () {
    return ['M', this.p1.x, this.p1.y].concat(this.toPathFragment()).join(' ')
  }

  static fromQuad (p1, c, p2) {
    var c1 = p1.mul(1 / 3).add(c.mul(2 / 3))
    var c2 = c.mul(2 / 3).add(p2.mul(1 / 3))
    return new Cubic(p1, c1, c2, p2)
  }
}

class Line {
  constructor (x1, y1, x2, y2) {
    if (x1 instanceof Object) {
      this.p1 = new Point(x1)
      this.p2 = new Point(y1)
    } else {
      this.p1 = new Point(x1, y1)
      this.p2 = new Point(x2, y2)
    }
  }

  getCloud () {
    return new PointCloud([this.p1, this.p2])
  }

  bbox () {
    return this.getCloud().bbox()
  }

  pointAt (t) {
    var vec = this.p2.sub(this.p1).mul(t)
    return this.p1.add(vec)
  }

  length () {
    return this.p2.sub(this.p1).abs()
  }

  toPath () {
    return ['M', this.p1.x, this.p1.y, this.p2.x, this.p2.y].join(' ')
  }

  toPathFragment () {
    return ['L', this.p2.x, this.p2.y]
  }
}

const bbox = function (d) {
  return pathParser(d).reduce((l, c) => l.merge(c.bbox()), new NoBox())
}

const pointAtLength = function (d, len) {
  var segs = pathParser(d)

  var segLengths = segs.map(el => el.length())

  var length = segLengths.reduce((l, c) => l + c, 0)

  var i = 0

  let t = len / length

  // FIXME: Pop Move before using shortcut?
  // shortcut for trivial cases
  if (t >= 1) {
    // Check if there is a p2. If not, use p1
    if (segs[segs.length - 1].p2) {
      return segs[segs.length - 1].p2.native()
    } else {
      return segs[segs.length - 1].p1.native()
    }
  }

  if (t <= 0) return segs[0].p1.native()

  // remove move commands at the very end of the path
  while (segs[segs.length - 1] instanceof Move) segs.pop()

  var segEnd = 0

  for (il = segLengths.length; i < il; ++i) {
    var k = segLengths[i] / length
    segEnd += k

    if (segEnd > t) {
      break
    }
  }

  var ratio = length / segLengths[i]
  t = ratio * (t - segEnd) + 1

  return segs[i].pointAt(t).native()
}

const length = function (d) {
  return pathParser(d)
    .reduce((l, c) => l + c.length(), 0)
}

const debug = function (node) {
  const parse = pathParser(node.getAttribute('d'))

  const ret = {
    paths: parse.map(el => el.toPath()),
    fragments: parse.map(el => el.toPathFragment().join(' ')),
    bboxs: parse.map(el => {
      var box = el.bbox()
      return [box.x, box.y, box.width, box.height]
    }),
    bbox: parse.reduce((l, c) => l.merge(c.bbox()), new NoBox()),
    bboxs_new: parse.map(el => {
      return el.getCloud().transform(node.matrixify()).bbox()
    })
  }

  return Object.assign({}, ret, {
    bbox_new: ret.bboxs_new.reduce((l, c) => l.merge(c), new NoBox())
  })
}

const getCloud = (d) => {
  return pathParser(d).reduce((cloud, segment) =>
    segment.getCloud().merge(cloud), new PointCloud()
  )
}

const pathFrom = {
  box ({ x, y, width, height }) {
    return `M ${x} ${y} h ${width} v ${height} H ${x} V ${y}`
  },
  rect (node) {
    const width = parseFloat(node.getAttribute('width')) || 0
    const height = parseFloat(node.getAttribute('height')) || 0
    const x = parseFloat(node.getAttribute('x')) || 0
    const y = parseFloat(node.getAttribute('y')) || 0
    return `M ${x} ${y} h ${width} v ${height} H ${x} V ${y}`
  },
  circle (node) {
    const r = parseFloat(node.getAttribute('r')) || 0
    const x = parseFloat(node.getAttribute('cx')) || 0
    const y = parseFloat(node.getAttribute('cy')) || 0

    if (r === 0) return 'M0 0'

    return `M ${x - r} ${y} A ${r} ${r} 0 0 0 ${x + r} ${y} A ${r} ${r} 0 0 0 ${x - r} ${y}`
  },
  ellipse (node) {
    const rx = parseFloat(node.getAttribute('rx')) || 0
    const ry = parseFloat(node.getAttribute('ry')) || 0
    const x = parseFloat(node.getAttribute('cx')) || 0
    const y = parseFloat(node.getAttribute('cy')) || 0

    return `M ${x - rx} ${y} A ${rx} ${ry} 0 0 0 ${x + rx} ${y} A ${rx} ${ry} 0 0 0 ${x - rx} ${y}`
  },
  polygon (node) {
    return `M ${node.getAttribute('points')} z`
  },
  polyline (node) {
    return `M ${node.getAttribute('points')}`
  }
}

module.exports = {
  bbox,
  pointAtLength,
  length,
  debug,
  Arc,
  pathParser,
  pathFrom,
  getCloud
}
