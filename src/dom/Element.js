import { Node } from './Node.js'

import { ParentNode } from './interfaces/ParentNode.js'
import { elementAccess } from './interfaces/elementAccess.js'
import { HTMLParser } from './HTMLParser.js'
import { DocumentFragment } from './DocumentFragment.js'
import { mixInterface } from '../utils/objectCreationUtils.js'
import { tag } from '../utils/tagUtils.js'
import { cssToMap, mapToCss, mapMap } from '../utils/mapUtils.js'
import { hexToRGB, decamelize, htmlEntities } from '../utils/strUtils.js'
import { AttributeNode } from './AttributeNode.js'

// This Proxy proxies all access to node.style to the css saved in the attribute
const getStyleProxy = (node) => {

  return new Proxy(node, {
    get (target, key) {
      const styles = target.getAttribute('style')
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
        const styles = target.getAttribute('style')
        const styleMap = cssToMap(styles)
        styleMap.set(key, value)

        target.setAttribute('style', mapToCss(styleMap))

        return true
      }
    }
  })
}

export const mapToAttributeArray = function (themap) {
  return mapMap(themap, function (value, key) {
    return new AttributeNode(key, value)
  })
}

export class Element extends Node {
  constructor (name, props) {
    super(name, props)

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
    this.removeAttribute([ ns, name ].join(':'))
  }

  hasAttribute (name) {
    return this.attrs.has(name) != null
  }

  hasAttributeNS (ns = '', name) {
    return this.hasAttribute([ ns, name ].join(':'))
  }

  getAttribute (name) {
    return this.hasAttribute(name) ? this.attrs.get(name) : null
  }

  getAttributeNS (ns = '', name) {
    return this.getAttribute([ ns, name ].join(':'))
  }

  matches (query) {
    return this.matchWithScope(query, this)
  }

}
/* mix methods of the ParentNode interface into Element */
mixInterface(ParentNode, Element)
mixInterface(elementAccess, Element)

Object.defineProperties(Node.prototype, {
  attributes: {
    get () {
      return mapToAttributeArray(this.attrs)
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
      if (this.nodeType === Node.TEXT_NODE) return htmlEntities(this.data)
      return this.childNodes.reduce(function (last, current) {
        return last + current.outerHTML
      }, '')
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
      if (this.nodeType === Node.TEXT_NODE) return this.data
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
      return this.getAttribute('id')
    },
    set (id) {
      return this.setAttribute('id', id)
    }
  }
})
