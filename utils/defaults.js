import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  fontSize: 16,
  fontFamily: 'sans-serif',
  fontDir: join(__dirname, '..', 'fonts/'),
  fontFamilyMappings: { 'sans-serif': 'OpenSans-Regular.ttf' }
}
