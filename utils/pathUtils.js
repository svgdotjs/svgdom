const {invent} = require('./objectCreationUtils')
const Box = require('../class/Box')
const Point = require('../class/Point')
const regex = require('./regex')
const matrixFactory = require('../class/SVGMatrix').matrixFactory

var pathHandlers = {
  M: function(c, p, r, p0) {
    p.x = p0.x = c[0]
    p.y = p0.y = c[1]

    return new Move(p)
  },
  L: function(c, p) {
    var ret = new Line(p.x, p.y, c[0], c[1])//.offset(o)
    p.x = c[0]
    p.y = c[1]
    return ret
  },
  H: function(c, p) {
    return pathHandlers.L([c[0], p.y], p)
  },
  V: function(c, p) {
    return pathHandlers.L([p.x, c[0]], p)
  },
  Q: function(c, p, r) {
    var ret = Cubic.fromQuad(p, new Point(c[0], c[1]), new Point(c[2], c[3]))//.offset(o)
    p.x = c[2]
    p.y = c[3]

    var reflect = new Point(c[0], c[1]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y

    return ret
  },
  T: function(c, p, r) {
    c = [r.x, r.y].concat(c)
    return pathHandlers.Q(c, p, r)
  },
  C: function(c, p, r) {
    var ret = new Cubic(p, new Point(c[0], c[1]), new Point(c[2], c[3]), new Point(c[4], c[5]))//.offset(o)
    p.x = c[4]
    p.y = c[5]
    var reflect = new Point(c[2], c[3]).reflectAt(p)
    r.x = reflect.x
    r.y = reflect.y
    return ret
  },
  S: function(c, p, r) {
    c = [r.x, r.y].concat(c)
    return pathHandlers.C(c, p, r)
  },
  Z: function(c, p, r, p0) {
    return pathHandlers.L([p.x, p.y],p0)
  },
  A: function(c, p, r) {
    return new Arc(p, new Point(c[5], c[6]), c[0], c[1], c[2], c[3], c[4])
  }
}

var mlhvqtcsa = 'mlhvqtcsaz'.split('')

for(var i = 0, il = mlhvqtcsa.length; i < il; ++i){
  pathHandlers[mlhvqtcsa[i]] = (function(i){
    return function(c, p, r, p0) {
      if(i == 'H') c[0] = c[0] + p.x
      else if(i == 'V') c[0] = c[0] + p.y
      else if(i == 'A'){
        c[5] = c[5] + p.x,
        c[6] = c[6] + p.y
      }
      else
        for(var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j%2 ? p.y : p.x)
        }

      return pathHandlers[i](c, p, r, p0)
    }
  })(mlhvqtcsa[i].toUpperCase())
}

function pathRegReplace(a, b, c, d) {
  return c + d.replace(regex.dots, ' .')
}

