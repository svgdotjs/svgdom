import { Node } from './Node.js'
import { html } from '../utils/namespaces.js'

export class Attr extends Node {
  constructor (name, props, ns) {
    super(name, { nodeValue: '', ...props }, ns)

    // Follow spec and lowercase nodeName for html
    this.nodeName = ns === html ? name.toLowerCase() : name
    this.nodeType = Node.ATTRIBUTE_NODE
    this.ownerElement = null
  }
}

Object.defineProperties(Attr.prototype, {
  value: {
    get () {
      return this.nodeValue
    },
    set (val) {
      this.nodeValue = val
    }
  },
  name: {
    get () {
      return this.nodeName
    }
  }
})
