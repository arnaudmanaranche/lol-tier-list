declare module '*.svg'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    // Supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SUPABASE_ID: string
    NEXT_PUBLIC_SUPABASE_TOKEN: string
    NEXT_PUBLIC_SUPABASE_URL: string
    // Resend
    RESEND_API_KEY: string
    RESEND_AUDIENCE_ID: string
    // PandaScore
    PANDASCORE_TOKEN: string
    // Cronitor
    NEXT_PUBLIC_CRONITOR_API_KEY: string
    // N8N
    N8N_WEBHOOK_URL: string
    N8N_API_KEY: string
  }
}
