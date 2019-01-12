const defaults = require('./defaults')
const Box = require('../class/Box')
const path = require('path')
const fontkit = require('fontkit')

const bbox = function (text, x, y, details) {

  var families = (details.fontFamily || defaults.fontFamily).split(/\s*,\s*/)
  var fontMap = Object.assign({}, defaults.fontFamilyMappings, details.fontFamilyMappings)
  var fontSize = details.fontSize || defaults.fontSize
  var fontDir = details.fontDir || defaults.fontDir
  var fontFamily
  var font

  for (var i = 0, il = families.length; i < il; ++i) {
    if (fontMap[families[i]]) {
      fontFamily = families[i]
      break
    }
  }

  if (!fontFamily) {
    fontFamily = defaults.fontFamily
  }

  if (details.preloaded[fontFamily]) {
    font = details.preloaded[fontFamily]
  } else {
    let filename = path.join(fontDir, fontMap[fontFamily])

    try {
      font = fontkit.openSync(filename)
    } catch (e) {
      console.warn(`Could not open font "${fontFamily}" in file "${filename}". ${e.toString()}`)
      return new Box()
    }

    details.preloaded[fontFamily] = font
  }

  var fontHeight = font.ascent - font.descent
  var lineHeight = fontHeight > font.unitsPerEm ? fontHeight : fontHeight + font.lineGap

  var height = lineHeight / font.unitsPerEm * fontSize
  var width = font.layout(text).glyphs.reduce((last, curr) => last + curr.advanceWidth, 0) / font.unitsPerEm * fontSize

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
  var xAdjust = 0
  if (details.textAnchor === 'end') {
    xAdjust = -width
  } else if (details.textAnchor === 'middle') {
    xAdjust = -width / 2
  }

  // https://www.w3.org/TR/2002/WD-css3-linebox-20020515/
  // 4.2. Baseline identifiers
  var yAdjust = font.ascent // alphabetic
  if (details.dominantBaseline === 'before-edge' || details.dominantBaseline === 'text-before-edge') {
    yAdjust = 0
  } else if (details.dominantBaseline === 'hanging') {
    yAdjust = font.ascent - font.xHeight - font.capHeight
  } else if (details.dominantBaseline === 'mathematical') {
    yAdjust = font.ascent - font.xHeight
  } else if (details.dominantBaseline === 'middle') {
    yAdjust = font.ascent - font.xHeight / 2
  } else if (details.dominantBaseline === 'central') {
    yAdjust = font.ascent / 2 + font.descent / 2
  } else if (details.dominantBaseline === 'ideographic') {
    yAdjust = font.ascent + font.descent
  }

  return new Box(x + xAdjust, y - yAdjust / font.unitsPerEm * fontSize, width, height)
}

module.exports = { bbox }
