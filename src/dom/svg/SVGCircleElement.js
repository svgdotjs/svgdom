// @ts-check
import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGCircleElement extends SVGGraphicsElement {
  cx = new SVGAnimatedLength(this, 'cx')
  cy = new SVGAnimatedLength(this, 'cy')
  r = new SVGAnimatedLength(this, 'r')
}
