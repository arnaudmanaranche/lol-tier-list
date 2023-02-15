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
    'flex items-center justify-center px-4 py-2 text-white border-brightGray hover:border-white transition-colors border-[1px] backdrop-opacity-10 backdrop-invert bg-charcoal rounded-md'

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
