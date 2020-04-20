import { Node } from './Node.js'

export class CharacterData extends Node {
  constructor (name, props) {
    super(name, props)

    this.data = this.nodeValue
  }
}
