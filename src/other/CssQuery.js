import { removeQuotes } from '../utils/strUtils.js'
import * as regex from '../utils/regex.js'
import { html } from '../utils/namespaces.js'

export class CssQuery {
  constructor (query) {
    if (CssQuery.cache.has(query)) {
      this.queries = CssQuery.cache.get(query)
      return
    }

    const queries = tokenizeSelector(query)

    this.queries = queries

    // to prevent memory leaks we have to manage our cache.
    // we delete everything which is older than 50 entries
    if (CssQuery.cacheKeys.length > 50) {
      CssQuery.cache.delete(CssQuery.cacheKeys.shift())
    }
    CssQuery.cache.set(query, queries)
    CssQuery.cacheKeys.push(query)

  }

  matches (node, scope) {
    for (let i = this.queries.length; i--;) {
      if (this.matchHelper(this.queries[i], node, scope)) {
        return true
      }
    }
    return false
  }

  matchHelper (query, node, scope) {
    query = query.slice()
    const last = query.pop()

    if (!new CssQueryNode(last[1]).matches(node, scope)) { return false }

    if (!query.length) return true

    if (last[0] === ',') return true

    if (last[0] === '+') {
      return !!node.previousSibling && this.matchHelper(query, node.previousSibling, scope)
    }

    if (last[0] === '>') {
      return !!node.parentNode && this.matchHelper(query, node.parentNode, scope)
    }

    if (last[0] === '~') {
      while ((node = node.previousSibling)) {
        if (this.matchHelper(query, node, scope)) { return true }
      }
      return false
    }

    if (last[0] === '%') {
      while ((node = node.parentNode)) {
        if (this.matchHelper(query, node, scope)) { return true }
      }
      return false
    }

  }
}

CssQuery.cache = new Map()
CssQuery.cacheKeys = []

const parseNth = value => {
  value = value.toLowerCase().replace(/[ \n\r\t\f]/g, '')

  if (value === 'even') return { a: 2, b: 0 }
  if (value === 'odd') return { a: 2, b: 1 }

  if (/^[+-]?\d+$/.test(value)) {
    return { a: 0, b: parseInt(value, 10) }
  }

  const formula = value.match(/^([+-]?\d*)n(?:([+-]\d+))?$/)
  if (!formula) return null

  let a = formula[1]
  if (a === '' || a === '+') a = 1
  else if (a === '-') a = -1
  else a = parseInt(a, 10)

  return { a, b: parseInt(formula[2] || '0', 10) }
}

// Check if node is the An+B-th item in arr for a non-negative integer n.
const nth = (node, arr, value) => {
  const formula = parseNth(value)
  const index = arr.indexOf(node) + 1
  if (!formula || !index) return false

  if (formula.a === 0) return index === formula.b

  const n = (index - formula.b) / formula.a
  return Number.isInteger(n) && n >= 0
}

const elementChildren = node => node
  ? node.childNodes.filter(child => child.nodeType === 1)
  : []

const elementSiblings = node => node.parentNode
  ? elementChildren(node.parentNode)
  : [ node ]

const sameType = (a, b) =>
  a.localName === b.localName && a.namespaceURI === b.namespaceURI

const siblingsOfType = node =>
  elementSiblings(node).filter(sibling => sameType(sibling, node))

const lower = a => a.toLowerCase()

// checks if a and b are equal. Is insensitive when i is true
const eq = (a, b, i) => i ? lower(a) === lower(b) : a === b

const escapeSequenceEnd = (string, index) => {
  let end = index + 1
  const hex = string.slice(end).match(/^[\da-f]{1,6}/i)

  if (!hex) return Math.min(end + 1, string.length)

  end += hex[0].length
  if (string[end] === '\r' && string[end + 1] === '\n') return end + 2
  if (/[ \n\r\t\f]/.test(string[end] || '')) end++
  return end
}

