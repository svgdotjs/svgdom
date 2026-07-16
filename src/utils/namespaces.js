export const svg = 'http://www.w3.org/2000/svg'
export const xlink = 'http://www.w3.org/1999/xlink'
export const html = 'http://www.w3.org/1999/xhtml'
export const mathml = 'http://www.w3.org/1998/Math/MathML'
export const xml = 'http://www.w3.org/XML/1998/namespace'
export const xmlns = 'http://www.w3.org/2000/xmlns/'

// XML names may contain colons, while each half of a qualified name may not.
// These are the complete XML 1.0 (Fifth Edition) NameStartChar and NameChar
// ranges; keeping both checks also distinguishes malformed names from invalid
// namespace/prefix combinations.
/* eslint-disable no-misleading-character-class -- XML specifies these exact Unicode ranges. */
const namePattern =
  /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][-.:A-Z_a-z0-9\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0300-\u036F\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]*$/u
const ncNamePattern =
  /^[A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}][-.A-Z_a-z0-9\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0300-\u036F\u0370-\u037D\u037F-\u1FFF\u200C\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u{10000}-\u{EFFFF}]*$/u
/* eslint-enable no-misleading-character-class */

// DOM namespace APIs treat the empty string as no namespace.
export const normalizeNamespace = namespace => {
  if (namespace == null) return null
  namespace = String(namespace)
  return namespace === '' ? null : namespace
}

// Return null for the default declaration, a string for a prefixed declaration,
// and undefined when the attribute is not a namespace declaration.
export const namespaceDeclarationPrefix = attr => {
  if (attr.namespaceURI !== xmlns) return undefined
  if (attr.prefix === null && attr.localName === 'xmlns') return null
  if (attr.prefix === 'xmlns') return attr.localName
  return undefined
}

// Namespace declarations have additional reserved-prefix constraints beyond
// the namespace/qualified-name checks performed by validateAndExtract().
export const isValidNamespaceDeclaration = (prefix, namespaceURI) => {
  namespaceURI = String(namespaceURI)

  if (prefix === 'xmlns' || namespaceURI === xmlns) return false
  if (prefix === 'xml') return namespaceURI === xml
  if (namespaceURI === xml) return false
  return prefix === null || namespaceURI !== ''
}

export const validateName = name => {
  name = String(name)

  if (!namePattern.test(name)) {
    throw new Error('Invalid Character Error')
  }

  return name
}

export const validateAndExtract = (namespace, qualifiedName) => {
  namespace = normalizeNamespace(namespace)
  qualifiedName = validateName(qualifiedName)

  const parts = qualifiedName.split(':')
  if (parts.length > 2 || parts.some(part => !ncNamePattern.test(part))) {
    throw new Error('Namespace Error')
  }

  const prefix = parts.length === 2 ? parts[0] : null
  const localName = parts[parts.length - 1]

  // A prefix only has meaning when it is bound to a namespace URI.
  if (prefix && namespace === null) {
    throw new Error('Namespace Error')
  }

  if (prefix === 'xml' && namespace !== xml) {
    throw new Error('Namespace Error')
  }

  if (
    (prefix === 'xmlns' || qualifiedName === 'xmlns') &&
    namespace !== xmlns
  ) {
    throw new Error('Namespace Error')
  }

  if (namespace === xmlns && prefix !== 'xmlns' && qualifiedName !== 'xmlns') {
    throw new Error('Namespace Error')
  }

  return [namespace, prefix, localName]
}
