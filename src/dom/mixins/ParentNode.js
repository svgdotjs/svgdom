import { CssQuery } from '../../other/CssQuery.js'
import { NodeIterator } from '../../utils/NodeIterator.js'
import { NodeFilter } from '../NodeFilter.js'
import { nodesToNode, nodesToNodes } from '../../utils/nodesToNode.js'
import { replaceAllChildren } from '../Node.js'

// https://dom.spec.whatwg.org/#parentnode
const runQuery = (root, selector, single = false) => {
  const cssQuery = new CssQuery(selector)
  const iter = new NodeIterator(
    root,
    NodeFilter.SHOW_ELEMENT,
    node =>
      cssQuery.matches(node, root)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_IGNORE,
    false
  )

  const nodes = []
  for (const node of iter) {
    nodes.push(node)
    if (single) break
  }

  return nodes
}

const ParentNode = {
  querySelectorAll(query) {
    return runQuery(this, query)
  },

  querySelector(query) {
    return runQuery(this, query, true)[0] || null
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
