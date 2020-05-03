import { CharacterData } from './CharacterData.js'
import { Node } from './Node.js'
export class Comment extends CharacterData {
  constructor (name, props) {
    super(name, props)
    this.nodeType = Node.COMMENT_NODE
  }
}
