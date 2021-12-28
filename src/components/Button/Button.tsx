import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'

const Button = ({
  children,
  onClick,
  href
}: {
  children: ReactNode
  onClick?: () => unknown
  href?: string
}): ReactElement => {
  const className =
    'flex items-center justify-center p-4 text-center text-black rounded font-body bg-primary hover:bg-primaryDark'

  if (href) {
    return (
      <Link href={href} prefetch={false}>
        <a className={className}>{children}</a>
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

export default Button
