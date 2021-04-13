import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { DEFAULT_TITLE, ROUTES } from 'Utils/constants'

import Menu from '../../svgs/menu.svg'

const { HOME, TOURNAMENTS } = ROUTES

const LINKS = [{ label: 'Tournaments', path: TOURNAMENTS }]

const Header: React.FC = () => {
  const router = useRouter()

  const { pathname } = router

  return (
    <header className="flex items-center p-5 bg-white header-shadow">
      <Menu className="inline h-7 lg:hidden" />
      <Link href={HOME}>
        <a className="flex-1 font-bold text-center lg:flex-none text-primary">{DEFAULT_TITLE}</a>
      </Link>
      <nav className="items-center hidden h-full lg:flex">
        {LINKS.map(({ label, path }) => (
          <Link href={path} key={label}>
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
    </header>
  )
}

export default Header