const tokenizeSelector = selector => {
  const queries = []
  let pairs = []
  let token = ''
  let relation = '%'
  let roundBrackets = 0
  let squareBrackets = 0
  let quote = ''

  const pushToken = () => {
    if (!token) return
    pairs.push([ relation, token ])
    token = ''
    relation = '%'
  }

  for (let index = 0; index < selector.length; index++) {
    const character = selector[index]

    if (character === '\\') {
      const end = escapeSequenceEnd(selector, index)
      token += selector.slice(index, end)
      index = end - 1
      continue
    }

    if (quote) {
      token += character
      if (character === quote) quote = ''
      continue
    }

    if (character === '"' || character === "'") {
      quote = character
      token += character
      continue
    }

    if (character === '(') roundBrackets++
    else if (character === ')') roundBrackets--
    else if (character === '[') squareBrackets++
    else if (character === ']') squareBrackets--

    if (roundBrackets || squareBrackets || '()[]'.includes(character)) {
      token += character
      continue
    }

    if (character === ',') {
      pushToken()
      queries.push(pairs)
      pairs = []
      relation = '%'
      continue
    }

    if (/[ \n\r\t\f]/.test(character)) {
      pushToken()
      continue
    }

    if ('>~+'.includes(character)) {
      pushToken()
      relation = character
      continue
    }

    token += character
  }

  pushToken()
  queries.push(pairs)
  return queries
}

const parseEscapedIdentifier = identifier => {
  let result = ''
  let index = 0

  for (; index < identifier.length; index++) {
    const character = identifier[index]

    if (character !== '\\') {
      if (!/[\w\-\u0080-\uFFFF]/.test(character)) break
      result += character
      continue
    }

    index++
    if (index === identifier.length || /[\n\r\f]/.test(identifier[index])) {
      return null
    }

    const hex = identifier.slice(index).match(/^[\da-f]{1,6}/i)
    if (!hex) {
      result += identifier[index]
      continue
    }

    const codePoint = parseInt(hex[0], 16)
    const invalidCodePoint = codePoint === 0
      || (codePoint >= 0xD800 && codePoint <= 0xDFFF)
      || codePoint > 0x10FFFF

    result += invalidCodePoint
      ? '\uFFFD'
      : String.fromCodePoint(codePoint)

    index += hex[0].length - 1
    if (identifier[index + 1] === '\r' && identifier[index + 2] === '\n') {
      index += 2
    } else if (/[ \n\r\t\f]/.test(identifier[index + 1] || '')) {
      index++
    }
  }

  if (!index) return null
  return { value: result, length: index }
}

const findIdSelector = selector => {
  let roundBrackets = 0
  let squareBrackets = 0
  let quote = ''

  for (let index = 0; index < selector.length; index++) {
    const character = selector[index]

    if (character === '\\') {
      index = escapeSequenceEnd(selector, index) - 1
      continue
    }

    if (quote) {
      if (character === quote) quote = ''
      continue
    }

    if (character === '"' || character === "'") {
      quote = character
      continue
    }

    if (character === '(') roundBrackets++
    else if (character === ')') roundBrackets--
    else if (character === '[') squareBrackets++
    else if (character === ']') squareBrackets--
    else if (character === '#' && !roundBrackets && !squareBrackets) {
      const id = parseEscapedIdentifier(selector.slice(index + 1))
      if (!id) return null
      return { value: id.value, index, length: id.length + 1 }
    }
  }

  return null
}

// [i] (prebound) is true if insensitive matching is required
// [a] (prebound) is the value the attr is compared to
// [b] (passed)   is the value of the attribute
const attributeMatcher = {
  '=': (i, a, b) => eq(a, b, i),
  '~=': (i, a, b) => b.split(regex.delimiter).filter(el => eq(el, a, i)).length > 0,
  '|=': (i, a, b) => eq(b.split(regex.delimiter)[0], a, i),
  '^=': (i, a, b) => i ? lower(b).startsWith(lower(a)) : b.startsWith(a),
  '$=': (i, a, b) => i ? lower(b).endsWith(lower(a)) : b.endsWith(a),
  '*=': (i, a, b) => i ? lower(b).includes(lower(a)) : b.includes(a),
  '*': (i, a, b) => b != null
}

