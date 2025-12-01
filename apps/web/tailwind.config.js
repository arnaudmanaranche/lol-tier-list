/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  content: ['./src/**/*.tsx', '../../packages/shared/src/**/*.{ts,tsx}'],
  darkMode: 'class',
  safelist: [
    'bg-gTier',
    'bg-sPlusTier',
    'bg-sTier',
    'bg-sMinusTier',
    'bg-aPlusTier',
    'bg-aTier',
    'bg-aMinusTier',
    'bg-bPlusTier',
    'bg-bTier',
    'bg-bMinusTier',
    'bg-cPlusTier',
    'bg-cTier',
    'bg-cMinusTier',
    'bg-dPlusTier',
    'bg-dTier',
    'bg-dMinus'
  ],
  theme: {
    extend: {
      colors: {
        gunmetal: '#292E41',
        gunmetalDark: '#1B2030',
        brightGray: '#ebebef14',
        dark: '#0e0e10',
        // Tiers
        gTier: '#ff1902',
        sPlusTier: '#ffcc00', // Slightly brighter tone for S+
        sTier: '#f9be22', // Original S tier color
        sMinusTier: '#e5a720', // Slightly darker tone for S-

        aPlusTier: '#ffaa33', // Slightly brighter tone for A+
        aTier: '#ff9a01', // Original A tier color
        aMinusTier: '#e58a01', // Slightly darker tone for A-

        bPlusTier: '#72ad56', // Slightly brighter tone for B+
        bTier: '#619c45', // Original B tier color
        bMinusTier: '#528637', // Slightly darker tone for B-

        cPlusTier: '#3b8fd3', // Slightly brighter tone for C+
        cTier: '#2e7fcb', // Original C tier color
        cMinusTier: '#266fb5', // Slightly darker tone for C-

        dPlusTier: '#9987d0', // Slightly brighter tone for D+
        dTier: '#8b7fc5', // Original D tier color
        dMinusTier: '#7c6eb4' // Slightly darker tone for D-
      },
      fontFamily: {
        sans: ['var(--font-title)', 'sans-serif'],
        serif: ['var(--font-body)', 'serif']
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'white',
            h2: {
              color: 'white'
            },
            p: {
              color: 'white'
            }
          }
        }
      },
      keyframes: {
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.96)'
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        }
      },
      animation: {
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }
  },
  plugins: []
}
