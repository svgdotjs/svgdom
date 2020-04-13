import { Node } from './Node.js'

export class CharacterData extends Node {
  constructor (name, props) {
    super(name, props)
    if (Object.getPrototypeOf(this) === CharacterData.prototype) {
      throw new Error('CharacterData cannot be created directly')
    }
  }
}
