import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'

export class CharacterData extends Node {
  constructor (name, props) {
    super(name, props)

    this.data = this.nodeValue
  }

  appendData (data) {
    this.data += data
  }

  substringData (offset, count) {
    this.data = this.data.substr(offset, count)
  }

  insertData (offset, data) {
    this.data = this.data.slice(0, offset) + data + this.data.slice(offset)
  }

  deleteData (offset, count) {
    this.data = this.data.slice(0, offset) + this.data.slice(0, offset + count)
  }

  replaceData (offset, count, data) {
    this.deleteData(offset, count)
    this.insertData(offset, data)
  }
}

Object.defineProperty(CharacterData, 'length', {
  get () {
    return this.data.length
  }
})

mixin(NonDocumentTypeChildNode, CharacterData)
mixin(ChildNode, CharacterData)
