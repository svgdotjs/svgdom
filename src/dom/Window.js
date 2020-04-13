import path from 'path'
import fontkit from 'fontkit'
import { extend } from '../utils/objectCreationUtils.js'
import { EventTarget } from './EventTarget.js'
import { SVGPoint } from './SVGPoint.js'
import { SVGMatrix } from './SVGMatrix.js'
import { Node } from './Node.js'
import { SVGElement } from './SVGElement.js'
import { HTMLImageElement } from './HTMLImageElement.js'
import { Document } from './Document.js'
import { DocumentFragment } from './DocumentFragment.js'
import { TextNode } from './TextNode.js'
import { CustomEvent } from './CustomEvent.js'
import { Event } from './Event.js'
import { HTMLLinkElement } from './HTMLLinkElement.js'
import { HTMLScriptElement } from './HTMLScriptElement.js'

class Window extends EventTarget {
  constructor () {
    super()
    this.document = new Document('svg')
  }

  setFontDir (dir) {
    this.document.fontDir = dir
    return this
  }

  setFontFamilyMappings (map) {
    this.document.fontFamilyMappings = map
    return this
  }

  preloadFonts () {
    var map = this.document.fontFamilyMappings
    var filename

    for (var i in map) {
      filename = path.join(this.document.fontDir, map[i])

      try {
        this.document._preloaded[i] = fontkit.openSync(filename)
      } catch (e) {
        console.warn('Could not load font file for ' + i + '.' + e)
      }
    }

    return this

  }

  getComputedStyle (node) {

    return {
      // FIXME: Currently this function treats every given attr
      // as inheritable from its parents which is ofc not always true
      // but good enough for svg.js
      getPropertyValue (attr) {
        let value

        do {
          value = node.style[attr] || node.getAttribute(attr)
        } while (
          value == null
          && (node = node.parentNode)
          && node.nodeType === 1
        )

        return value || null
      }
    }
  }
}

const winProps = {
  Window,
  Document,
  DocumentFragment,
  Node,
  TextNode,
  SVGElement,
  Element: SVGElement,
  CustomEvent,
  Event,
  SVGMatrix,
  SVGPoint,
  HTMLLinkElement,
  HTMLScriptElement,
  HTMLImageElement,
  Image: HTMLImageElement,
  setTimeout: global.setTimeout,
  clearTimeout: global.clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0
}

extend(Window, winProps)

export { Window }

/* export {
  Window,
  Document,
  DocumentFragment,
  Node,
  TextNode,
  SVGElement,
  CustomEvent,
  Event,
  SVGMatrix,
  SVGPoint,
  HTMLLinkElement,
  HTMLScriptElement,
  HTMLImageElement
}

export const Element = SVGElement
export const Image = HTMLImageElement
export const setTimeout = global.setTimeout
export const clearTimeout = global.clearTimeout
export const pageXOffset = 0
export const pageYOffset = 0 */
