import { useCronitor } from '@cronitorio/cronitor-rum-nextjs'
import { Inter } from '@next/font/google'
import { withProfiler } from '@sentry/react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { domAnimation, LazyMotion } from 'framer-motion'
import type { AppProps } from 'next/app'
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

  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <LazyMotion features={domAnimation}>
        <div className={`${inter.variable} font-sans`}>
          <Layout>
            <Toaster richColors />
            <Component {...pageProps} />
          </Layout>
        </div>
      </LazyMotion>
    </SessionContextProvider>
  )
}

export default withProfiler(App)
