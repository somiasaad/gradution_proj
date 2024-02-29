// i18n.js

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import i18n from 'i18n';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

i18n.configure({
    locales: ['en', 'ar'],
    directory: `${__dirname}/../locales`,  // Use __dirname
    defaultLocale: 'en',
    cookie: 'locale',
    queryParameter: 'lang',
    objectNotation: true,
});

export default i18n;
