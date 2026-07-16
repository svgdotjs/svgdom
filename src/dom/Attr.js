import { Node } from './Node.js'
export class Attr extends Node {
  constructor (name, props, ns) {
    super(name, { nodeValue: '', ...props }, ns)

    // createAttribute() performs HTML lowercasing before construction;
    // createAttributeNS() must preserve the supplied qualified name.
    this.nodeName = name
    this.nodeType = Node.ATTRIBUTE_NODE
    this.ownerElement = null
  }

  get nodeValue () {
    return this._nodeValue
  }

  set nodeValue (val) {
    this._nodeValue = String(val)
  }

  get value () {
    return this.nodeValue
  }

  set value (val) {
    this.nodeValue = val
  }

  get name () {
    return this.nodeName
  }
}
