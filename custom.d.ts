declare module '*.svg'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    // Supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    NEXT_PUBLIC_SUPABASE_ID: string
    NEXT_PUBLIC_SUPABASE_TOKEN: string
    NEXT_PUBLIC_SUPABASE_URL: string
  }
}
