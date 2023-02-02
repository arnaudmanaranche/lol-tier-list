module.exports = {
  extends: ['next/core-web-vitals', 'prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': [
      2,
      {
        groups: [
          ['^@?\\w'],
          ['^(@lpr)(/.*|$)'],
          ['^(Assets|Config|Contexts|Components|Utils)(/.*|$)'],
          ['^\\.'],
          ['^.+\\.css$']
        ]
      }
    ],
    'simple-import-sort/exports': 2,
    '@typescript-eslint/consistent-type-imports': 'error'
  }
}