const getAttributeValue = (prefix, name, node) => {
  if (!prefix || prefix === '*') {
    return node.getAttribute(name)
  }
  return node.getAttribute(prefix + ':' + name)
}

// [a] (prebound) [a]rgument of the pseudo selector
// [n] (passed)   [n]ode
// [s] (passed)   [s]cope - the element this query is scoped to
const pseudoMatcher = {
  'first-child': (a, n) => elementSiblings(n)[0] === n,
  'last-child': (a, n) => elementSiblings(n).pop() === n,
  'nth-child': (a, n) => nth(n, elementSiblings(n), a),
  'nth-last-child': (a, n) => nth(n, elementSiblings(n).reverse(), a),
  'first-of-type': (a, n) => siblingsOfType(n)[0] === n,
  'last-of-type': (a, n) => siblingsOfType(n).pop() === n,
  'nth-of-type': (a, n) => nth(n, siblingsOfType(n), a),
  'nth-last-of-type': (a, n) => nth(n, siblingsOfType(n).reverse(), a),
  'only-child': (a, n) => {
    const siblings = elementSiblings(n)
    return siblings.length === 1 && siblings[0] === n
  },
  'only-of-type': (a, n) => {
    const siblings = siblingsOfType(n)
    return siblings.length === 1 && siblings[0] === n
  },
  root: (a, n) => n.ownerDocument.documentElement === n,
  not: (a, n, s) => !(new CssQuery(a)).matches(n, s),
  matches: (a, n, s) => (new CssQuery(a)).matches(n, s),
  scope: (a, n, s) => n === s
}

export class CssQueryNode {
  constructor (node) {
    this.tag = ''
    this.id = ''
    this.classList = []
    this.attrs = []
    this.pseudo = []

    const id = findIdSelector(node)
    if (id) {
      this.id = id.value
      node = node.slice(0, id.index) + node.slice(id.index + id.length)
    }

    // match the tag name
    let matches = node.match(/^[\w-]+|^\*/)
    if (matches) {
      this.tag = matches[0]
      node = node.slice(this.tag.length)
    }

    // match pseudo classes
    while ((matches = /:([\w-]+)(?:\((.+)\))?/g.exec(node))) {
      this.pseudo.push(pseudoMatcher[matches[1]].bind(this, removeQuotes(matches[2] || '')))
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match attributes
    while ((matches = /\[([\w-*]+\|)?([\w-]+)(([=^~$|*]+)(.+?)( +[iI])?)?\]/g.exec(node))) {
      const prefix = matches[1] ? matches[1].split('|')[0] : null
      this.attrs.push({
        name: matches[2],
        getValue: getAttributeValue.bind(this, prefix, matches[2]),
        matcher: attributeMatcher[matches[4] || '*'].bind(
          this,
          !!matches[6], // case insensitive yes/no
          removeQuotes((matches[5] || '').trim()) // attribute value
        )
      })
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }

    // match classes
    while ((matches = /\.([\w-]+)/g.exec(node))) {
      this.classList.push(matches[1])
      node = node.slice(0, matches.index) + node.slice(matches.index + matches[0].length)
    }
  }

  matches (node, scope) {
    let i

    if (node.nodeType !== 1) return false

    // Always this extra code for html -.-
    if (node.namespaceURI === html) {
      this.tag = this.tag.toUpperCase()
    }

    if (this.tag && this.tag !== node.nodeName && this.tag !== '*') { return false }

    if (this.id && this.id !== node.id) {
      return false
    }

    const classList = (node.getAttribute('class') || '').split(regex.delimiter).filter(el => !!el.length)
    if (this.classList.filter(className => classList.indexOf(className) < 0).length) {
      return false
    }

    for (i = this.attrs.length; i--;) {
      const attrValue = this.attrs[i].getValue(node)
      if (attrValue === null || !this.attrs[i].matcher(attrValue)) {
        return false
      }
    }

    for (i = this.pseudo.length; i--;) {
      if (!this.pseudo[i](node, scope)) {
        return false
      }
    }

    return true
  }

}
