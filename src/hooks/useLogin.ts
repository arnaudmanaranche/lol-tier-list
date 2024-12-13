import { createClient } from 'clients/supabase/client'

import { API_ENDPOINT } from '@/utils/api'

export const useLogin = (): (() => Promise<void>) => {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${API_ENDPOINT}/auth/callback`
      }
    })
  }

  return handleLogin
}
