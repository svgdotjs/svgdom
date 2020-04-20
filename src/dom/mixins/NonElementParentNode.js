import { NodeIterator } from '../NodeIterator.js'
import { NodeFilter } from '../NodeFilter.js'

// https://dom.spec.whatwg.org/#interface-nonelementparentnode
export const NonElementParentNode = {
  getElementById (id) {
    const iter = new NodeIterator(this, NodeFilter.SHOW_ELEMENT, { acceptNode: (node) => id === node.id ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_IGNORE })
    for (const node of iter) {
      return node
    }
    return null
  }
}
