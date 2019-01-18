const Node = require('./Node')

class TextNode extends Node {
  constructor (name, props) {
    super(name, props)
    this.nodeType = Node.TEXT_NODE
  }
}

module.export = TextNode
