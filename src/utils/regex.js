// splits a transformation chain
export const transforms = /\)\s*,?\s*/

// split at whitespace and comma
export const delimiter = /[\s,]+/

// The following regex are used to parse the d attribute of a path

// Matches all hyphens which are not after an exponent
export const hyphen = /([^e])-/gi

// Replaces and tests for all path letters
export const pathLetters = /[MLHVCSQTAZ]/gi

// yes we need this one, too
export const isPathLetter = /[MLHVCSQTAZ]/i

// matches 0.154.23.45
export const numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi

// matches .
export const dots = /\./g
