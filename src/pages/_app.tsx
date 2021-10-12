import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from 'Utils/constants'

import packageJson from '../../package.json'
import { UserProvider } from '../contexts/user'
import Layout from '../layout/Layout'

import '../styles/tailwind.css'
import 'tailwindcss/utilities.css'
import '../styles/custom.css'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: `lol-power-ranking@${packageJson.version}`,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  })
}

const App = ({ Component, pageProps }: AppProps) => (
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

export default Sentry.withProfiler(App)
