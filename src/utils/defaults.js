import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url));

export const fontSize = 16
export const fontFamily = 'sans-serif'
export const fontDor = join(__dirname, '..', 'fonts/')
export const fontFamilyMappings = {
  'sans-serif': 'OpenSans-Regular.ttf',
  OpenSans: 'OpenSans-Regular.ttf'
}
