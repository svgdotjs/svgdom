import { CssQuery } from '../../other/CssQuery.js'

// https://developer.mozilla.org/en-US/docs/Web/API/ParentNode
const ParentNode = {
  matchWithScope (query, scope) {
    return new CssQuery(query).matches(this, scope)
  },

  query (query, scope, single = false) {
    var ret = []
    for (var i = 0, il = this.childNodes.length; i < il; ++i) {
      var child = this.childNodes[i]
      if (child.matchWithScope(query, scope)) {
        ret.push(child)
        if (single) return ret
      }
      ret = ret.concat(child.query(query, scope))
    }
    return ret
  },

  querySelectorAll (query) {
    return this.query(query, this)
  },

  querySelector (query) {
    return this.query(query, this, true)[0] || null
  }
}

Object.defineProperties(ParentNode, {
  children: {
    get () {
      return this.childNodes.filter(function (node) { return node.nodeType === node.ELEMENT_NODE })
    }
  },
  firstElementChild: {
    get () {
      for (const node of this.childNodes) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  lastElementChild: {
    get () {
      for (const node of this.childNodes.slice().reverse()) {
        if (node && node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },
  childElementCount: {
    get () {
      return this.children().length
    }
  }
})

export { ParentNode }
