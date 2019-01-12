module.exports = {
  // splits a transformation chain
  transforms: /\)\s*,?\s*/,
  // split at whitespace and comma
  delimiter: /[\s,]+/,

  // The following regex are used to parse the d attribute of a path

  // Matches all hyphens which are not after an exponent
  hyphen: /([^e])-/gi,

  // Replaces and tests for all path letters
  pathLetters: /[MLHVCSQTAZ]/gi,

  // yes we need this one, too
  isPathLetter: /[MLHVCSQTAZ]/i,

  // matches 0.154.23.45
  numbersWithDots: /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,

  // matches .
  dots: /\./g
}
