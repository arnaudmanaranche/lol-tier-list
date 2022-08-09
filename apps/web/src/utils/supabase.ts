import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co`,
  process.env.NEXT_PUBLIC_SUPABASE_TOKEN
)
