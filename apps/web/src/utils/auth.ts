import type { AuthChangeEvent, Session, User } from '@supabase/gotrue-js'

import { supabase } from 'Utils/supabase'

import { apiInstance } from './api'

const logout = async (): Promise<void> => {
  await supabase.auth.signOut()
}

const login = async (): Promise<void> => {
  const redirectTo = window.location.href

  await supabase.auth.signIn(
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
  await apiInstance.post(`/users/${user.id}`, {
    userId: user.id
  })
}

export { handleAuthChange, handleLogin, login, logout }
