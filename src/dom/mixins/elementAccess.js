import { NodeFilter } from '../NodeFilter.js'
import { NodeIterator } from '../../utils/NodeIterator.js'
import { normalizeNamespace } from '../../utils/namespaces.js'

const hasClass = (node, name) => {
  const classList = node.className.split(/\s+/)
  return classList.includes(name)
}

const elementAccess = {
  getElementsByTagName (name) {
    name = String(name)
    // const document = this.ownerDocument
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, (node) => name === '*' || node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE, false)
    // const iter = document.createNodeIterator(this, 1, (node) => node.nodeName === name ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE)
    return [ ...iter ]
  },

  getElementsByTagNameNS (ns, name) {
    // Empty namespace and wildcard namespace are distinct inputs.
    ns = ns === '*' ? '*' : normalizeNamespace(ns)
    name = String(name)

    // const document = this.ownerDocument
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, (node) => {
      const namespaceMatches = ns === '*' || node.namespaceURI === ns
      const localNameMatches = name === '*' || node.localName === name
      return namespaceMatches && localNameMatches ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE
    }, false)
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
