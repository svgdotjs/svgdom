import { extend } from '../utils/objectCreationUtils.js'
import { EventTarget } from './EventTarget.js'
import { Node } from './Node.js'
import { Document } from './Document.js'
import { DocumentFragment } from './DocumentFragment.js'
import { Text } from './Text.js'
import { CustomEvent } from './CustomEvent.js'
import { Event } from './Event.js'
import { Element } from './Element.js'
import { Attr } from './Attr.js'
import { HTMLImageElement } from './html/HTMLImageElement.js'
import { HTMLLinkElement } from './html/HTMLLinkElement.js'
import { HTMLScriptElement } from './html/HTMLScriptElement.js'
import { HTMLElement } from './html/HTMLElement.js'
import { SVGPoint } from './svg/SVGPoint.js'
import { SVGMatrix } from './svg/SVGMatrix.js'
import { SVGElement } from './svg/SVGElement.js'
import { SVGSVGElement } from './svg/SVGSVGElement.js'
import { SVGPathElement } from './svg/SVGPathElement.js'
import { SVGGraphicsElement } from './svg/SVGGraphicsElement.js'
import { SVGTextContentElement } from './svg/SVGTextContentElement.js'
import { camelCase } from '../utils/strUtils.js'
import * as defaults from '../utils/defaults.js'

export class Window extends EventTarget {
  constructor () {
    super()
    this.document = new Document()
    this.document.defaultView = this
    this.self = this
    const doc = this.document
    this.Image = class {
      constructor (width, height) {
        const img = doc.createElement('img')
        if (width != null) img.setAttribute('width', width)
        if (height != null) img.setAttribute('height', height)
        return img
      }
    }
  }

  getComputedStyle (node) {
    return {
      // FIXME: Currently this function treats every given attr
      // as inheritable from its parents which is ofc not always true
      // but good enough for svg.js
      getPropertyValue (attr) {
        let value
        let cur = node

        do {
          value = cur.style[attr] || cur.getAttribute(attr)
        } while (
          value == null
          && (cur = cur.parentNode)
          && cur.nodeType === 1
        )

        return value || defaults[camelCase(attr)] || null
      }
    }
  }
}

let lastTime = 0
const requestAnimationFrame = callback => {
  const now = new globalThis.Date().getTime()
  const timeToCall = Math.max(0, 16 - (now - lastTime))
  return globalThis.setTimeout(() => {
    lastTime = now + timeToCall
    callback(lastTime)
  }, timeToCall)
}

const nowOffset = globalThis.Date.now()
const performance = {
  now: () => Date.now() - nowOffset
}

const winProps = {
  Window,
  Document,
  DocumentFragment,
  Node,
  EventTarget,
  Text,
  Attr,
  Element,
  CustomEvent,
  Event,
  HTMLElement,
  HTMLLinkElement,
  HTMLScriptElement,
  HTMLImageElement,
  // Image: HTMLImageElement, // is set on construction
  SVGMatrix,
  SVGPoint,
  SVGElement,
  SVGSVGElement,
  SVGPathElement,
  SVGGraphicsElement,
  SVGTextContentElement,
  setTimeout: globalThis.setTimeout,
  clearTimeout: globalThis.clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0,
  Date: globalThis.Date,
  requestAnimationFrame,
  cancelAnimationFrame: globalThis.clearTimeout,
  performance
}

extend(Window, winProps)
