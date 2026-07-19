import * as regex from '../utils/regex.js'
import { html } from '../utils/namespaces.js'
import {
  InvalidSelectorError,
  parseCompoundSelector,
  parseSelector
} from './css/selectorParser.js'

// Compile once so invalid selectors fail even for empty search roots and each
// candidate can reuse the same attribute and pseudo-class matchers.
const compileQueries = queries =>
  queries.map(pairs =>
    pairs.map(([relation, compound]) => [relation, new CssQueryNode(compound)])
  )

export class CssQuery {
  constructor(query) {
    if (CssQuery.cache.has(query)) {
      this.queries = CssQuery.cache.get(query)
      CssQuery.cache.delete(query)
      CssQuery.cache.set(query, this.queries)
      return
    }

    const queries = compileQueries(parseSelector(query))

    this.queries = queries

    CssQuery.cache.set(query, queries)
    // Refresh-on-read above makes this a small LRU cache rather than an
    // unbounded selector history retained for the lifetime of the process.
    while (CssQuery.cache.size > 50) {
      CssQuery.cache.delete(CssQuery.cache.keys().next().value)
    }
  }

  matches(node, scope) {
    for (let i = this.queries.length; i--;) {
      if (this.matchHelper(this.queries[i], node, scope)) {
        return true
      }
    }
    return false
  }

  matchHelper(query, node, scope) {
    // Match right-to-left: verify the candidate compound first, then follow the
    // relation attached to it to find a candidate for the preceding compound.
    query = query.slice()
    const last = query.pop()

    if (!last[1].matches(node, scope)) {
      return false
    }

    if (!query.length) return true

    if (last[0] === ',') return true

    if (last[0] === '+') {
      node = node.previousElementSibling
      return !!node && this.matchHelper(query, node, scope)
    }

    if (last[0] === '>') {
      return (
        !!node.parentNode && this.matchHelper(query, node.parentNode, scope)
      )
    }

    if (last[0] === '~') {
      while ((node = node.previousSibling)) {
        if (this.matchHelper(query, node, scope)) {
          return true
        }
      }
      return false
    }

    if (last[0] === '%') {
      while ((node = node.parentNode)) {
        if (this.matchHelper(query, node, scope)) {
          return true
        }
      }
      return false
    }
  }
}

CssQuery.cache = new Map()

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

const elementChildren = node =>
  node ? node.childNodes.filter(child => child.nodeType === 1) : []

const elementSiblings = node =>
  node.parentNode ? elementChildren(node.parentNode) : [node]

const sameType = (a, b) =>
  a.localName === b.localName && a.namespaceURI === b.namespaceURI

const siblingsOfType = node =>
  elementSiblings(node).filter(sibling => sameType(sibling, node))

const parseNthArgument = value => {
  const match = value.match(/^([\s\S]*?)[ \n\r\t\f]+of[ \n\r\t\f]+([\s\S]+)$/i)
  return match
    ? { value: match[1], selector: match[2] }
    : { value, selector: null }
}

const nthChild = (argument, node, scope, fromEnd = false) => {
  const parsed = parseNthArgument(argument)
  let siblings = elementSiblings(node)

  if (parsed.selector) {
    const query = new CssQuery(parsed.selector)
    siblings = siblings.filter(sibling => query.matches(sibling, scope))
  }

  if (fromEnd) siblings.reverse()
  return nth(node, siblings, parsed.value)
}

const lower = a => a.toLowerCase()

// checks if a and b are equal. Is insensitive when i is true
const eq = (a, b, i) => (i ? lower(a) === lower(b) : a === b)

// [i] (prebound) is true if insensitive matching is required
// [a] (prebound) is the value the attr is compared to
// [b] (passed)   is the value of the attribute
const attributeMatcher = {
  '=': (i, a, b) => eq(a, b, i),
  '~=': (i, a, b) =>
    b.split(regex.delimiter).filter(el => eq(el, a, i)).length > 0,
  '|=': (i, a, b) => eq(a, b, i) || eq(a + '-', b.slice(0, a.length + 1), i),
  '^=': (i, a, b) => (i ? lower(b).startsWith(lower(a)) : b.startsWith(a)),
  '$=': (i, a, b) => (i ? lower(b).endsWith(lower(a)) : b.endsWith(a)),
  '*=': (i, a, b) => (i ? lower(b).includes(lower(a)) : b.includes(a)),
  '*': (i, a, b) => b != null
}

const getAttributeValues = (prefix, name, node) => {
  if (prefix === '*') {
    // A wildcard namespace can expose several attributes with the same local
    // name; the caller succeeds when any of their values matches.
    return [...node.attrs]
      .filter(attr => attr.localName === name)
      .map(attr => attr.value)
  }
  const attr = prefix
    ? node.getAttributeNode(prefix + ':' + name)
    : node.getAttributeNodeNS(null, name)
  return attr ? [attr.value] : []
}

