import { Switch } from '@headlessui/react'
import type { User } from '@supabase/gotrue-js'
import type { GetServerSideProps } from 'next'
import { useTheme } from 'next-themes'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import protectedRoute from 'Utils/protectedRoute'

const LIGHT = 'light'
const DARK = 'dark'

const Settings = ({ user }: { user: User }): ReactElement => {
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="max-w-screen-md mx-auto">
      <div className="mb-5">
        <h1 className="mb-2 text-3xl font-title">Account</h1>
        <p className="text-md">Email: {user.email}</p>
      </div>
      <h1 className="mb-5 text-3xl font-title">Settings</h1>
      <div className="flex items-center">
        <span className="mr-3">Toggle mode</span>
        <Switch
          checked={theme === DARK}
          onChange={() => {
            theme === DARK ? setTheme(LIGHT) : setTheme(DARK)
          }}
          className={`${theme === DARK ? 'bg-primaryDark' : 'bg-dark'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Toggle mode</span>
          <span
            aria-hidden="true"
            className={`${theme === DARK ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (context) => {
  return protectedRoute(context)
}

export default Settings
