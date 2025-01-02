import 'tailwindcss/utilities.css'
import '../styles/custom.css'

import { Analytics } from '@vercel/analytics/next'
import { domAnimation, LazyMotion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Bebas_Neue, Roboto } from 'next/font/google'
import Head from 'next/head'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  WEBSITE_URL
} from '@/utils/constants'

const title = Bebas_Neue({
  weight: ['400'],
  style: ['normal'],
  variable: '--font-title',
  subsets: ['latin']
})

const body = Roboto({
  weight: ['400'],
  style: ['normal'],
  variable: '--font-body',
  subsets: ['latin']
})

const App = ({ Component, pageProps }: AppProps): ReactNode => {
  return (
    <LazyMotion features={domAnimation}>
      <Head>
        {/* Title */}
        <title>{`${DEFAULT_TITLE} - League of Legends tier lists maker`}</title>
        <meta
          property="og:title"
          content={`${DEFAULT_TITLE} - League of Legends tier lists maker`}
        />
        {/* Description */}
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} />
        {/* Image */}
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        {/* Open graph */}
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className={`${title.variable} ${body.variable}`}>
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div className="hidden h-full w-full max-w-7xl grid-cols-3 gap-3.5 px-4 lg:grid">
            <div className="border-x border-white/5"></div>
            <div className="border-x border-white/5"></div>
            <div className="border-x border-white/5"></div>
          </div>
        </div>
        <Toaster richColors />
        <main className="relative min-h-screen">
          <Component {...pageProps} />
          <Analytics />
        </main>
      </div>
    </LazyMotion>
  )
}

export default App
