const {invent} = require('../utils/objectCreationUtils')
const Node = require('./Node')

var TextNode = invent({
  name: 'TextNode',
  create: function(name, props) {
    Node.call(this, name, props)
    this.nodeType = 3
  },
  inherit: Node
})

module.export = TextNode