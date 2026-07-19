import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { ChildNode } from './mixins/ChildNode.js'

export class DocumentType extends Node {
  constructor(name, props = {}) {
    super(name, props)

    this.nodeType = Node.DOCUMENT_TYPE_NODE
    this.name = name

    const { publicId, systemId } = props
    this.publicId = String(publicId ?? '')
    this.systemId = String(systemId ?? '')
    this.internalSubset = props.internalSubset ?? null
  }
}

mixin(ChildNode, DocumentType)
