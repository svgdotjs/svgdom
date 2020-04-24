import { NodeFilter } from '../NodeFilter.js'
import { NodeIterator } from '../../utils/NodeIterator.js'

const hasClass = (node, name) => {
  const classList = node.className.split(/\s+/)
  return classList.includes(name)
}

const elementAccess = {
  getElementsByTagName (name) {
    // const document = this.ownerDocument
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, (node) => node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  },

  getElementsByTagNameNS (ns, name) {
    // const document = this.ownerDocument
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, (node) => node.isNamespace(ns) && node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => node.isNamespace(ns) && node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  },

  getElementsByClassName (name) {
    // const document = this.ownerDocument
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, (node) => hasClass(node, name) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => hasClass(node, name) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  }
}

export { elementAccess }