var pathParser = (array) => {

  // prepare for parsing
  var i, x0, y0, s, seg, arr
    , x = 0
    , y = 0
    , paramCnt = { 'M':2, 'L':2, 'H':1, 'V':1, 'C':6, 'S':4, 'Q':4, 'T':2, 'A':7, 'Z':0 }

  array = array
    .replace(regex.numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
    .replace(regex.pathLetters, ' $& ') // put some room between letters and numbers
    .replace(regex.hyphen, '$1 -')      // add space before hyphen
    .trim()                                 // trim
    .split(regex.delimiter)   // split into array


  // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]
  var arr = []
    , p = new Point()
    , p0 = new Point()
    , r = new Point()
    , index = 0
    , len = array.length

  do{
    // Test if we have a path letter
    if(regex.isPathLetter.test(array[index])){
      s = array[index]
      ++index
    // If last letter was a move command and we got no new, it defaults to [L]ine
    }else if(s == 'M'){
      s = 'L'
    }else if(s == 'm'){
      s = 'l'
    }

    arr.push(pathHandlers[s].call(null,
        array.slice(index, (index = index + paramCnt[s.toUpperCase()])).map(parseFloat),
        p, r, p0
      )
    )

  }while(len > index)

  return arr
}

var Move = invent({
  name: 'Move',
  create: function(p) {
    this.p1 = p.clone()
  }, extend: {
    bbox(){ return new Box(this.p1.x, this.p1.y, 0, 0) },
    length() { return 0 }
  }
})


var Arc = invent({
  name: 'Arc',
  create: function(p1, p2, rx, ry, φ, arc, sweep) {
    this.p1 = p1.clone()
    this.p2 = p2.clone()
    this.arc = arc
    this.sweep = sweep

    var cosφ = Math.cos(φ/180 * Math.PI)
      , sinφ = Math.sin(φ/180 * Math.PI)

    var p1_ = new Point(
      (p1.x - p2.x) / 2,
      (p1.y - p2.y) / 2
    ).transform(matrixFactory(
      cosφ, -sinφ, sinφ, cosφ, 0, 0
    ))

    var ratio = (p1_.x*p1_.x)/(rx*rx) + (p1_.y*p1_.y)/(ry*ry)

    if(ratio > 1) {
      rx = Math.sqrt(ratio)*rx
      ry = Math.sqrt(ratio)*ry
    }

    var divisor1 = rx*rx*p1_.y*p1_.y
    var divisor2 = ry*ry*p1_.x*p1_.x

    var c_ = new Point(
      rx*p1_.y/ry,
      -ry*p1_.x/rx
    ).mul(Math.sqrt(
      (rx*rx*ry*ry - divisor1 - divisor2) /
      //-------------------------------//
             (divisor1 + divisor2)
    ))

    if(arc == sweep) c_ = c_.mul(-1)

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

    var θ = new Point(1,0).angleTo(anglePoint)

    var Δθ = anglePoint.angleTo(new Point(
      (-p1_.x - c_.x) / rx,
      (-p1_.y - c_.y) / ry
    ))

    Δθ = (Δθ % (2*Math.PI))

    if( sweep && θ > 0) θ -= 2*Math.PI
    if(!sweep && θ < 0) θ += 2*Math.PI

    this.c = c
    this.theta = θ * 180 / Math.PI
    this.theta2 = (θ + Δθ) * 180 / Math.PI
    this.delta = Δθ * 180 / Math.PI
    this.rx = rx
    this.ry = ry
    this.phi = φ
    this.cosφ = cosφ
    this.sinφ = sinφ

  }, extend: {
    pointAt: function(t) {
      var tInAngle = (this.theta + t * this.delta) / 180 * Math.PI
        , sinθ = Math.sin(tInAngle)
        , cosθ = Math.cos(tInAngle)
        
      return new Point(
        this.cosφ * this.rx*cosθ - this.sinφ * this.ry*sinθ + this.c.x,
        this.sinφ * this.rx*cosθ + this.cosφ * this.ry*sinθ + this.c.y
      )
    },
    length: function() {
      var length = this.p2.sub(this.p1).abs()

      var ret = this.splitAt(0.5)
      var len1 = ret[0].p2.sub(ret[0].p1).abs()
      var len2 = ret[1].p2.sub(ret[1].p1).abs()

      if(len1 + len2 - length < 0.00001){
        return len1 + len2
      }

      return ret[0].length() + ret[1].length()
    },
    splitAt: function(t) {
      var tInAngle = (this.theta + t * this.delta) / 180 * Math.PI

      var arc1 = this.clone()
      var arc2 = this.clone()

      arc1.delta = this.delta * t
      arc2.delta = this.delta * (1-t)

      arc1.p2 = this.pointAt(t)
      arc2.p1 = this.pointAt(1-t)

      arc1.theta2 = (this.theta + arc1.delta)
      arc2.theta = (this.theta + arc1.delta)

      return [arc1, arc2]
    },
    clone: function() {
      return new Arc(this.p1, this.p2, this.rx, this.ry, this.phi, this.arc, this.sweep)
    },
    bbox: function(t) {
      var θ01 = Math.atan(-this.sinφ/this.cosφ * this.ry/this.rx) * 180/Math.PI
        , θ02 = Math.atan( this.cosφ/this.sinφ * this.ry/this.rx) * 180/Math.PI
        , θ1 = this.theta
        , θ2 = this.theta2
        , angleToTest = [θ01, θ02, (θ01+180), (θ02+180), (θ01-180), (θ02-180)]

      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
        , points = angleToTest.filter(function(angle) {
            return angle > θ1 && angle < θ2
          }).map(function(angle) {
            return this.pointAt((angle-θ1)/this.delta)
          }.bind(this)).concat(this.p1, this.p2)

      points.forEach(function(p) {
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
    },
    toPathFragment: function() {
      var arc = Arc.fromCenterForm(
        this.c,
        this.ry, this.ry,
        this.phi,
        this.theta,
        this.delta
      )

      return ['A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y].join(' ')
    },
    toPath: function() {
      var arc = Arc.fromCenterForm(
        this.c,
        this.ry, this.ry,
        this.phi,
        this.theta,
        this.delta
      )

      return ['M', this.p1.x, this.p1.y, 'A', this.rx, this.ry, this.phi, this.arc, this.sweep, this.p2.x, this.p2.y].join(' ')
    }
  }
})

Arc.fromCenterForm = function(c, rx, ry, φ, θ, Δθ) {
  var cosφ = Math.cos(φ/180 * Math.PI)
    , sinφ = Math.sin(φ/180 * Math.PI)
    , cosθ = Math.cos(θ/180 * Math.PI)
    , sinθ = Math.sin(θ/180 * Math.PI)
    , m = matrixFactory(cosφ, sinφ, -sinφ, cosφ, 0, 0)

  var p1 = new Point(
    rx * Math.cos(θ/180 * Math.PI),
    ry * Math.sin(θ/180 * Math.PI)
  ).transform(m).add(c)

  var p2 = new Point(
    rx * Math.cos((θ+Δθ)/180 * Math.PI),
    ry * Math.sin((θ+Δθ)/180 * Math.PI)
  ).transform(m).add(c)

  var arc = Math.abs(Δθ) > 180 ? 1 : 0
  var sweep = Δθ > 0 ? 1 : 0

  return new Arc(p1, p2, rx, ry, φ, arc, sweep)
}


var Cubic = invent({
  name: 'Cubic',
  create: function(p1, c1, c2, p2) {
    if(p1 instanceof Point){
      this.p1 = new Point(p1)
      this.c1 = new Point(c1)
      this.c2 = new Point(c2)
      this.p2 = new Point(p2)
    }else{
      this.p1 = new Point(p1.p1)
      this.c1 = new Point(p1.c1)
      this.c2 = new Point(p1.c2)
      this.p2 = new Point(p1.p2)
    }
  },
  extend: {
    pointAt: function(t) {
      return new Point(
        (1-t)*(1-t)*(1-t)*this.p1.x + 3*(1-t)*(1-t)*t*this.c1.x + 3*(1-t)*t*t*this.c2.x + t*t*t*this.p2.x,
        (1-t)*(1-t)*(1-t)*this.p1.y + 3*(1-t)*(1-t)*t*this.c1.y + 3*(1-t)*t*t*this.c2.y + t*t*t*this.p2.y
      )
    },
    findRootsX: function() {
      return this.findRootsXY(this.p1.x, this.c1.x, this.c2.x, this.p2.x)
    },
    findRootsY: function() {
      return this.findRootsXY(this.p1.y, this.c1.y, this.c2.y, this.p2.y)
    },
    findRootsXY: function(p1, p2, p3, p4) {

      var a = 3*(-p1+3*p2-3*p3+p4)
        , b = 6*(p1-2*p2+p3)
        , c = 3*(p2-p1)

      if(b*b-4*a*c < 0) return []
      if(b*b-4*a*c == 0) return [Math.round((-b/(2*a))*100000)/100000].filter(function(el){ return el > 0 && el < 1 })

      return [
        Math.round((-b + Math.sqrt(b*b-4*a*c))/(2*a)*100000)/100000,
        Math.round((-b - Math.sqrt(b*b-4*a*c))/(2*a)*100000)/100000
      ].filter(function(el){ return el > 0 && el < 1 })
    },
    findRoots: function() {
      return this.findRootsX().concat(this.findRootsY())
    },
    lengthAt: function(t) {
      t = t == null ? 1 : t

      var curves = this.splitAt(t)[0].makeFlat(t)

      var length = 0
      for(var i = 0, len = curves.length; i < len; ++i) {
        length += curves[i].p2.sub(curves[i].p1).abs()
      }

      return length
    },
    length: function() {
      return this.lengthAt(1)
    },
    flatness:function(){
        var ux = Math.pow( 3 * this.c1.x - 2 * this.p1.x - this.p2.x, 2 );
        var uy = Math.pow( 3 * this.c1.y - 2 * this.p1.y - this.p2.y, 2 );
        var vx = Math.pow( 3 * this.c2.x - 2 * this.p2.x - this.p1.x, 2 );
        var vy = Math.pow( 3 * this.c2.y - 2 * this.p2.y - this.p1.y, 2 );

        if( ux < vx )
            ux = vx

        if( uy < vy )
            uy = vy

        return ux + uy
    },
    makeFlat: function(t) {
      if(this.flatness() > 0.15) {
        return this.splitAt(0.5)
          .map(function(el){ return el.makeFlat(t*0.5) })
          .reduce(function(last, current){ return last.concat(current) }, [])
      }else{
        this.t_value = t
        return [this]
      }
    },
    splitAtScalar: function(z, p) {
      var p1 = this.p1[p]
        , p2 = this.c1[p]
        , p3 = this.c2[p]
        , p4 = this.p2[p]

      var t = z*z*z*p4 - 3*z*z*(z-1)*p3 + 3*z*(z-1)*(z-1)*p2 - (z-1)*(z-1)*(z-1)*p1

      return [
        [
          p1,
          z*p2-(z-1)*p1,
          z*z*p3-2*z*(z-1)*p2+(z-1)*(z-1)*p1,
          t
        ],
        [
          t,
          z*z*p4-2*z*(z-1)*p3+(z-1)*(z-1)*p2,
          z*p4-(z-1)*p3,
          p4
        ]
      ]
    },
    splitAt: function(z) {
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
    },
    bbox: function() {
      var xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
      var points = this.findRoots()
          .filter(root => root != 0 && root != 1)
          .map(root => this.pointAt(root))
          .concat(this.p1, this.p2)
          .forEach(p => {
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

Cubic.fromQuad = function(p1, c, p2) {
  var c1 = p1.mul(1/3).add(c.mul(2/3))
  var c2 = c.mul(2/3).add(p2.mul(1/3))
  return new Cubic(p1, c1, c2, p2)
}


var Line = invent({
  name: 'Line',
  create: function(x1, y1, x2, y2) {
    if(x1 instanceof Object){
      this.p1 = new Point(x1)
      this.p2 = new Point(y1)
    }else{
      this.p1 = new Point(x1, y1)
      this.p2 = new Point(x2, y2)
    }
  },
  extend: {
    bbox: function() {
      var size = this.p2.sub(this.p1)
      return new Box(
        Math.min(this.p1.x, this.p2.x),
        Math.min(this.p1.y, this.p2.y),
        Math.abs(size.x),
        Math.abs(size.y)
      )
    },
    pointAt: function(t) {
      var vec = this.p2.sub(this.p1).mul(t)
      return this.p1.add(vec)
    },
    length: function() {
      return this.p2.sub(this.p1).abs()
    }
  }
})

const bbox = function(d) {
  return pathParser(d)
    .reduce((l,c) => l == null ? c.bbox() : l.merge(c.bbox()), null)
}

const pointAtLength = function(d, len) {
  var segs = pathParser(d)
    , segLengths = segs.map(el => el.length())
    , length = segLengths.reduce((l,c) => l+c,0)
    , i = 0

  t = len/length

  // shortcut for trivial cases
  if(t >= 1) return segs[segs.length-1].p2 && segs[segs.length-1].p2.native() || segs[0].p1.native()
  if(t <= 0) return segs[0].p1.native()

  // remove move commands at the very end of the path
  while(segs[segs.length-1] instanceof Move) segs.pop()

  var segEnd = 0

  for(il = segLengths.length; i < il; ++i) {
    var k = segLengths[i]/length
    segEnd+= k

    if(segEnd > t){
      break
    }
  }

  var ratio = length/segLengths[i]
  t = ratio*(t - segEnd) + 1

  return segs[i].pointAt(t).native()
}

const length = function(d) {
  return pathParser(d)
    .reduce((l,c) => l+c.length(), 0)
}

module.exports = {
  bbox,
  pointAtLength,
  length
}