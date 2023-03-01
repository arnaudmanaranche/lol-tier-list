import type { ReactElement, ReactNode } from 'react'

import { Footer } from './footer/Footer'
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
    <Footer />
  </>
)
