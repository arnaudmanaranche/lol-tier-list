import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co`,
  process.env.NEXT_PUBLIC_SUPABASE_TOKEN
)

export default supabase
