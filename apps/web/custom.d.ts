declare module '*.svg'

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_APP_ENV: string
    NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY: string
    NEXT_PUBLIC_CRONITOR_API_KEY: string
    NEXT_PUBLIC_SENTRY_DSN: string
    NEXT_PUBLIC_SUPABASE_ID: string
    NEXT_PUBLIC_SUPABASE_TOKEN: string
    PANDASCORE_TOKEN: string
    REDIS_URL: string
    REVALIDATE_SECRET: string
  }
}
