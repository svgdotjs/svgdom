import { Text } from './Text.js'
import { Node } from './Node.js'

export class CDATASection extends Text {
  constructor (name, props) {
    super(name, props)

    this.nodeType = Node.CDATA_SECTION_NODE
  }
}
