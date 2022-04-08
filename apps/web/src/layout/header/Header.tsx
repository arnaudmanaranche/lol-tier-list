import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { Fragment, useEffect } from 'react'

import { Button } from '@lpr/ui'

import { useSetUser, useUser } from 'Contexts/user'
import { checkUser, handleAuthChange, login, logout } from 'Utils/auth'
import { DEFAULT_TITLE, ROUTES, SUPABASE_EVENTS } from 'Utils/constants'
import supabase from 'Utils/supabase'

import TwitterIcon from '../../svgs/twitter.svg'

const { HOME, TOURNAMENTS, MY_RANKINGS, SETTINGS } = ROUTES

const LINKS = [{ label: 'Tournaments', path: TOURNAMENTS }]
const DROPDOWN_LINKS = [
  { label: 'My Rankings', path: MY_RANKINGS },
  { label: 'My Settings', path: SETTINGS }
]

const Header = (): ReactElement => {
  const user = useUser()
  const setUser = useSetUser()
  const router = useRouter()

  const { pathname } = router

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)

      if (event === SUPABASE_EVENTS.SIGNED_IN) {
        checkUser(session?.user)
        setUser(session?.user)
      }

      if (event === SUPABASE_EVENTS.SIGNED_OUT) {
        setUser(null)
      }
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [setUser])

  const handleLogout = async () => {
    await logout()
    setUser(null)
    router.push(ROUTES.HOME)
  }

  return (
    <header className="text-gray-600 bg-white shadow-md dark:bg-gray-700 shadow-black/10 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href={HOME} prefetch={false}>
          <a className="flex-1 font-bold text-center lg:flex-none text-primary">{DEFAULT_TITLE}</a>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400">
          {LINKS.map(({ label, path }) => (
            <Link href={path} key={label} prefetch={false}>
              <a
                className={clsx(
                  'font-bold p-2 hover:text-primary dark:text-white',
                  clsx(pathname === path && 'text-primary')
                )}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>
        {!user ? (
          <Button onClick={login}>
            Login with Twitter
            <TwitterIcon className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <div className="w-56 text-right">
            <Menu as="div" className="relative inline-block text-left">
              {({ open }) => (
                <>
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm text-black rounded-md dark:text-white bg-opacity-80 bg-primary hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 font-body">
                      My Account
                    </Menu.Button>
                  </div>
                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        {DROPDOWN_LINKS.map(({ label, path }) => (
                          <Menu.Item key={label}>
                            <Link href={path} prefetch={false}>
                              <a className="flex items-center w-full px-2 py-2 text-sm hover:text-primary">
                                {label}
                              </a>
                            </Link>
                          </Menu.Item>
                        ))}
                      </div>
                      <div className="px-1 py-1">
                        <Menu.Item>
                          <button
                            className="flex items-center w-full px-2 py-2 text-sm hover:text-primary"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
