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

  var height = lineHeight/font.unitsPerEm * fontSize
  var width = font.layout(text).glyphs.reduce((last, curr) => last + curr.advanceWidth, 0) / font.unitsPerEm * fontSize

  return new Box(x, y-font.ascent/font.unitsPerEm * fontSize, width, height)
}

module.exports = {bbox}