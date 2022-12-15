import { CharacterData } from './CharacterData.js'
import { Node } from './Node.js'

export class Text extends CharacterData {
  constructor (name, props) {
    super(name, props)
    this.nodeType = Node.TEXT_NODE
  }
}
