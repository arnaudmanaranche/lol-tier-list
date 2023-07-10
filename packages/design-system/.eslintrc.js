module.exports = {
  extends: ['prodigy', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: ['./src/**/*.stories.@(js|jsx|ts|tsx)']
    }
  ]
}
