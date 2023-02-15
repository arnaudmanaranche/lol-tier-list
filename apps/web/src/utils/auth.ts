import type { AuthChangeEvent, Session, User } from '@supabase/gotrue-js'

import { supabaseClient } from 'Utils/supabase'

import { apiInstance } from './api'

const logout = async (): Promise<void> => {
  await supabaseClient.auth.signOut()
}

const login = async (): Promise<void> => {
  const redirectTo = window.location.href

  await supabaseClient.auth.signIn(
    {
      provider: 'twitter'
    },
    {
      redirectTo
    }
  )
}

const handleAuthChange = async (event: AuthChangeEvent, session: Session): Promise<void> => {
  await apiInstance.post('/auth', {
    event,
    session
  })
}

const handleLogin = async (user: User): Promise<void> => {
  await apiInstance.post(`/users/${user.id}`)
}

export { handleAuthChange, handleLogin, login, logout }
