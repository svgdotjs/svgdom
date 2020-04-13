
import { HTMLElement } from './HTMLElement.js'
export class HTMLScriptElement extends HTMLElement {
  constructor () {
    super('script')
  }
}

Object.defineProperties(HTMLScriptElement.prototype, {
  src: {
    get () {
      return this.attrs.get('src')
    },
    set (val) {
      this.attrs.set('src', val)
    }
  },
  type: {
    get () {
      return this.attrs.get('type')
    },
    set (val) {
      this.attrs.set('type', val)
    }
  }
})
