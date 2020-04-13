import { Node } from './Node.js'

export class AttributeNode extends Node {
  constructor (name = '', value = null, ns) {
    super(name, {}, ns)
    this.nodeValue = value
    this.nodeType = Node.ATTRIBUTE_NODE
  }
}
