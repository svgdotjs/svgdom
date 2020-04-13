import path from 'path'
import fontkit from 'fontkit'

const config = {}
const fonts = {}

export const setFontDir = function (dir) {
  config.fontDir = dir
}

export const setFontFamilyMappings = function (map) {
  config.fontFamilyMappings = map
}

// TODO: make async
export const preloadFonts = () => {
  var map = config.fontFamilyMappings

  for (const [ font, file ] of Object.entries(map)) {
    const filename = path.join(config.fontDir, file)

    try {
      fonts[font] = fontkit.openSync(filename)
    } catch (e) {
      console.warn(`Could not load font file for ${font}`, e)
    }
  }
}

export const getConfig = () => config
export const getFonts = () => fonts
