/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        purple: {
          primary: '#6036a2',
          hover: '#472878'
        }
      }
    }
  },
  plugins: []
}
