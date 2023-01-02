// @ts-check
import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGLineElement extends SVGGraphicsElement {
  x1 = new SVGAnimatedLength(this, 'x1')
  y1 = new SVGAnimatedLength(this, 'y1')
  x2 = new SVGAnimatedLength(this, 'x2')
  y2 = new SVGAnimatedLength(this, 'y2')
}
