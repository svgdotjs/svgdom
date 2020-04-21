import { Node } from './Node.js'

import { ParentNode } from './mixins/ParentNode.js'
import { elementAccess } from './mixins/elementAccess.js'
import { HTMLParser } from './html/HTMLParser.js'
import { DocumentFragment } from './DocumentFragment.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { tag } from '../utils/tagUtils.js'
import { cssToMap, mapToCss, mapMap } from '../utils/mapUtils.js'
import { hexToRGB, decamelize, htmlEntities, cdata, comment } from '../utils/strUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'

// This Proxy proxies all access to node.style to the css saved in the attribute
const getStyleProxy = (node) => {

  return new Proxy(node, {
    get (target, key) {
      const styles = target.getAttribute('style') || ''
      const styleMap = cssToMap(styles)

      if (key === 'cssText') {
        return styles
      }

      if (key === 'setProperty') {
        return function (propertyName, value = '', priority = '') {
          this.style[propertyName] = value + priority ? ` !${priority}` : ''
        }
      }

      key = decamelize(key)
      if (!styleMap.has(key)) return ''

      return styleMap.get(key)
    },
    set (target, key, value) {
      key = decamelize(key)

      if (key === 'cssText') {
        target.setAttribute('style', key)
        return true
      } else {
        value = hexToRGB(value.toString())
        const styles = target.getAttribute('style') || ''
        const styleMap = cssToMap(styles)
        styleMap.set(key, value)

        target.setAttribute('style', mapToCss(styleMap))

        return true
      }
    }
  })
}

export const mapToAttributeArray = function (element) {
  const { attrs, ownerDocument, namespaceURI } = element
  return mapMap(attrs, function (value, key) {
    const attr = ownerDocument.createAttributeNS(namespaceURI, key)
    attr.value = attr.nodeValue = value
    attr.ownerElement = element
    return attr
  })
}

export class Element extends Node {
  constructor (name, props, ns) {
    super(name, props, ns)

    this.style = getStyleProxy(this)
    this.tagName = this.nodeName
  }

  setAttribute (name, value) {
    this.attrs.set(name, value)
  }

  // call is: d.setAttributeNS('http://www.mozilla.org/ns/specialspace', 'spec:align', 'center');
  setAttributeNS (ns = '', name, value) {
    this.setAttribute(name, value)
  }

  removeAttribute (name) {
    this.attrs.delete(name)
  }

  // call is: d.removeAttributeNS('http://www.mozilla.org/ns/specialspace', 'align', 'center');
  removeAttributeNS (ns = '', name) {
    const prefix = this.lookupPrefix(ns)
    if (name.includes(':') || !prefix) {
      return this.removeAttribute(name)
    }

    this.removeAttribute([ ns, name ].join(':'))
  }

  hasAttribute (name) {
    return this.attrs.has(name)
  }

  hasAttributeNS (ns = '', name) {
    const prefix = this.lookupPrefix(ns)
    if (name.includes(':') || !prefix) {
      return this.hasAttribute(name)
    }

    return this.hasAttribute([ ns, name ].join(':'))
  }

  getAttribute (name) {
    return this.hasAttribute(name) ? this.attrs.get(name) : null
  }

  getAttributeNS (ns = '', name) {
    const prefix = this.lookupPrefix(ns)
    if (name.includes(':') || !prefix) {
      return this.getAttribute(name)
    }

    return this.getAttribute([ prefix, name ].join(':'))
  }

  matches (query) {
    return this.matchWithScope(query, this)
  }

  getBoundingClientRect () {
    throw new Error('Only implemented for SVG Elements')
  }

}

Object.defineProperties(Element.prototype, {
  attributes: {
    get () {
      return mapToAttributeArray(this)
    }
  },
  className: {
    get () {
      return this.getAttribute('class')
    },
    set (c) {
      this.setAttribute('class', c)
    }
  },
  innerHTML: {
    get () {

      return this.childNodes.map(node => {
        if (node.nodeType === Node.TEXT_NODE) return htmlEntities(node.data)
        if (node.nodeType === Node.CDATA_SECTION_NODE) return cdata(node.data)
        if (node.nodeType === Node.COMMENT_NODE) return comment(node.data)
        return node.outerHTML
      }).join('')
    },
    set (str) {
      while (this.firstChild) {
        this.removeChild(this.firstChild)
      }
      // The parser adds the html to this
      HTMLParser(str, this)
    }
  },
  outerHTML: {
    get () {
      return tag(this)
    },
    set (str) {
      var well = new DocumentFragment()
      HTMLParser(str, well)
      this.parentNode.insertBefore(well, this)
      this.parentNode.removeChild(this)
    }
  },
  id: {
    get () {
      return this.getAttribute('id') || ''
    },
    set (id) {
      return this.setAttribute('id', id)
    }
  }
})

mixin(ParentNode, Element)
mixin(elementAccess, Element)
mixin(NonDocumentTypeChildNode, Element)
mixin(ChildNode, Element)
