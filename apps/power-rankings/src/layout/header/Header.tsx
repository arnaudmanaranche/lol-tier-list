import { UserIcon } from '@heroicons/react/24/outline'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { useEffect } from 'react'

import { Button } from '@lpr/ui'

import TwitterIcon from 'Assets/twitter.svg'
import { useLogin } from 'Hooks/useLogin'
import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE, ROUTES } from 'Utils/constants'

export const Header = (): ReactElement => {
  const supabaseClient = useSupabaseClient()
  const handleLogin = useLogin()
  const session = useUser()

  useEffect(() => {
    const upsertUser = async (userId: string) => {
      await apiInstance.post(`/users/${userId}`)
    }

    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        upsertUser(session.user.id)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabaseClient.auth])
  return (
    <header className="mx-auto w-full max-w-7xl px-4 md:px-6">
      <div className="container mx-auto flex items-center justify-between p-3 md:flex-row md:p-5">
        <Link
          href={ROUTES.HOME}
          prefetch={false}
          className="text-center font-bold text-white md:flex-1 md:text-2xl lg:flex-none"
        >
          {DEFAULT_TITLE}
        </Link>
        {!session ? (
          <Button onClick={handleLogin}>
            Sign in
            <TwitterIcon className="ml-2 h-5 w-5 fill-white" />
          </Button>
        ) : (
          <Button to={ROUTES.MY_ACCOUNT}>
            My Account
            <UserIcon className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  )
}
