import { Node } from './Node.js'

export class Attr extends Node {
  constructor (name, ns) {
    super(name, {}, ns)
    this.value = ''
    this.nodeType = Node.ATTRIBUTE_NODE
  }
}
