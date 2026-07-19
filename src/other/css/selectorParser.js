import { removeQuotes } from '../../utils/strUtils.js'

export class InvalidSelectorError extends Error {}

// CSS hexadecimal escapes consume up to six digits and one optional whitespace
// terminator. Returning the exact end keeps escaped punctuation out of parsing.
const escapeSequenceEnd = (string, index) => {
  let end = index + 1
  const hex = string.slice(end).match(/^[\da-f]{1,6}/i)
  if (!hex) return Math.min(end + 1, string.length)

  end += hex[0].length
  if (string[end] === '\r' && string[end + 1] === '\n') return end + 2
  if (/[ \n\r\t\f]/.test(string[end] || '')) end++
  return end
}

// `%` is the matcher's internal descendant combinator. Keeping it as relation
// state avoids emitting whitespace tokens while the delimiter counters ensure
// that spaces and combinators inside attributes or pseudo arguments stay put.
const tokenizeSelector = (selector, relative) => {
  const queries = []
  let pairs = []
  let token = ''
  let relation = '%'
  let roundBrackets = 0
  let squareBrackets = 0
  let quote = ''

  const pushToken = () => {
    if (!token) return
    pairs.push([relation, token])
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
    if (roundBrackets < 0 || squareBrackets < 0) {
      throw new InvalidSelectorError('Unbalanced selector delimiters')
    }
    if (roundBrackets || squareBrackets || '()[]'.includes(character)) {
      token += character
      continue
    }
    if (character === ',') {
      pushToken()
      if (!pairs.length || relation !== '%') {
        throw new InvalidSelectorError('Empty selector')
      }
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
      if (relation !== '%' || (!pairs.length && !relative)) {
        throw new InvalidSelectorError('Unexpected selector combinator')
      }
      relation = character
      continue
    }
    token += character
  }

  if (quote || roundBrackets || squareBrackets) {
    throw new InvalidSelectorError('Unclosed selector delimiter')
  }
  pushToken()
  if (relation !== '%') {
    throw new InvalidSelectorError('Trailing selector combinator')
  }
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
    const invalid =
      codePoint === 0 ||
      (codePoint >= 0xd800 && codePoint <= 0xdfff) ||
      codePoint > 0x10ffff
    result += invalid ? '\uFFFD' : String.fromCodePoint(codePoint)
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
  // Only a top-level # starts the compound's id; hashes in attribute values and
  // functional pseudo-class arguments belong to those nested syntaxes.
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

const extractPseudos = selector => {
  const pseudos = []
  let remainder = ''
  let squareBrackets = 0
  let quote = ''
  for (let index = 0; index < selector.length; index++) {
    const character = selector[index]
    if (character === '\\') {
      const end = escapeSequenceEnd(selector, index)
      remainder += selector.slice(index, end)
      index = end - 1
      continue
    }
    if (quote) {
      remainder += character
      if (character === quote) quote = ''
      continue
    }
    if (character === '"' || character === "'") {
      quote = character
      remainder += character
      continue
    }
    if (character === '[') squareBrackets++
    else if (character === ']') squareBrackets--
    if (character !== ':' || squareBrackets) {
      remainder += character
      continue
    }
    const name = selector.slice(index + 1).match(/^[\w-]+/)
    if (!name) {
      remainder += character
      continue
    }
    let end = index + name[0].length + 1
    let argument = ''
    if (selector[end] === '(') {
      // Pseudo arguments may contain nested functional selectors and quoted
      // closing parentheses, so locate the mate with depth and quote state.
      const argumentStart = ++end
      let depth = 1
      let argumentQuote = ''
      for (; end < selector.length; end++) {
        const argumentCharacter = selector[end]
        if (argumentCharacter === '\\') {
          end = escapeSequenceEnd(selector, end) - 1
          continue
        }
        if (argumentQuote) {
          if (argumentCharacter === argumentQuote) argumentQuote = ''
          continue
        }
        if (argumentCharacter === '"' || argumentCharacter === "'") {
          argumentQuote = argumentCharacter
        } else if (argumentCharacter === '(') {
          depth++
        } else if (argumentCharacter === ')' && --depth === 0) {
          break
        }
      }
      if (depth) {
        throw new InvalidSelectorError(`Unclosed pseudo-class :${name[0]}()`)
      }
      argument = selector.slice(argumentStart, end)
      end++
    }
    pseudos.push({ name: name[0].toLowerCase(), argument })
    index = end - 1
  }
  return { pseudos, remainder }
}

export const parseCompoundSelector = selector => {
  // Remove each recognized component from a working string. Any remainder is
  // syntax this lightweight parser did not understand and must not be ignored.
  let node = selector
  const compound = { tag: '', id: '', classList: [], attrs: [], pseudos: [] }
  const id = findIdSelector(node)
  if (id) {
    compound.id = id.value
    node = node.slice(0, id.index) + node.slice(id.index + id.length)
  }

  let match = node.match(/^[\w-]+|^\*/)
  if (match) {
    compound.tag = match[0]
    node = node.slice(compound.tag.length)
  }

  const parsedPseudos = extractPseudos(node)
  compound.pseudos = parsedPseudos.pseudos
  node = parsedPseudos.remainder

  while (
    (match = /\[([\w-*]+\|)?([\w-]+)(([=^~$|*]+)(.+?)( +[iI])?)?\]/g.exec(node))
  ) {
    compound.attrs.push({
      prefix: match[1] ? match[1].slice(0, -1) : null,
      name: match[2],
      operator: match[4] || '*',
      value: removeQuotes((match[5] || '').trim()),
      insensitive: !!match[6]
    })
    node =
      node.slice(0, match.index) + node.slice(match.index + match[0].length)
  }

  while ((match = /\.([\w-]+)/g.exec(node))) {
    compound.classList.push(match[1])
    node =
      node.slice(0, match.index) + node.slice(match.index + match[0].length)
  }

  if (node) throw new InvalidSelectorError(`Invalid selector: ${node}`)
  return compound
}

export const parseSelector = (
  selector,
  { forgiving = false, relative = false } = {}
) => {
  selector = String(selector)
  let tokenized
  try {
    tokenized = tokenizeSelector(selector, relative)
  } catch (error) {
    if (forgiving && error instanceof InvalidSelectorError) return []
    throw error
  }

  const queries = []
  for (const pairs of tokenized) {
    try {
      if (!pairs.length) throw new InvalidSelectorError('Empty selector')
      queries.push(
        pairs.map(([relation, compound]) => [
          relation,
          parseCompoundSelector(compound)
        ])
      )
    } catch (error) {
      if (!forgiving || !(error instanceof InvalidSelectorError)) throw error
    }
  }
  return queries
}
