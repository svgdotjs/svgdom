import { join } from 'path'
import { default as __dirname } from './dirname.cjs' // eslint-disable-line

// use this as soon as import.meta is standardized
// const __dirname = dirname(fileURLToPath(import.meta.url));

export const fontSize = 16
export const fontFamily = 'sans-serif'
export const fontDir = join(__dirname, '../../', 'fonts/')
export const fontFamilyMappings = {
  'sans-serif': 'OpenSans-Regular.ttf',
  OpenSans: 'OpenSans-Regular.ttf'
}
