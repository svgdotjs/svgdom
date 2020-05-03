import { SVGGraphicsElement } from './SVGGraphicsElement.js'

export class SVGTextContentElement extends SVGGraphicsElement {
  getComputedTextLength () {
    return this.getBBox().width
  }
}
