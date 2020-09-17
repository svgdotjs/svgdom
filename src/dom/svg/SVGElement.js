import { Element } from '../Element.js'
export class SVGElement extends Element {
  get ownerSVGElement () {
    let owner = null
    let parent = this
    while ((parent = parent.parentNode)) {
      if (parent.nodeName === 'svg') {
        owner = parent
      }
    }
    return owner
  }

  get viewportElement () {
    let owner = null
    let parent
    while ((parent = this.parentNode)) {
      // TODO: and others
      if ([ 'svg', 'symbol' ].conains(parent.nodeName)) {
        owner = parent
      }
    }
    return owner
  }
}
