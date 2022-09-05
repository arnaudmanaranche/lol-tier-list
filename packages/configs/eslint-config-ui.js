module.exports = {
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error'
  },
  overrides: [
    {
      files: ['./src/**/*.stories.@(js|jsx|ts|tsx)']
    }
  ]
}
