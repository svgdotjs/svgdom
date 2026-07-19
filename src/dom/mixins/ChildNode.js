import { nodesToNode } from '../../utils/nodesToNode.js'

// https://dom.spec.whatwg.org/#interface-childnode
// Siblings also present in `nodes` are not viable anchors: nodesToNode moves
// them into a fragment before insertion, so the reference must skip past them.
export const ChildNode = {
  before(...nodes) {
    if (!this.parentNode) return
    const parent = this.parentNode
    let previous = this.previousSibling
    while (previous && nodes.includes(previous))
      previous = previous.previousSibling
    const node = nodesToNode(nodes, this.ownerDocument)
    const reference = previous ? previous.nextSibling : parent.firstChild
    parent.insertBefore(node, reference)
  },
  after(...nodes) {
    if (!this.parentNode) return
    const parent = this.parentNode
    let next = this.nextSibling
    while (next && nodes.includes(next)) next = next.nextSibling
    const node = nodesToNode(nodes, this.ownerDocument)
    parent.insertBefore(node, next)
  },
  replaceWith(...nodes) {
    if (!this.parentNode) return
    const parent = this.parentNode
    let next = this.nextSibling
    while (next && nodes.includes(next)) next = next.nextSibling
    const node = nodesToNode(nodes, this.ownerDocument)
    // Argument conversion may have moved `this` into the fragment. Replace it
    // only if it still belongs to the original parent; otherwise use the saved
    // viable sibling to insert the converted nodes at the same logical place.
    if (this.parentNode === parent) {
      parent.replaceChild(node, this)
    } else {
      parent.insertBefore(node, next)
    }
  },
  remove() {
    if (!this.parentNode) return
    this.parentNode.removeChild(this)
  }
}
