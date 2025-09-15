import { createClient } from 'clients/supabase/client'
import { useRouter } from 'next/router'

import { API_ENDPOINT } from '@/utils/api'
import { ROUTES } from '@/utils/constants'

export const useLogin = (): (() => Promise<void>) => {
  const supabase = createClient()
  const router = useRouter()

  const handleLogin = async () => {
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      router.push(ROUTES.TOURNAMENTS)
    } else {
      await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${API_ENDPOINT}/auth/callback`
        }
      })
    }
  }

  return handleLogin
}
