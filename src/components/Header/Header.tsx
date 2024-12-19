import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button } from '@/components/Button'
import { useLogin } from '@/hooks/useLogin'
import { ROUTES } from '@/utils/constants'

import XIcon from '../../svgs/x.svg'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps): ReactNode {
  const handleLogin = useLogin()

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center px-4 pt-6  md:px-6">
      <div className="mx-auto flex flex-1 items-center justify-between p-3 md:flex-row md:p-5">
        <nav>
          <ul className="flex items-center gap-4">
            <li className="pr-10">
              <Link
                href={ROUTES.HOME}
                prefetch={false}
                className="text-center font-bold text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="mr-2 h-10 w-10"
                    aria-hidden="true"
                  >
                    <rect
                      width="100"
                      height="100"
                      fill="transparent"
                      rx="10"
                      ry="10"
                    />
                    <rect
                      x="10"
                      y="10"
                      width="80"
                      height="20"
                      fill="#fbbf24"
                      rx="5"
                      ry="5"
                    />
                    <rect
                      x="10"
                      y="40"
                      width="60"
                      height="20"
                      fill="#a3e635"
                      rx="5"
                      ry="5"
                    />
                    <rect
                      x="10"
                      y="70"
                      width="40"
                      height="20"
                      fill="#ef4444"
                      rx="5"
                      ry="5"
                    />
                  </svg>
                  <div className="flex flex-col items-start -space-y-2">
                    <span className="font-sans text-5xl">LoL</span>
                    <span className="font-sans text-3xl">TierList</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link href="/#features" className="text-lg font-bold text-white">
                Features
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href={ROUTES.TOURNAMENTS}
                className="text-lg font-bold text-white"
              >
                Tournaments
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden lg:flex">
        {!user ? (
          <Button
            onClick={handleLogin}
            icon={<XIcon className="ml-2 h-5 w-5 fill-white" />}
          >
            Sign in with
          </Button>
        ) : (
          <Button to={ROUTES.MY_ACCOUNT}>My Tier Lists</Button>
        )}
      </div>
    </header>
  )
}
