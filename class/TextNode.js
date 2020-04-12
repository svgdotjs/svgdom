import Node from './Node.js'

export default class TextNode extends Node {
  constructor (name, props) {
    super(name, props)
    this.nodeType = Node.TEXT_NODE
  }
}
