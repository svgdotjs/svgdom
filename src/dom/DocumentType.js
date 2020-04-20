import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { ChildNode } from './mixins/ChildNode.js'

export class DocumentType extends Node {
  constructor (name, props) {
    super(name, props)

    this.nodeType = Node.DOCUMENT_TYPE_NODE
    this.name = name

    const { publicId, systemId } = props
    this.publicId = publicId || ''
    this.systemId = systemId || ''
  }
}

mixin(ChildNode, DocumentType)
