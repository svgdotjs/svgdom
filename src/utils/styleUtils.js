import { decamelize } from './strUtils.js'

const scan = (value, callback) => {
  let quote = ''
  let parentheses = 0
  let brackets = 0
  let braces = 0

  for (let i = 0; i < value.length; i++) {
    const character = value[i]

    if (character === '\\') {
      i++
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

    if (character === '/' && value[i + 1] === '*') {
      const commentEnd = value.indexOf('*/', i + 2)
      i = commentEnd === -1 ? value.length : commentEnd + 1
      continue
    }

    if (character === '(') parentheses++
    else if (character === ')' && parentheses) parentheses--
    else if (character === '[') brackets++
    else if (character === ']' && brackets) brackets--
    else if (character === '{') braces++
    else if (character === '}' && braces) braces--
    else if (!parentheses && !brackets && !braces && callback(character, i) === false) return
  }
}

const splitDeclarations = (cssText) => {
  const declarations = []
  let start = 0

  scan(cssText, (character, index) => {
    if (character !== ';') return
    declarations.push(cssText.slice(start, index))
    start = index + 1
  })

  declarations.push(cssText.slice(start))
  return declarations
}

const declarationColon = (declaration) => {
  let colon = -1

  scan(declaration, (character, index) => {
    if (character !== ':') return
    colon = index
    return false
  })

  return colon
}

const withoutCommentsAndWhitespace = (value) => value
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s/g, '')

const withoutComments = (value) => value.replace(/\/\*[\s\S]*?\*\//g, '')

export const splitStylePriority = (value) => {
  let importantIndex = -1

  scan(value, (character, index) => {
    if (character !== '!') return

    const priority = withoutCommentsAndWhitespace(value.slice(index))
    if (priority.toLowerCase() === '!important') importantIndex = index
  })

  if (importantIndex === -1) {
    return { value: value.trim(), priority: '' }
  }

  return {
    value: value.slice(0, importantIndex).trim(),
    priority: 'important'
  }
}

export const normalizeStylePropertyName = (name) => {
  name = String(name).trim()
  if (name.startsWith('--')) return name
  if (name === 'cssFloat') return 'float'
  return decamelize(name).toLowerCase()
}

export const parseStyleDeclarations = (cssText) => {
  const parsed = []

  for (const declaration of splitDeclarations(String(cssText))) {
    const colon = declarationColon(declaration)
    if (colon === -1) continue

    const name = normalizeStylePropertyName(withoutComments(declaration.slice(0, colon)))
    if (!name) continue

    const parsedValue = splitStylePriority(declaration.slice(colon + 1))
    if (!name.startsWith('--') && !parsedValue.value) continue

    const existingIndex = parsed.findIndex(({ name: existingName }) => existingName === name)
    if (existingIndex === -1) {
      parsed.push({ name, ...parsedValue })
      continue
    }

    const existing = parsed[existingIndex]
    const winner = existing.priority && !parsedValue.priority ? existing : { name, ...parsedValue }

    // A duplicate declaration is represented once, at the end of the block.
    // An earlier important value still wins over a later non-important value.
    parsed.splice(existingIndex, 1)
    parsed.push(winner)
  }

  return parsed
}

export const serializeStyleDeclarations = (declarations) => declarations
  .map(({ name, value, priority }) => `${name}: ${value}${priority ? ' !important' : ''};`)
  .join(' ')
