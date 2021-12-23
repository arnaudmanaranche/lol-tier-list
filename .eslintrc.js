module.exports = {
  ignorePatterns: ['.next', 'node_modules', 'public', '!.prettierrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [['^@?\\w'], ['^(Contexts|Components|Utils)(/.*|$)'], ['^\\.'], ['^.+\\.css$']]
      }
    ],
    'simple-import-sort/exports': 2
  }
}
