module.exports = {
  purge: ['./src/**/*.tsx'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#03acbf',
        primaryDark: '#027F8D',
        dark: '#0e0e10',
        backgroundColor: '#f7f7f8',
        gTier: '#ff1902',
        sTier: '#f9be22',
        aTier: '#ff9a01',
        bTier: '#619c45',
        cTier: '#2e7fcb',
        dTier: '#8b7fc5'
      },
      fontFamily: {
        title: ['FiraSans'],
        body: ['Merriweather']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
