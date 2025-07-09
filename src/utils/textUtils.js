import path from 'node:path'
import * as fontkit from 'fontkit'
import * as defaults from './defaults.js'
import { Box, NoBox } from '../other/Box.js'
import { getConfig, getFonts } from '../config.js'

export const textBBox = function (text, x, y, details) {

  if (!text) return new NoBox()

  const config = getConfig()
  const preloaded = getFonts()

  const families = (details.fontFamily || defaults.fontFamily).split(/\s*,\s*/)
  const fontMap = Object.assign({}, defaults.fontFamilyMappings, config.fontFamilyMappings)
  const fontDir = config.fontDir || defaults.fontDir
  let fontSize = parseFloat(details.fontSize)
  if (isNaN(fontSize)) {
    fontSize = defaults.fontSize
  }
  let fontFamily
  let font

  for (let i = 0, il = families.length; i < il; ++i) {
    if (fontMap[families[i]]) {
      fontFamily = families[i]
      break
    }
  }

  if (!fontFamily) {
    fontFamily = defaults.fontFamily
  }

  if (preloaded[fontFamily]) {
    font = preloaded[fontFamily]
  } else {
    const filename = path.join(fontDir, fontMap[fontFamily])
    try {
      font = fontkit.openSync(filename)
    } catch (e) {
      console.warn(`Could not open font "${fontFamily}" in file "${filename}". ${e.toString()}`)
      return new NoBox()
    }

    preloaded[fontFamily] = font
  }

  const fontHeight = font.ascent - font.descent
  const lineHeight = fontHeight > font.unitsPerEm ? fontHeight : fontHeight + font.lineGap

  const height = lineHeight / font.unitsPerEm * fontSize
  const width = font.layout(text).glyphs.reduce((last, curr) => last + curr.advanceWidth, 0) / font.unitsPerEm * fontSize

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
  let xAdjust = 0
  if (details.textAnchor === 'end') {
    xAdjust = -width
  } else if (details.textAnchor === 'middle') {
    xAdjust = -width / 2
  }

  // https://www.w3.org/TR/2002/WD-css3-linebox-20020515/
  // 4.2. Baseline identifiers
  let yAdjust = font.ascent // alphabetic
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
