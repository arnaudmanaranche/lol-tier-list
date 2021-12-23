import Link from 'next/link'
import type { ReactElement } from 'react'

const Button = ({
  children,
  onClick,
  href
}: {
  children: React.ReactNode
  onClick?: () => unknown
  href?: string
}): ReactElement => {
  const className = 'p-4 text-center uppercase transition rounded bg-primary hover:bg-primaryDark'

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
