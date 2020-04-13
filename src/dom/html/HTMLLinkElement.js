import { HTMLElement } from './HTMLElement.js'

export class HTMLLinkElement extends HTMLElement {
  constructor () {
    super('link')
  }
}

Object.defineProperties(HTMLLinkElement.prototype, {
  href: {
    get () {
      return this.attrs.get('href')
    },
    set (val) {
      this.attrs.set('href', val)
    }
  },
  rel: {
    get () {
      return this.attrs.get('rel')
    },
    set (val) {
      this.attrs.set('rel', val)
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
