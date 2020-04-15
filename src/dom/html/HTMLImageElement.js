import sizeOf from 'image-size'
import { Event } from '../Event.js'
import { HTMLElement } from './HTMLElement.js'
// import { getFileBufferFromURL } from '../../utils/fileUrlToBuffer.js'
// import path from 'path'

export class HTMLImageElement extends HTMLElement {
  constructor () {
    super('img')
    this.naturalWidth = 0
    this.naturalHeight = 0
    this.complete = false
  }
}

Object.defineProperties(HTMLImageElement.prototype, {
  src: {
    get () {
      return this.attrs.get('src')
    },
    set (val) {
      this.attrs.set('src', val)
      // const url = path.resolve(this.ownerDocument.defaultView.location, val)
      // getFileBufferFromURL(url, (buffer) => {
      sizeOf(val, (err, size) => {
        if (err) {
          this.dispatchEvent(new Event('error'))
          return
        }
        this.naturalWidth = size.width
        this.naturalHeight = size.height
        this.complete = true
        this.dispatchEvent(new Event('load'))
      })
      // })
    }
  },
  height: {
    get () {
      return this.attrs.get('height') || this.naturalHeight
    },
    set (val) {
      this.attrs.set('height', val)
    }
  },
  width: {
    get () {
      return this.attrs.get('width') || this.naturalWidth
    },
    set (val) {
      this.attrs.set('width', val)
    }
  }
})
