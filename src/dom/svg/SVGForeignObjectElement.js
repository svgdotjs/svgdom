// @ts-check

import { SVGAnimatedLength } from './SVGAnimatedLength.js'
import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGForeignObjectElement extends SVGGraphicsElement {
  x = new SVGAnimatedLength(this, 'x')
  y = new SVGAnimatedLength(this, 'y')
  width = new SVGAnimatedLength(this, 'width')
  height = new SVGAnimatedLength(this, 'height')
}
