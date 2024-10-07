const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'], // Ensure this matches your project structure
    ignores: ['**/config.js'],
    languageOptions: {
      parserOptions: {
        sourceType: 'commonjs', // Specify CommonJS for Node.js environment
      },
      sourceType: 'commonjs', // Use CommonJS for Node.js
      globals: {
        ...globals.node, // Add Node.js globals
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-const-assign': 'error',
    },
  },
];
