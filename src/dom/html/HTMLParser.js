import sax from 'sax'
import { namespaceDeclarationPrefix } from '../../utils/namespaces.js'
import { validateDocumentChildren } from '../Node.js'

const escapeAttribute = value =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')

const quotedValue = String.raw`(?:"([^"]*)"|'([^']*)')`

// sax exposes the declaration as one string. Capture the external identifiers
// first, then retain the bracket contents separately as the internal subset.
const parseDoctype = declaration => {
  declaration = declaration.trim()
  const name = declaration.match(/^\S+/)?.[0]
  let publicId = ''
  let systemId = ''

  const publicMatch = declaration.match(
    new RegExp(`^\\S+\\s+PUBLIC\\s+${quotedValue}\\s+${quotedValue}`, 'i')
  )
  if (publicMatch) {
    publicId = publicMatch[1] ?? publicMatch[2]
    systemId = publicMatch[3] ?? publicMatch[4]
  } else {
    const systemMatch = declaration.match(
      new RegExp(`^\\S+\\s+SYSTEM\\s+${quotedValue}`, 'i')
    )
    if (systemMatch) systemId = systemMatch[1] ?? systemMatch[2]
  }

  const subset = declaration.match(/\[([\s\S]*)\]\s*$/)
  return { name, publicId, systemId, internalSubset: subset?.[1] ?? null }
}

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

const parse = function (str, el) {
  str = String(str)
  let document = el.ownerDocument
  let cdata = null
  let wrapperName = null
  let depth = 0
  const isDocument = el.nodeType === el.DOCUMENT_NODE
  // Build a detached candidate tree first. SAX errors and document hierarchy
  // failures therefore leave the destination exactly as it was before parsing.
  const staging = isDocument
    ? { childNodes: [] }
    : document.createDocumentFragment()
  let currentTag = staging
  const parents = []

  const appendNode = node => {
    // A plain staging list is used for documents because a DocumentFragment
    // cannot legally own a doctype; fragments can use normal tree operations.
    if (currentTag === staging && isDocument) {
      staging.childNodes.push(node)
    } else {
      currentTag.appendChild(node)
    }
  }

  // sax expects a root element but we also missuse it to parse fragments
  if (!isDocument) {
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
    if (!isDocument || currentTag !== staging) {
      throw new Error('Doctype can only be appended to document')
    }
    const { name, publicId, systemId, internalSubset } =
      parseDoctype(declaration)
    const doctype = document.implementation.createDocumentType(
      name,
      publicId,
      systemId
    )
    doctype.internalSubset = internalSubset
    appendNode(doctype)
  }

  parser.ontext = str => {
    if (isDocument && currentTag === staging && !str.trim()) return
    appendNode(document.createTextNode(str))
  }
  parser.oncomment = str => appendNode(document.createComment(str))

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

    appendNode(newElement)
    // SAX reports a stream of open/close events, so this stack reconstructs the
    // parent that receives subsequent text, comments, and child elements.
    parents.push(currentTag)
    currentTag = newElement
  }

  parser.onclosetag = () => {
    depth--
    if (wrapperName !== null && depth === 0) return

    currentTag = parents.pop()
  }

  parser.onopencdata = () => {
    cdata = document.createCDATASection('')
  }

  parser.oncdata = str => {
    cdata.appendData(str)
  }

  parser.onclosecdata = () => {
    appendNode(cdata)
  }

  parser.write(str).close()
  return staging
}

// This is intentionally a strict XML parser despite the historical public name.
export const parseFragment = (str, element) => parse(str, element)

export const HTMLParser = function (str, el) {
  const staging = parse(str, el)
  if (el.nodeType === el.DOCUMENT_NODE) {
    // Validate the combined old and new children before publishing any parsed
    // node; appendChild then supplies the normal ownership and parent links.
    validateDocumentChildren(el.childNodes.concat(staging.childNodes))
    for (const node of staging.childNodes) el.appendChild(node)
  } else {
    el.appendChild(staging)
  }
  return el
}
