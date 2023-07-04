import { useSupabaseClient } from '@supabase/auth-helpers-react'

export const useLogin = () => {
  const supabaseClient = useSupabaseClient()

  const handleLogin = async () => {
    await supabaseClient.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: window.location.href
      }
    })
  }

  return handleLogin
}
