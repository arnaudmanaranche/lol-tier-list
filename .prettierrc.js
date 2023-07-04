module.exports = {
  printWidth: 100,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  tabWidth: 2,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  tailwindConfig: 'packages/tailwind-config-prodigy'
}
