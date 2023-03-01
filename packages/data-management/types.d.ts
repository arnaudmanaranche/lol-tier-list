declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ID: string
    NODE_ENV: string
    PANDASCORE_TOKEN: string
    REVALIDATE_SECRET: string
    UPSTASH_REDIS_REST_URL: string
    UPSTASH_REDIS_REST_TOKEN: string
  }
}
