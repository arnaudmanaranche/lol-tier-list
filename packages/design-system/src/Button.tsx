import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'

export interface ButtonProps {
  children: ReactNode
  onClick?: () => unknown
  href?: string
  to?: string
}

export const Button = ({ children, onClick, href, to }: ButtonProps): ReactElement => {
  const className =
    'flex items-center justify-center rounded-md border-[1px] border-brightGray bg-charcoal px-4 py-2 text-white backdrop-invert backdrop-opacity-10 transition-colors hover:border-white'

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
        prefetch={false}
      >
        {children}
      </Link>
    )
  } else if (to) {
    return (
      <Link href={to} prefetch={false} className={className}>
        {children}
      </Link>
    )
  } else {
    return (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    )
  }
}
