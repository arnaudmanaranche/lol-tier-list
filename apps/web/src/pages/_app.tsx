import { usePanelbear } from '@panelbear/panelbear-nextjs'
import { withProfiler } from '@sentry/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { UserProvider } from 'Contexts/user'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from 'Utils/constants'

import Layout from '../layout/Layout'

import '@lpr/ui/dist/output.css'
import '../styles/tailwind.css'
import 'tailwindcss/utilities.css'
import '../styles/custom.css'

const App = ({ Component, pageProps }: AppProps) => {
  usePanelbear(process.env.NEXT_PUBLIC_PANELBEAR_SITE_ID, {
    debug: process.env.NODE_ENV === 'development'
  })

  return (
    <>
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />
        <meta property="og:image" content="" key="og:image" />
        <meta property="og:title" content={DEFAULT_TITLE} key="og:title" />
        <meta property="og:description" content={DEFAULT_DESCRIPTION} key="og:description" />
        <meta name="twitter:title" content={DEFAULT_TITLE} key="twitter:title" />
        <meta name="twitter:description" content={DEFAULT_DESCRIPTION} key="twitter:description" />
      </Head>
      <UserProvider>
        <ThemeProvider attribute="class">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserProvider>
    </>
  )
}

export default withProfiler(App)
