import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // This config has no jsx-uses-vars rule (eslint-plugin-react isn't
      // installed), so identifiers used only inside JSX would flag as unused:
      // capitalised components, destructured icon props, and framer-motion's
      // lowercase `motion.*` members are all exempted here instead.
      'no-unused-vars': ['error', { varsIgnorePattern: '^([A-Z_]|motion$)', argsIgnorePattern: '^[A-Z_]' }],
      // Shared modules export a few constants (EASE, endpoints) alongside components.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
])
