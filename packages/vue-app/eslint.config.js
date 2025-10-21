import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  js.configs.recommended,
  ...vuePlugin.configs['flat/recommended'],
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        global: 'readonly',
        fetch: 'readonly',
        Response: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        require: 'readonly',
        Event: 'readonly',
        HTMLInputElement: 'readonly',
        NodeJS: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'vue': vuePlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-unused-vars': 'off', // Turn off base rule as it's overridden by TypeScript version
      '@typescript-eslint/no-explicit-any': 'warn',
      'prefer-const': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/max-attributes-per-line': 'off',
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      'no-console': 'warn',
      'no-var': 'error',
      'eqeqeq': 'error',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error'
    }
  },
  {
    files: ['**/*.test.{ts,vue}', '**/*.spec.{ts,vue}'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        vi: 'readonly'
      }
    }
  },
  {
    ignores: [
      'dist/',
      'node_modules/',
      '*.js',
      'vite.config.ts',
      'coverage/'
    ]
  }
];