import { createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'
import { type GetServerSidePropsContext } from 'next'
import type { Database } from 'types/database.types'

export function createClient({
  req,
  res
}: GetServerSidePropsContext): SupabaseClient<Database> {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || ''
          }))
        },
        setAll(cookiesToSet) {
          res.setHeader(
            'Set-Cookie',
            cookiesToSet.map(({ name, value, options }) =>
              serializeCookieHeader(name, value, options)
            )
          )
        }
      }
    }
  )

  return supabase
}
