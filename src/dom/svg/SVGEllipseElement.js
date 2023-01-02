// @ts-check
import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGEllipseElement extends SVGGraphicsElement {
  cx = new SVGAnimatedLength(this, 'cx')
  cy = new SVGAnimatedLength(this, 'cy')
  rx = new SVGAnimatedLength(this, 'rx')
  ry = new SVGAnimatedLength(this, 'ry')
}
