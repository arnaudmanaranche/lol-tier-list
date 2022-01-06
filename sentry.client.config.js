import * as Sentry from '@sentry/nextjs'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.2,
  environment: process.env.APP_ENV
})
