import { Node } from './Node.js'

import { ParentNode } from './mixins/ParentNode.js'
import { elementAccess } from './mixins/elementAccess.js'
import { HTMLParser } from './html/HTMLParser.js'
import { DocumentFragment } from './DocumentFragment.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { tag } from '../utils/tagUtils.js'
import { cssToMap, mapToCss } from '../utils/mapUtils.js'
import { hexToRGB, decamelize, htmlEntities, cdata, comment } from '../utils/strUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'
import { html, xml, xmlns } from '../utils/namespaces.js'
import { Attr } from './Attr.js'

const validateAndExtract = (ns, name) => {
  let prefix = null
  let localname = name

  if (!ns) ns = null

  if (name.includes(':')) {
    [ prefix, localname ] = name.split(':')
  }

  if (!ns && prefix) {
    throw new Error('Namespace Error')
  }

  if (prefix === 'xml' && ns !== xml) {
    throw new Error('Namespace Error')
  }

  if ((prefix === 'xmlns' || name === 'xmlns') && ns !== xmlns) {
    throw new Error('Namespace Error')
  }

  if (prefix !== 'xmlns' && name !== 'xmlns' && ns === xmlns) {
    throw new Error('Namespace Error')
  }

  return [ ns, prefix, localname ]
}

const getAttributeByNsAndLocalName = (el, ns, localName) => {
  if (!ns) ns = null
  return [ ...el.attrs ].find((node) => node.localName === localName && node.namespaceURI === ns)
}

const getAttributeByQualifiedName = (el, qualifiedName) => {
  if (el.namespaceURI === html && el.ownerDocument.namespaceURI === html) {
    qualifiedName = qualifiedName.toLowerCase()
  }

  return [ ...el.attrs ].find((node) => node.name === qualifiedName)
}

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
          node.style[propertyName] = value + (priority ? ` !${priority}` : '')
        }
      }

      key = decamelize(key)
      if (!styleMap.has(key)) return ''

      return styleMap.get(key)
    },
    set (target, key, value) {
      key = decamelize(key)

      if (key === 'css-text') {
        // ensure correct spacing and syntax by converting back and forth
        target.setAttribute('style', mapToCss(cssToMap(value)))
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

/* export const mapToAttributeArray = function (element) {
  const { attrs, ownerDocument, namespaceURI } = element
  return mapMap(attrs, function (value, key) {
    const attr = ownerDocument.createAttributeNS(namespaceURI, key)
    attr.value = attr.nodeValue = value
    attr.ownerElement = element
    return attr
  })
} */

export class Element extends Node {
  constructor (name, props, ns) {
    super(name, props, ns)

    this.style = getStyleProxy(this)
    this.tagName = this.nodeName
  }

  /* The setAttribute(qualifiedName, value) method, when invoked, must run these steps:

    If qualifiedName does not match the Name production in XML, then throw an "InvalidCharacterError" DOMException.

    If this is in the HTML namespace and its node document is an HTML document, then set qualifiedName to qualifiedName in ASCII lowercase.

    Let attribute be the first attribute in this’s attribute list whose qualified name is qualifiedName, and null otherwise.

    If attribute is null, create an attribute whose local name is qualifiedName, value is value, and node document is this’s node document, then append this attribute to this, and then return.

    Change attribute to value.
  */
  setAttribute (qualifiedName, value) {
    // We have to do that here because we cannot check if `this` is in the correct namespace
    // when doing it in createAttribute
    if (this.namespaceURI === html && this.ownerDocument.namespaceURI === html) {
      qualifiedName = qualifiedName.toLowerCase()
    }

    let attr = this.getAttributeNode(qualifiedName)
    if (!attr) {
      // attr = this.ownerDocument.createAttribute(qualifiedName)
      // Because createAttribute has quirks (see there), we have to create an Attr directly here
      attr = new Attr(qualifiedName, { ownerDocument: this, local: true }, null)
      this.setAttributeNode(attr)
    }

    attr.value = value
  }

  /*
    Let namespace, prefix, and localName be the result of passing namespace and qualifiedName to validate and extract.

    Set an attribute value for this using localName, value, and also prefix and namespace.

    If prefix is not given, set it to null.
    If namespace is not given, set it to null.
    Let attribute be the result of getting an attribute given namespace, localName, and element.
    If attribute is null, create an attribute whose namespace is namespace, namespace prefix is prefix, local name is localName, value is value, and node document is element’s node document, then append this attribute to element, and then return.

    Change attribute to value.
  */

  // call is: d.setAttributeNS('http://www.mozilla.org/ns/specialspace', 'spec:align', 'center');
  setAttributeNS (namespace, name, value) {

    // eslint-disable-next-line
    const [ ns, prefix, localName ] = validateAndExtract(namespace, name)

    let attr = this.getAttributeNodeNS(ns, localName)
    if (!attr) {
      attr = this.ownerDocument.createAttributeNS(ns, name)
      this.setAttributeNode(attr) // setAttributeNodeNS is a synonym of setAttributeNode
    }

    attr.value = value

    this.attrs.add(attr)
  }

  setAttributeNode (node) {
    this.attrs.add(node)
    node.ownerElement = this
  }

  removeAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  // call is: d.removeAttributeNS('http://www.mozilla.org/ns/specialspace', 'align', 'center');
  removeAttributeNS (ns, name) {
    const attr = this.getAttributeNode(ns, name)
    if (attr) {
      this.removeAttributeNode(attr)
    }
    return attr
  }

  removeAttributeNode (node) {
    if (!this.attrs.delete(node)) throw new Error('Attribute cannot be removed because it was not found on the element')
    return node
  }

  hasAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return !!attr
  }

  hasAttributeNS (ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return !!attr
  }

  getAttribute (qualifiedName) {
    const attr = this.getAttributeNode(qualifiedName)
    return attr ? attr.value : null
  }

  getAttributeNS (ns, localName) {
    const attr = this.getAttributeNodeNS(ns, localName)
    return attr ? attr.value : null
  }

  getAttributeNode (qualifiedName) {
    return getAttributeByQualifiedName(this, qualifiedName)
  }

  getAttributeNodeNS (ns, localName) {
    return getAttributeByNsAndLocalName(this, ns, localName)
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
      return [ ...this.attrs ]
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
