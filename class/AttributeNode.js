const {invent} = require('../utils/objectCreationUtils')
const Node = require('./Node.js')

const AttributeNode = invent({
  name: 'AttributeNode',
  create: function(name='', value=null) {
    Node.call(this, name)
    this.nodeValue = value
  },
  inherit: Node
})

modules.extend = AttributeNode