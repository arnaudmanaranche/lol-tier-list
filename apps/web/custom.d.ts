declare module '*.svg'

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_ENV: string
    NEXT_PUBLIC_CRONITOR_API_KEY: string
    NEXT_PUBLIC_SENTRY_DSN: string
    NEXT_PUBLIC_SUPABASE_ID: string
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SUPABASE_TOKEN: string
    OSANO_URL: string
    REVALIDATE_SECRET: string
  }
}
