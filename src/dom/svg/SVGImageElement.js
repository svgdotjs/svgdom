import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGImageElement extends SVGGraphicsElement {
  x = new SVGAnimatedLength(this, 'x')
  y = new SVGAnimatedLength(this, 'y')
  width = new SVGAnimatedLength(this, 'width')
  height = new SVGAnimatedLength(this, 'height')
}
