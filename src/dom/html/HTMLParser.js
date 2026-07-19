import sax from 'sax'
import { namespaceDeclarationPrefix } from '../../utils/namespaces.js'

const escapeAttribute = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

// SAX parses fragments inside a synthetic wrapper and cannot see the real DOM
// ancestors. Reconstruct their in-scope bindings so inherited prefixes and the
// inherited default namespace remain valid while parsing the fragment.
const namespaceBindings = el => {
  const bindings = new Map()
  const elements = []

  for (
    let node = el;
    node && node.nodeType === node.ELEMENT_NODE;
    node = node.parentNode
  ) {
    elements.unshift(node)
  }

  for (const element of elements) {
    for (const attr of element.attrs) {
      const prefix = namespaceDeclarationPrefix(attr)
      if (prefix !== undefined) bindings.set(prefix, attr.value || null)
    }

    // Element namespace data wins over an inconsistent declaration. This is
    // the same correction the serializer makes when producing valid markup.
    if (element.namespaceURI !== null) {
      bindings.set(element.prefix, element.namespaceURI)
    } else if (element.prefix === null) {
      bindings.set(null, null)
    }
  }

  return bindings
}

// TODO: Its an XMLParser not HTMLParser!!
export const HTMLParser = function (str, el) {
  let currentTag = el
  let document = el.ownerDocument
  let cdata = null
  let wrapperName = null
  let depth = 0

  // sax expects a root element but we also missuse it to parse fragments
  if (el.nodeType !== el.DOCUMENT_NODE) {
    const bindings = namespaceBindings(el)
    let wrapperPrefix = 'svgdom'
    // Do not steal a prefix that is meaningful in the real scope or appears in
    // the fragment. Otherwise an unbound user prefix would accidentally resolve
    // to the wrapper's private namespace.
    while (bindings.has(wrapperPrefix) || str.includes(wrapperPrefix + ':'))
      wrapperPrefix += 'wrapper'

    const declarations = [...bindings]
      .filter(([prefix, uri]) => uri !== null && prefix !== 'xml')
      .map(
        ([prefix, uri]) =>
          `xmlns${prefix === null ? '' : ':' + prefix}="${escapeAttribute(uri)}"`
      )
    declarations.push(`xmlns:${wrapperPrefix}="svgdom:rocks"`)

    wrapperName = `${wrapperPrefix}:wrapper`
    // Declaring namespaces on the wrapper lets SAX resolve them before our
    // opentag callback creates the corresponding DOM nodes.
    str =
      '<' +
      [wrapperName].concat(declarations).join(' ') +
      '>' +
      str +
      '</' +
      wrapperName +
      '>'
  } else {
    document = el
  }

  const parser = sax.parser(true, {
    // lowercase: true,
    xmlns: true,
    strictEntities: true
  })

  parser.onerror = e => {
    throw e
  }

  parser.ondoctype = declaration => {
    if (currentTag !== document) {
      throw new Error('Doctype can only be appended to document')
    }
    const name = declaration.trim().match(/^\S+/)?.[0]
    currentTag.appendChild(document.implementation.createDocumentType(name))
  }

  parser.ontext = str => currentTag.appendChild(document.createTextNode(str))
  parser.oncomment = str => currentTag.appendChild(document.createComment(str))

  parser.onopentag = node => {
    // Only the first SAX element is synthetic. A user element with the same
    // qualified name at a deeper level is ordinary fragment content.
    const isWrapper = wrapperName !== null && depth === 0
    depth++
    if (isWrapper) return

    const attrs = node.attributes

    // The wrapper exposes every inherited binding to SAX, so its URI is
    // authoritative. In particular, an empty URI preserves `xmlns=""` instead
    // of accidentally falling back to the host element's default namespace.
    const newElement = document.createElementNS(node.uri, node.name)

    for (const [name, node] of Object.entries(attrs)) {
      newElement.setAttributeNS(node.uri, name, node.value)
    }

    currentTag.appendChild(newElement)
    currentTag = newElement
  }

  parser.onclosetag = () => {
    depth--
    if (wrapperName !== null && depth === 0) return

    currentTag = currentTag.parentNode
  }

  parser.onopencdata = () => {
    cdata = document.createCDATASection('')
  }

  parser.oncdata = str => {
    cdata.appendData(str)
  }

  parser.onclosecdata = () => {
    currentTag.appendChild(cdata)
  }

  parser.write(str)
}
