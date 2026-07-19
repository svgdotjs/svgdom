import { CssQuery } from '../../other/CssQuery.js'
import { NodeIterator } from '../../utils/NodeIterator.js'
import { NodeFilter } from '../NodeFilter.js'
import { nodesToNode, nodesToNodes } from '../../utils/nodesToNode.js'
import { replaceAllChildren } from '../Node.js'

// https://dom.spec.whatwg.org/#parentnode
const ParentNode = {
  matchWithScope(query, scope) {
    return new CssQuery(query).matches(this, scope)
  },

  query(query, scope, single = false) {
    const iter = new NodeIterator(
      scope,
      NodeFilter.SHOW_ELEMENT,
      node =>
        node.matchWithScope(query, scope)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_IGNORE,
      false
    )

    const nodes = []
    for (const node of iter) {
      nodes.push(node)
      if (single) return nodes
    }

    return nodes
  },

  querySelectorAll(query) {
    return this.query(query, this)
  },

  querySelector(query) {
    return this.query(query, this, true)[0] || null
  },

  closest(query) {
    const cssQuery = new CssQuery(query)
    let node = this
    while (node) {
      if (cssQuery.matches(node, this)) {
        return node
      }
      node = node.parentNode
    }
    return null
  },

  prepend(...nodes) {
    const document =
      this.nodeType === this.DOCUMENT_NODE ? this : this.ownerDocument
    const node = nodesToNode(nodes, document)

    this.insertBefore(node, this.firstChild)
  },

  append(...nodes) {
    const document =
      this.nodeType === this.DOCUMENT_NODE ? this : this.ownerDocument
    const node = nodesToNode(nodes, document)
    this.appendChild(node)
  },

  replaceChildren(...nodes) {
    const document =
      this.nodeType === this.DOCUMENT_NODE ? this : this.ownerDocument
    // Keep nodes separate for the mutation planner. Building a fragment here
    // would detach existing children before replacement validation succeeds.
    replaceAllChildren(this, nodesToNodes(nodes, document))
  }
}

Object.defineProperties(ParentNode, {
  children: {
    get() {
      return this.childNodes.filter(function (node) {
        return node.nodeType === node.ELEMENT_NODE
      })
    }
  },
  firstElementChild: {
    get() {
      for (const node of this.childNodes) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  lastElementChild: {
    get() {
      for (const node of this.childNodes.slice().reverse()) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  childElementCount: {
    get() {
      return this.children.length
    }
  }
})

export { ParentNode }
