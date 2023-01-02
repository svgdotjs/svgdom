import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGImageElement extends SVGGraphicsElement {
  x = new SVGAnimatedLength(self, 'x')
  y = new SVGAnimatedLength(self, 'y')
  width = new SVGAnimatedLength(self, 'width')
  height = new SVGAnimatedLength(self, 'height')
}
