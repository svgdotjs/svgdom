import { SVGGraphicsElement } from './SVGGraphicsElement.js'
import * as pathUtils from '../../utils/pathUtils.js'

export class SVGPathElement extends SVGGraphicsElement {
  getPointAtLength (len) {
    return pathUtils.pointAtLength(this.getAttribute('d'), len)
  }

  getTotalLength () {
    return pathUtils.length(this.getAttribute('d'))
  }
}
