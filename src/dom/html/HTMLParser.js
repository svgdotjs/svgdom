import sax from 'sax'

// TODO: Make it recognize the correct namespace
export const HTMLParser = function (str, el) {
  let currentTag = el
  // const namespaces = { xmlns: el.getAttribute('xmlns') }
  const document = el.ownerDocument

  const parser = sax.parser(false, {
    lowercase: true,
    xmlns: true,
    strictEntities: true
  })

  parser.ontext = t => currentTag.appendChild(document.createTextNode(t))
  // parser.onopennamespace = ns => {
  //   namespaces[ns.prefix] = ns.uri
  // }
  // parser.onclosenamespace = ns => {
  //   delete namespaces[ns.prefix]
  // }

  parser.onopentag = node => {

    const attrs = node.attributes

    const uri = node.uri || currentTag.lookupNamespaceURI(node.prefix || null)

    var newElement = document.createElementNS(uri, node.name)

    for (const [ name, node ] of Object.entries(attrs)) {
      newElement.setAttributeNS(node.uri, name, node.value)
    }

    currentTag.appendChild(newElement)
    currentTag = newElement
  }

  parser.onclosetag = node => {
    currentTag = currentTag.parentNode
  }

  parser.write(str)
}
