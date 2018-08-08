const defaults = require('./defaults')
const Box = require('../class/Box')
const path = require('path')
const fontkit = require('fontkit')

const bbox = function(text, x, y, details) {

  var families = (details.fontFamily || defaults.fontFamily).split(/\s*,\s*/)
    , map = details.fontFamilyMappings || defaults.fontFamilyMappings
    , fontSize = details.fontSize || defaults.fontSize
    , fontDir = details.fontDir || defaults.fontDir
    , fontFamily, font

  for(var i = 0, il = families.length; i < il; ++i) {
    if(map[families[i]]) break
  }

  if(details.preloaded[families[i]]) {
    font = details.preloaded[families[i]]
  }else{
    filename = map[families[i]] || map[defaults.fontFamily]
    filename = path.join(fontDir, filename)

    try{
      font = fontkit.openSync(filename)
    }catch(e){
      console.warn('Could not load font file for ' + details.fontFamily + '.' + e)
      return new Box
    }

    details.preloaded[families[i]] = font
  }

  var fontHeight = font.ascent - font.descent
  var lineHeight = fontHeight > font.unitsPerEm ? fontHeight : fontHeight + font.lineGap

  fontSize = parseFloat(fontSize)
  var height = lineHeight/font.unitsPerEm * fontSize
  var width = font.layout(text).glyphs.reduce((last, curr) => last + curr.advanceWidth, 0) / font.unitsPerEm * fontSize

  // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor
  var xAdjust = 0;
  if (details.textAnchor === 'end') {
 xAdjust = -width
  } else if (details.textAnchor === 'middle') {
 xAdjust = -width/2
  }

  // https://www.w3.org/TR/2002/WD-css3-linebox-20020515/
  // 4.2. Baseline identifiers
  var yAdjust = font.ascent; // alphabetic
  if (details.dominantBaseline === 'before-edge' || details.dominantBaseline === 'text-before-edge') {
    yAdjust = 0
  } else if (details.dominantBaseline === 'hanging') {
    yAdjust = font.ascent - font.xHeight - font.capHeight
  } else if (details.dominantBaseline === 'mathematical') {
   yAdjust = font.ascent - font.xHeight
  } else if (details.dominantBaseline === 'middle') {
    yAdjust = font.ascent - font.xHeight / 2;
  } else if (details.dominantBaseline === 'central') {
    yAdjust = font.ascent / 2 + font.descent / 2;
  } else if (details.dominantBaseline === 'ideographic') {
    yAdjust = font.ascent + font.descent;
  }

  return new Box(x + xAdjust, y-yAdjust/font.unitsPerEm * fontSize, width, height)
}

module.exports = {bbox}
