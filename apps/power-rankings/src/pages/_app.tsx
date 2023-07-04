import { useCronitor } from '@cronitorio/cronitor-rum-nextjs'
import { Inter } from '@next/font/google'
import { withProfiler } from '@sentry/react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { domAnimation, LazyMotion } from 'framer-motion'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useState } from 'react'
import { Toaster } from 'sonner'

import { Layout } from '../layout/Layout'

import '@lpr/ui/dist/output.css'
import 'tailwindcss/utilities.css'
import '../styles/custom.css'
import '../styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const App = ({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session
}>) => {
  useCronitor(process.env.NEXT_PUBLIC_CRONITOR_API_KEY, {
    debug: process.env.NODE_ENV === 'development'
  })

  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <LazyMotion features={domAnimation}>
        <div className={`${inter.variable} font-sans`}>
          <Layout>
            <Toaster richColors />
            <Script src="https://cmp.osano.com/169le9SWhqJ5CDSP/d125558d-b1ba-4e3b-a1f2-7fb2afc827d7/osano.js"></Script>
            <Component {...pageProps} />
          </Layout>
        </div>
      </LazyMotion>
    </SessionContextProvider>
  )
}

export default withProfiler(App)
