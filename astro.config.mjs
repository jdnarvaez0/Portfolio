// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://juannarvaez.dev',
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'en',
                locales: {
                    en: 'en',
                    es: 'es',
                },
            },
        }),
    ],
    i18n: {
        locales: ['en', 'es'],
        defaultLocale: 'en',
    },
});
