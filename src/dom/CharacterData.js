import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'

export class CharacterData extends Node {
  constructor(name, props) {
    super(name, props)
  }

  appendData(data) {
    this.data += String(data)
  }

  deleteData(offset, count) {
    ;[offset, count] = this._validateRange(offset, count)
    this.data = this.data.slice(0, offset) + this.data.slice(offset + count)
  }

  insertData(offset, data) {
    ;[offset] = this._validateRange(offset, 0)
    this.data =
      this.data.slice(0, offset) + String(data) + this.data.slice(offset)
  }

  replaceData(offset, count, data) {
    ;[offset, count] = this._validateRange(offset, count)
    this.data =
      this.data.slice(0, offset) +
      String(data) +
      this.data.slice(offset + count)
  }

  substringData(offset, count) {
    ;[offset, count] = this._validateRange(offset, count)
    return this.data.slice(offset, offset + count)
  }

  _validateRange(offset, count) {
    // Offsets outside the data are errors; an otherwise valid count is clamped
    // to the remaining data so every mutator can use ordinary slice operations.
    offset = Math.trunc(Number(offset))
    count = Math.trunc(Number(count))
    if (
      !Number.isFinite(offset) ||
      !Number.isFinite(count) ||
      offset < 0 ||
      count < 0 ||
      offset > this.length
    ) {
      throw new Error('Index Size Error')
    }
    return [offset, Math.min(count, this.length - offset)]
  }

  get length() {
    return this.data.length
  }

  get data() {
    return this._data
  }

  // data and nodeValue are two views of the same backing value. Keeping the
  // conversion here prevents the aliases from drifting after direct writes.
  set data(value) {
    this._data = String(value)
  }

  get nodeValue() {
    return this._data
  }

  set nodeValue(value) {
    this._data = String(value)
  }
}

mixin(NonDocumentTypeChildNode, CharacterData)
mixin(ChildNode, CharacterData)
