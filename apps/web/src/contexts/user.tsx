import type { User } from '@supabase/gotrue-js'
import type { ReactElement, ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { supabase } from 'Utils/supabase'

export const UserContext = createContext(null)
export const SetUserContext = createContext(null)

export function UserProvider({ children }: { children: NonNullable<ReactNode> }): ReactElement {
  const [user, setUser] = useState(null)

  async function checkUser() {
    const user = await supabase.auth.user()

    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  const setUserData = useCallback((user): void => {
    setUser(user)
  }, [])

  return (
    <SetUserContext.Provider value={setUserData}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </SetUserContext.Provider>
  )
}

export const useUser = (): User => useContext(UserContext)
export const useSetUser = (): ((_: User) => void) => useContext(SetUserContext)
