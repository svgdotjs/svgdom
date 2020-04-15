import { extend } from '../utils/objectCreationUtils.js'
import { EventTarget } from './EventTarget.js'
import { Node } from './Node.js'
import { Document } from './Document.js'
import { DocumentFragment } from './DocumentFragment.js'
import { TextNode } from './TextNode.js'
import { CustomEvent } from './CustomEvent.js'
import { Event } from './Event.js'
import { Element } from './Element.js'
import { AttributeNode } from './AttributeNode.js'
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

        return value || defaults[camelCase(attr)] || null
      }
    }
  }
}

const winProps = {
  Window,
  Document,
  DocumentFragment,
  Node,
  EventTarget,
  TextNode,
  AttributeNode,
  Element,
  CustomEvent,
  Event,
  HTMLElement,
  HTMLLinkElement,
  HTMLScriptElement,
  HTMLImageElement,
  Image: HTMLImageElement,
  SVGMatrix,
  SVGPoint,
  SVGElement,
  SVGSVGElement,
  SVGPathElement,
  SVGGraphicsElement,
  SVGTextContentElement,
  setTimeout: global.setTimeout,
  clearTimeout: global.clearTimeout,
  pageXOffset: 0,
  pageYOffset: 0

}

extend(Window, winProps)
