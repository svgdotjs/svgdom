import {
  html,
  isValidNamespaceDeclaration,
  namespaceDeclarationPrefix,
  xml,
  xmlns
} from './namespaces.js'

const htmlEntities = function (str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
])

const qualifiedName = node =>
  (node.prefix ? node.prefix + ':' : '') + node.localName

// Reusing an existing prefix avoids generating unnecessary ns1/ns2 aliases.
const findPrefix = (bindings, namespaceURI) => {
  for (const [prefix, uri] of bindings) {
    if (prefix !== null && prefix !== 'xmlns' && uri === namespaceURI)
      return prefix
  }
  return null
}

const nextPrefix = bindings => {
  let index = 1
  while (bindings.has(`ns${index}`)) index++
  return `ns${index}`
}

// svgdom has no separate HTML parser mode. Treat a document in the HTML
// namespace as HTML, which keeps the distinction lightweight and predictable.
const usesHTMLSerialization = node => node.ownerDocument?.namespaceURI === html

const ensureXMLSerializableName = node => {
  // Namespace-unaware APIs may create a localName containing a colon. That is
  // a valid in-memory DOM state, but well-formed XML serialization must reject
  // it rather than treating the colon as namespace metadata after the fact.
  if (node.localName.includes(':')) throw new Error('Invalid State Error')
  if (
    node.nodeType === node.ATTRIBUTE_NODE &&
    node.namespaceURI === null &&
    node.localName === 'xmlns'
  ) {
    throw new Error('Invalid State Error')
  }
}

const serializeAttributes = (node, inheritedBindings) => {
  // Serialization mode belongs to the document. An XHTML element embedded in
  // an SVG/XML document still needs XML namespace declarations.
  if (usesHTMLSerialization(node)) {
    return {
      attrs: [...node.attrs].map(
        attr => qualifiedName(attr) + '="' + htmlEntities(attr.value) + '"'
      ),
      bindings: inheritedBindings
    }
  }

  // Each element gets its own scope. Mutating a copy prevents declarations on
  // one sibling from leaking into another sibling's serialization.
  const bindings = new Map(inheritedBindings)
  const declarations = new Map()
  const attrs = []

  ensureXMLSerializableName(node)
  if (node.namespaceURI === xmlns) throw new Error('Invalid State Error')

  for (const attr of node.attrs) {
    ensureXMLSerializableName(attr)
    const prefix = namespaceDeclarationPrefix(attr)
    if (prefix === undefined) continue

    const uri = String(attr.value)
    if (!isValidNamespaceDeclaration(prefix, uri))
      throw new Error('Namespace Error')
    declarations.set(prefix, uri)
    bindings.set(prefix, uri)
  }

  const elementPrefix = node.namespaceURI === xml ? 'xml' : node.prefix

  // Default namespaces apply to elements, including the empty declaration that
  // returns an element to no namespace.
  if (node.namespaceURI === xml) {
    // The XML namespace is implicitly and exclusively bound to `xml`.
    bindings.set('xml', xml)
  } else if (
    node.namespaceURI !== null &&
    bindings.get(node.prefix) !== node.namespaceURI
  ) {
    declarations.set(node.prefix, node.namespaceURI)
    bindings.set(node.prefix, node.namespaceURI)
  } else if (
    node.namespaceURI === null &&
    node.prefix === null &&
    bindings.get(null) != null
  ) {
    declarations.set(null, null)
    bindings.set(null, null)
  }

  const usedAttributePrefixes = new Map()

  for (const attr of node.attrs) {
    if (namespaceDeclarationPrefix(attr) !== undefined) continue

    // Accept arbitrary prefixes in the DOM, but the XML namespace has a fixed
    // implicit `xml` binding and cannot be serialized under another prefix.
    let prefix = attr.namespaceURI === xml ? 'xml' : attr.prefix
    if (attr.namespaceURI !== null) {
      // Default namespaces never apply to attributes. A namespaced attribute
      // without a prefix therefore needs a reusable or generated prefix.
      if (prefix === null) {
        prefix = findPrefix(bindings, attr.namespaceURI) || nextPrefix(bindings)
      } else if (
        bindings.get(prefix) !== attr.namespaceURI &&
        (prefix === elementPrefix || usedAttributePrefixes.has(prefix))
      ) {
        // Rebinding the element's prefix (or one already used by another
        // attribute) would change an earlier name, so allocate another prefix.
        prefix = findPrefix(bindings, attr.namespaceURI) || nextPrefix(bindings)
      }

      if (bindings.get(prefix) !== attr.namespaceURI) {
        declarations.set(prefix, attr.namespaceURI)
        bindings.set(prefix, attr.namespaceURI)
      }
      usedAttributePrefixes.set(prefix, attr.namespaceURI)
    }

    const name = (prefix ? prefix + ':' : '') + attr.localName
    attrs.push(name + '="' + htmlEntities(attr.value) + '"')
  }

  const declarationAttrs = [...declarations].map(([prefix, uri]) => {
    const name = prefix === null ? 'xmlns' : `xmlns:${prefix}`
    return name + '="' + htmlEntities(uri || '') + '"'
  })

  return {
    attrs: declarationAttrs.concat(attrs),
    bindings
  }
}

