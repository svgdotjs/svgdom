import {Element} from '../Element.js';
export class SVGElement extends Element {
  get ownerSVGElement() {
    let parent;
    while ((parent = this.parentNode)) {
      if ('svg' == parent.nodeName) {
        return parent;
      }
    }
    return null;
  }

  get viewportElement() {
    let parent;
    while ((parent = this.parentNode)) {
      // TODO: and others
      if (['svg', 'symbol'].includes(parent.nodeName)) {
        return parent;
      }
    }
    return null;
  }
}
