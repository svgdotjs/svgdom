import { imageSizeFromFile } from 'image-size/fromFile'
import { Event } from '../Event.js'
import { HTMLElement } from './HTMLElement.js'

export class HTMLImageElement extends HTMLElement {
  constructor(...args) {
    super(...args)
    this.naturalWidth = 0
    this.naturalHeight = 0
    this.complete = false
  }
}

Object.defineProperties(HTMLImageElement.prototype, {
  src: {
    get() {
      return this.getAttribute('src')
    },
    set(val) {
      this.setAttribute('src', val)
      imageSizeFromFile(val)
        .then(size => {
          this.naturalWidth = size.width
          this.naturalHeight = size.height
          this.complete = true
          this.dispatchEvent(new Event('load'))
        })
        .catch(() => {
          this.dispatchEvent(new Event('error'))
        })
    }
  },
  height: {
    get() {
      return this.getAttribute('height') || this.naturalHeight
    },
    set(val) {
      this.setAttribute('height', val)
    }
  },
  width: {
    get() {
      return this.getAttribute('width') || this.naturalWidth
    },
    set(val) {
      this.setAttribute('width', val)
    }
  }
})
