import { Element } from '../Element.js'
export class SVGElement extends Element {

}

Object.defineProperties(Element.prototype, {
  ownerSVGElement: {
    get () {
      let owner = null
      let parent
      while ((parent = this.parentNode)) {
        if (parent.nodeName === 'svg') {
          owner = parent
        }
      }
      return owner
    }
  },
  viewportElement: {
    get () {
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
})
