import { Node } from './Node.js'

export class Attr extends Node {
  constructor (name, ns) {
    super(name, { nodeValue: '' }, ns)
    this.value = this.nodeValue
    this.nodeType = Node.ATTRIBUTE_NODE
  }
}
