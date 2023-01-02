// @ts-check
import { SVGGraphicsElement } from './SVGGraphicsElement.js'
import { SVGAnimatedLength } from './SVGAnimatedLength.js'

export class SVGRectElement extends SVGGraphicsElement {
  x = new SVGAnimatedLength(this, 'x')
  y = new SVGAnimatedLength(this, 'y')
  width = new SVGAnimatedLength(this, 'width')
  height = new SVGAnimatedLength(this, 'height')
  rx = new SVGAnimatedLength(this, 'rx')
  ry = new SVGAnimatedLength(this, 'ry')
}