const isEmpty = node =>
  !node.childNodes.some(child => {
    if (child.nodeType === 1) return true
    if (child.nodeType !== 3 && child.nodeType !== 4) return false
    return /[^ \n\r\t\f]/.test(child.data || '')
  })

const matchesRelativeSelector = (selector, node) => {
  let queries
  try {
    queries = parseSelector(selector, { relative: true })
  } catch (error) {
    if (!(error instanceof InvalidSelectorError)) throw error
    return false
  }

  const query = Object.create(CssQuery.prototype)
  const scope = parseCompoundSelector(':scope')
  // Prefixing :scope anchors leading combinators. Matching remains right-to-left,
  // so scan possible subjects from the root and retain the original node as scope.
  query.queries = compileQueries(queries.map(pairs => [['%', scope], ...pairs]))

  const nodes = [node.getRootNode()]
  while (nodes.length) {
    const candidate = nodes.pop()
    if (candidate.nodeType === 1 && query.matches(candidate, node)) return true
    nodes.push(...candidate.childNodes)
  }

  return false
}

const matchesForgivingSelectorList = (selector, node, scope) => {
  let matches = false

  for (const pairs of parseSelector(selector, { forgiving: true })) {
    try {
      // Forgiving lists discard branches that parse but fail during matcher
      // compilation, such as branches containing unsupported pseudo-classes.
      const query = Object.create(CssQuery.prototype)
      query.queries = compileQueries([pairs])
      if (query.matches(node, scope)) matches = true
    } catch (error) {
      if (!(error instanceof InvalidSelectorError)) throw error
    }
  }

  return matches
}

// [a] (prebound) [a]rgument of the pseudo selector
// [n] (passed)   [n]ode
// [s] (passed)   [s]cope - the element this query is scoped to
const pseudoMatcher = {
  'first-child': (a, n) => elementSiblings(n)[0] === n,
  'last-child': (a, n) => elementSiblings(n).pop() === n,
  'nth-child': (a, n, s) => nthChild(a, n, s),
  'nth-last-child': (a, n, s) => nthChild(a, n, s, true),
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
  empty: (a, n) => isEmpty(n),
  root: (a, n) => n.ownerDocument.documentElement === n,
  not: (a, n, s) => !new CssQuery(a).matches(n, s),
  is: (a, n, s) => matchesForgivingSelectorList(a, n, s),
  where: (a, n, s) => matchesForgivingSelectorList(a, n, s),
  has: (a, n) => matchesRelativeSelector(a, n),
  matches: (a, n, s) => new CssQuery(a).matches(n, s),
  scope: (a, n, s) => n === s
}

export class CssQueryNode {
  constructor(compound) {
    if (typeof compound === 'string') compound = parseCompoundSelector(compound)
    this.tag = compound.tag
    this.id = compound.id
    this.classList = compound.classList
    this.attrs = []
    this.pseudo = []

    for (const pseudo of compound.pseudos) {
      const matcher = pseudoMatcher[pseudo.name]
      if (!matcher) {
        throw new InvalidSelectorError(
          `Unsupported pseudo-class :${pseudo.name}`
        )
      }
      this.pseudo.push(matcher.bind(this, pseudo.argument))
    }

    for (const attr of compound.attrs) {
      const matcher = attributeMatcher[attr.operator]
      if (!matcher) {
        throw new InvalidSelectorError(
          `Unsupported attribute operator: ${attr.operator}`
        )
      }
      this.attrs.push({
        name: attr.name,
        getValues: getAttributeValues.bind(this, attr.prefix, attr.name),
        matcher: matcher.bind(this, attr.insensitive, attr.value)
      })
    }
  }

  matches(node, scope) {
    let i

    if (node.nodeType !== 1) return false

    // HTML type selectors are case-insensitive, but foreign elements in the
    // same document retain their namespace's casing rules.
    const tag =
      node.namespaceURI === html && node.ownerDocument?.namespaceURI === html
        ? this.tag.toUpperCase()
        : this.tag

    if (tag && tag !== node.nodeName && tag !== '*') {
      return false
    }

    if (this.id && this.id !== node.id) {
      return false
    }

    const classList = (node.getAttribute('class') || '')
      .split(regex.delimiter)
      .filter(el => !!el.length)
    if (
      this.classList.filter(className => classList.indexOf(className) < 0)
        .length
    ) {
      return false
    }

    for (i = this.attrs.length; i--;) {
      const attrValues = this.attrs[i].getValues(node)
      if (!attrValues.some(this.attrs[i].matcher)) {
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
