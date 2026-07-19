export const nodesToNodes = (nodes, document) =>
  nodes.map(node => {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    return node
  })

export const nodesToNode = (nodes, document) => {
  nodes = nodesToNodes(nodes, document)
  if (nodes.length === 1) {
    return nodes[0]
  }
  const node = document.createDocumentFragment()
  nodes.forEach(node.appendChild, node)
  return node
}
