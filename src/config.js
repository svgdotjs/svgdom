import path from 'path'
import fontkit from 'fontkit'

const _config = {}
const fonts = {}

export const setFontDir = function (dir) {
  _config.fontDir = dir
  return this
}

export const setFontFamilyMappings = function (map) {
  _config.fontFamilyMappings = map
  return this
}

// TODO: make async
export const preloadFonts = () => {
  var map = _config.fontFamilyMappings

  for (const [ font, file ] of Object.entries(map)) {
    const filename = path.join(_config.fontDir, file)

    try {
      fonts[font] = fontkit.openSync(filename)
    } catch (e) {
      console.warn(`Could not load font file for ${font}`, e)
    }
  }
  return this
}

export const getConfig = () => _config
export const getFonts = () => fonts

export const config = {
  setFontDir,
  setFontFamilyMappings,
  preloadFonts,
  getConfig,
  getFonts
}
