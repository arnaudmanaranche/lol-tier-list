module.exports = {
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': 'error',
    'simple-import-sort/exports': 2,
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^@?\\w'],
          ['^(@lpr)(/.*|$)'],
          ['^(Assets|Clients|Components|Entities|Hooks|Pandascore|Utils)(/.*|$)'],
          ['^\\.'],
          ['^.+\\.css$']
        ]
      }
    ]
  }
}
