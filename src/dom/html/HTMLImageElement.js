import sizeOf from 'image-size'
import { Event } from '../Event.js'
import { HTMLElement } from './HTMLElement.js'

export class HTMLImageElement extends HTMLElement {
  constructor () {
    super('img')
    this.width = 0
    this.height = 0
    this.naturalWidth = 0
    this.naturalHeight = 0
  }
}

Object.defineProperties(HTMLImageElement.prototype, {
  src: {
    get () {
      return this.attrs.get('src')
    },
    set (val) {
      this.attrs.set('src', val)
      sizeOf(val, (err, size) => {
        if (err) {
          this.dispatchEvent(new Event('error', this))
          return
        }
        this.width = this.naturalWidth = size.width
        this.height = this.naturalHeight = size.height
        this.dispatchEvent(new Event('load', this))
      })
    }
  },
  height: {
    get () {
      return this.attrs.get('height')
    },
    set (val) {
      this.attrs.set('height', val)
    }
  },
  width: {
    get () {
      return this.attrs.get('width')
    },
    set (val) {
      this.attrs.set('width', val)
    }
  }
})
