import { SVGGraphicsElement } from './SVGGraphicsElement.js'
import { Box } from '../../other/Box.js'
import { SVGMatrix } from './SVGMatrix.js'
import { SVGPoint } from './SVGPoint.js'

export class SVGSVGElement extends SVGGraphicsElement {
  createSVGRect () {
    return new Box()
  }

  createSVGMatrix () {
    return new SVGMatrix()
  }

  createSVGPoint () {
    return new SVGPoint()
  }
}
