const isAsciiDigit = codeUnit => codeUnit >= 0x30 && codeUnit <= 0x39
const isAsciiLetter = codeUnit =>
  (codeUnit >= 0x41 && codeUnit <= 0x5a) ||
  (codeUnit >= 0x61 && codeUnit <= 0x7a)

const escape = function (value) {
  if (arguments.length === 0) {
    throw new TypeError('CSS.escape requires an argument')
  }

  const string = String(value)
  const firstCodeUnit = string.charCodeAt(0)
  let result = ''

  for (let index = 0; index < string.length; index++) {
    const codeUnit = string.charCodeAt(index)

    if (codeUnit === 0x0000) {
      result += '\uFFFD'
      continue
    }

    if (
      (codeUnit >= 0x0001 && codeUnit <= 0x001f) ||
      codeUnit === 0x007f ||
      (index === 0 && isAsciiDigit(codeUnit)) ||
      (index === 1 && isAsciiDigit(codeUnit) && firstCodeUnit === 0x002d)
    ) {
      result += `\\${codeUnit.toString(16)} `
      continue
    }

    if (index === 0 && codeUnit === 0x002d && string.length === 1) {
      result += '\\-'
      continue
    }

    if (
      codeUnit >= 0x0080 ||
      codeUnit === 0x002d ||
      codeUnit === 0x005f ||
      isAsciiDigit(codeUnit) ||
      isAsciiLetter(codeUnit)
    ) {
      result += string.charAt(index)
      continue
    }

    result += `\\${string.charAt(index)}`
  }

  return result
}

export const CSS = { escape }

Object.defineProperty(CSS, Symbol.toStringTag, { value: 'CSS' })
