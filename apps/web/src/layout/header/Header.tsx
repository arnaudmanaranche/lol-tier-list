import { UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

import { Button } from '@lpr/ui'

import TwitterIcon from 'Assets/twitter.svg'
import { useSetUser, useUser } from 'Contexts/user'
import { handleAuthChange, handleLogin, login } from 'Utils/auth'
import { DEFAULT_TITLE, ROUTES } from 'Utils/constants'
import { supabaseClient } from 'Utils/supabase'

export const Header = (): ReactElement => {
  const user = useUser()
  const setUser = useSetUser()

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)

      if (event === 'SIGNED_IN') {
        handleLogin(session?.user)
        setUser(session?.user)
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [setUser])

  return (
    <header className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <div className="container flex justify-between items-center p-3 md:p-5 mx-auto md:flex-row">
        <Link
          href={ROUTES.HOME}
          prefetch={false}
          className="md:flex-1 font-bold text-center lg:flex-none text-white md:text-2xl"
        >
          {DEFAULT_TITLE}
        </Link>
        {!user ? (
          <Button onClick={login}>
            Sign in
            <TwitterIcon className="w-5 h-5 ml-2 fill-white" />
          </Button>
        ) : (
          <Button to={ROUTES.MY_ACCOUNT}>
            My Account
            <UserIcon className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
    </header>
  )
}
