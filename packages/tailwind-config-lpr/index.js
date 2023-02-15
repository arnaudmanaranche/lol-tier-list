const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.tsx', '/packages/design-system/src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gunmetal: '#292E41',
        gunmetalDark: '#1B2030',
        brightGray: '#ebebef14',
        charcoal: '#383d51',
        dark: '#0e0e10',
        gTier: '#ff1902',
        sTier: '#f9be22',
        aTier: '#ff9a01',
        bTier: '#619c45',
        cTier: '#2e7fcb',
        dTier: '#8b7fc5'
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
