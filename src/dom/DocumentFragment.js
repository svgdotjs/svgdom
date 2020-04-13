import { Node } from './Node.js'
export class DocumentFragment extends Node {
  constructor () {
    super('#document-fragment')
    this.nodeType = Node.DOCUMENT_FRAGMENT_NODE
  }
}
