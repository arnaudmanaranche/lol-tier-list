import type { AuthChangeEvent, Session, User } from '@supabase/gotrue-js'

import supabase from 'Utils/supabase'

const logout = async (): Promise<void> => {
  await supabase.auth.signOut()
}

const login = async (): Promise<void> => {
  await supabase.auth.signIn({
    provider: 'twitter'
  })
}

const handleAuthChange = async (event: AuthChangeEvent, session: Session): Promise<void> => {
  await fetch('/api/auth', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ event, session })
  })
}

const checkUser = async (user: User): Promise<void> => {
  await fetch('/api/user/new', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify({ userId: user.id })
  })
}

export { checkUser, handleAuthChange, login, logout }
