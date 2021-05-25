import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { DEFAULT_TITLE, ROUTES } from 'Utils/constants'

const { HOME, TOURNAMENTS } = ROUTES

const LINKS = [{ label: 'Tournaments', path: TOURNAMENTS }]

const Header: React.FC = () => {
  const router = useRouter()

  const { pathname } = router

  return (
    <header className="text-gray-600 body-font">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link href={HOME} prefetch={false}>
          <a className="flex-1 font-bold text-center lg:flex-none text-primary">{DEFAULT_TITLE}</a>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400">
          {LINKS.map(({ label, path }) => (
            <Link href={path} key={label} prefetch={false}>
              <a
                className={clsx(
                  'font-bold p-2 hover:text-primary transition ease duration-200	',
                  clsx(pathname === path && 'text-primary')
                )}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
