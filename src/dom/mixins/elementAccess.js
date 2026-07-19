import { NodeFilter } from '../NodeFilter.js'
import { NodeIterator } from '../../utils/NodeIterator.js'
import { normalizeNamespace } from '../../utils/namespaces.js'

const hasClass = (node, name) => {
  const requested = String(name).trim().split(/\s+/).filter(Boolean)
  if (!requested.length) return false
  const classList = (node.className || '').split(/\s+/).filter(Boolean)
  return requested.every(className => classList.includes(className))
}

const elementAccess = {
  getElementsByTagName(name) {
    name = String(name)
    const iter = new NodeIterator(
      this,
      NodeFilter.SHOW_ELEMENT,
      node =>
        name === '*' || node.nodeName === name
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_IGNORE,
      false
    )
    return [...iter]
  },

  getElementsByTagNameNS(ns, name) {
    // Empty namespace and wildcard namespace are distinct inputs.
    ns = ns === '*' ? '*' : normalizeNamespace(ns)
    name = String(name)

    const iter = new NodeIterator(
      this,
      NodeFilter.SHOW_ELEMENT,
      node => {
        const namespaceMatches = ns === '*' || node.namespaceURI === ns
        const localNameMatches = name === '*' || node.localName === name
        return namespaceMatches && localNameMatches
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_IGNORE
      },
      false
    )
    return [...iter]
  },

  getElementsByClassName(name) {
    const iter = new NodeIterator(
      this,
      NodeFilter.SHOW_ELEMENT,
      node =>
        hasClass(node, name)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_IGNORE,
      false
    )
    return [...iter]
  }
}

export { elementAccess }
