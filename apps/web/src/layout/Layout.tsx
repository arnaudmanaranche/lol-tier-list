import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'

import { ROUTES } from 'Utils/constants'

import { Header } from './header'

export const Layout = ({ children }: { children: ReactNode }): ReactElement => (
  <>
    <div className="pointer-events-none absolute inset-0 flex justify-center">
      <div className="hidden h-full w-full max-w-7xl grid-cols-3 gap-3.5 px-4 lg:grid">
        <div className="border-x border-white/5"></div>
        <div className="border-x border-white/5"></div>
        <div className="border-x border-white/5"></div>
      </div>
    </div>
    <Header />
    <main className="relative min-h-screen">{children}</main>
    <footer className="border-t border-brightGray pt-10 pb-12">
      <div className="mx-auto flex max-w-7xl flex-col px-4 text-white md:flex-row md:px-6">
        <span className="order-2 mt-4 text-center">Copyright © 2023</span>
        <ul className="flex flex-grow flex-col items-center justify-end text-center md:order-2 md:flex-row md:space-x-5">
          <li>
            <Link href={ROUTES.PRIVACY}>Privacy</Link>
          </li>
        </ul>
      </div>
    </footer>
  </>
)