const serializeChildren = (node, bindings) =>
  node.childNodes
    .map(child => {
      if (child.nodeType === child.TEXT_NODE) return htmlEntities(child.data)
      if (child.nodeType === child.CDATA_SECTION_NODE) {
        if (child.data.includes(']]>')) throw new Error('Invalid State Error')
        return `<![CDATA[${child.data}]]>`
      }
      if (child.nodeType === child.COMMENT_NODE) return `<!--${child.data}-->`
      if (child.nodeType === child.ELEMENT_NODE)
        return serializeElement(child, bindings)
      return ''
    })
    .join('')

const serializeElement = (node, inheritedBindings) => {
  const { attrs, bindings } = serializeAttributes(node, inheritedBindings)
  const name =
    node.namespaceURI === xml ? `xml:${node.localName}` : qualifiedName(node)
  // Void-element behavior applies only to HTML elements in an HTML document.
  // XHTML inside SVG/XML, and foreign elements named <br>, must be closed.
  const isEmptyHTMLTag =
    usesHTMLSerialization(node) &&
    node.namespaceURI === html &&
    voidElements.has(node.localName.toLowerCase())

  return (
    '<' +
    [].concat(name, attrs).join(' ') +
    '>' +
    (isEmptyHTMLTag
      ? ''
      : serializeChildren(node, bindings) + '</' + name + '>')
  )
}

export const tag = function (node) {
  // outerHTML must stand on its own. Start without bindings from DOM ancestors;
  // recursive calls receive only declarations emitted inside this output.
  return serializeElement(node, new Map([['xml', xml]]))
}

const cloneShallow = (node, document) => {
  switch (node.nodeType) {
    case node.DOCUMENT_NODE:
      return new node.constructor(node.namespaceURI)
    case node.DOCUMENT_TYPE_NODE:
      return new node.constructor(node.name, {
        publicId: node.publicId,
        systemId: node.systemId,
        internalSubset: node.internalSubset,
        ownerDocument: document
      })
    case node.DOCUMENT_FRAGMENT_NODE:
      return document.createDocumentFragment()
    case node.ELEMENT_NODE:
      // Namespace-unaware factories keep a colon in localName; routing such a
      // name through the namespace-aware path would reinterpret it as a prefix.
      return node.prefix === null && node.localName.includes(':')
        ? document.createElementNS(node.namespaceURI, node.localName, true)
        : document.createElementNS(node.namespaceURI, qualifiedName(node))
    case node.ATTRIBUTE_NODE:
      return node.prefix === null && node.localName.includes(':')
        ? document.createAttributeNS(node.namespaceURI, node.localName, true)
        : document.createAttributeNS(node.namespaceURI, qualifiedName(node))
    case node.TEXT_NODE:
      return document.createTextNode(node.data)
    case node.CDATA_SECTION_NODE:
      return document.createCDATASection(node.data)
    case node.COMMENT_NODE:
      return document.createComment(node.data)
    default:
      return new node.constructor(
        qualifiedName(node),
        { nodeValue: node.nodeValue, ownerDocument: document },
        node.namespaceURI
      )
  }
}

export const cloneNode = function (node, deep = false, document) {
  const isDocument = node.nodeType === node.DOCUMENT_NODE
  // A cloned Document owns its cloned descendants. Other clones retain their
  // source document unless an internal recursive/import target is supplied.
  const targetDocument = isDocument
    ? null
    : document === undefined
      ? node.ownerDocument
      : document
  const clone = cloneShallow(node, targetDocument)
  const childDocument = isDocument ? clone : targetDocument

  if (node.nodeType === node.ATTRIBUTE_NODE) {
    clone.value = node.value
  }

  if (node.nodeType === node.ELEMENT_NODE) {
    for (const attr of node.attrs) {
      clone.setAttributeNodeNS(cloneNode(attr, false, childDocument))
    }
  }

  if (deep) {
    for (const child of node.childNodes) {
      clone.appendChild(cloneNode(child, true, childDocument))
    }
  }

  return clone
}
