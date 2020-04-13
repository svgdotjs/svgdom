const hasClass = (node, name) => {
  const classList = node.className.split(/\s+/)
  return classList.contains(name)
}

const elementAccess = {
  getElementsByTagName (name) {
    const document = this.ownerDocument
    const iter = document.createNodeIterator(this, 1, (node) => node.nodeName === name)
    return [ ...iter ]
  },

  getElementsByTagNameNS (ns, name) {
    const document = this.ownerDocument
    const iter = document.createNodeIterator(this, 1, (node) => node.isNamespace(ns) && node.nodeName === name)
    return [ ...iter ]
  },

  getElementsByClassName (name) {
    const document = this.ownerDocument
    const iter = document.createNodeIterator(this, 1, (node) => hasClass(node, name))
    return [ ...iter ]
  }
}

export { elementAccess }
