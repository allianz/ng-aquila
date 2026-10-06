import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: [
      // `main` points at a Node entry with a dynamic `require()` of every locale, which rolldown can't bundle for the browser.
      { find: /^i18n-iso-countries$/, replacement: 'i18n-iso-countries/index.js' },
    ],
  },
});
