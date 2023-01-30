export const nodesToNode = (nodes, document) => {
  nodes = nodes.map((node) => {
    if (typeof node === 'string') {
      return document.createTextNode(node)
    }
    return node
  })
  if (nodes.length === 1) { return nodes[0] }
  const node = document.createDocumentFragment()
  nodes.forEach(node.appendChild, node)
  return node
}
