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

const emptyElements = {
  br: true,
  hr: true,
  img: true,
  link: true
}

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
    emptyElements[name.toLowerCase()]

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

export const cloneNode = function (node) {
  const { prefix, localName, namespaceURI: ns, nodeValue, ownerDocument } = node

  // Build up the correctly cased qualified name
  const qualifiedName = (prefix ? prefix + ':' : '') + localName

  // Check if node was created using non-namespace function which can lead to : in the localName.
  // This check allows false negatives because `local` only matters IF there are : in the localName
  // and we dont care about it when there are non
  const local = localName.includes(':')

  const clone = new node.constructor(
    qualifiedName,
    {
      attrs: new Set([...node.attrs].map(node => node.cloneNode())),
      nodeValue,
      ownerDocument,
      local
    },
    ns
  )

  // Attr.cloneNode() cannot know its future owner; ownership is established
  // only after the containing element clone exists.
  for (const attr of clone.attrs) attr.ownerElement = clone

  return clone
}
