// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://juannarvaez.dev',
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
});
