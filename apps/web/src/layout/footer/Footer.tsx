import Link from 'next/link'
import type { ReactElement } from 'react'

import { ROUTES } from 'Utils/constants'

export const Footer = (): ReactElement => (
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
)
