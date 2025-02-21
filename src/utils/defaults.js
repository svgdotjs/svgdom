import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const fileDirname = dirname(fileURLToPath(import.meta.url))

export const fontSize = 16
export const fontFamily = 'sans-serif'
export const fontDir = join(fileDirname, '../../', 'fonts/')
export const fontFamilyMappings = {
  'sans-serif': 'OpenSans-Regular.ttf',
  'Open Sans': 'OpenSans-Regular.ttf'
}
