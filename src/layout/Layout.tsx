import type { ReactElement, ReactNode } from 'react'

import Footer from './footer'
import Header from './header'

const Layout = ({ children }: { children: ReactNode }): ReactElement => (
  <div className="bg-slate-100 dark:bg-gray-500">
    <Header />
    <div className="flex flex-col w-full min-h-screen">
      <main className="my-10 grow">{children}</main>
    </div>
    <Footer />
  </div>
)

export default Layout
