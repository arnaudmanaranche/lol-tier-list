module.exports = {
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^@?\\w'],
          ['^(@lpr)(/.*|$)'],
          ['^(Assets|Clients|Components|Entities|Hooks|Utils)(/.*|$)'],
          ['^\\.'],
          ['^.+\\.css$']
        ]
      }
    ],
    'simple-import-sort/exports': 2,
    '@typescript-eslint/consistent-type-imports': 'error'
  }
}
