module.exports = {
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  tabWidth: 2,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  tailwindConfig: './apps/web/tailwind.config.js'
}
