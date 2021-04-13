import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from 'Utils/constants'

import packageJson from '../../package.json'
import Layout from '../layout/Layout'

import '../styles/tailwind.css'
import 'tailwindcss/utilities.css'
import '../styles/custom.css'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://414bc62ada7a494dbecebef07435dca4@o81045.ingest.sentry.io/5717735',
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
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
)

export default Sentry.withProfiler(App)
