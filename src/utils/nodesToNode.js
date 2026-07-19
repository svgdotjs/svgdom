import { Node } from '../dom/Node.js'

export const nodesToNodes = (nodes, document) =>
  nodes.map(node => {
    return node instanceof Node ? node : document.createTextNode(String(node))
  })

export const nodesToNode = (nodes, document) => {
  nodes = nodesToNodes(nodes, document)
  if (nodes.length === 1) {
    return nodes[0]
  }
  // A fragment gives the core insertion path one node while preserving order;
  // inserting it later moves its children and empties the fragment.
  const node = document.createDocumentFragment()
  nodes.forEach(node.appendChild, node)
  return node
}
