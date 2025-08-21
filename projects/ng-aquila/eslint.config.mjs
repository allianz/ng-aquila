import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(['!**/*', 'src/schematics/**/*', 'documentation/examples/**/*']),
  {
    extends: compat.extends('../../.eslintrc.json'),
  },
  {
    files: ['**/*.ts'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['projects/ng-aquila/tsconfig.lib.json', 'projects/ng-aquila/tsconfig.spec.json'],

        createDefaultProgram: true,
      },
    },

    rules: {
      '@typescript-eslint/prefer-readonly': 'off',
      '@angular-eslint/no-conflicting-lifecycle': 'warn',
      '@angular-eslint/no-output-on-prefix': 'warn',
    },
  },
  {
    files: ['**/*.spec.ts'],

    rules: {
      'jasmine/no-suite-dupes': 'off',
      'jasmine/no-spec-dupes': 'off',
    },
  },
  {
    files: ['**/*.html'],

    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/no-duplicate-attributes': 'warn',
    },
  },
]);
