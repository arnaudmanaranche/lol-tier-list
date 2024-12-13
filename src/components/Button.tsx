import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonType = 'default' | 'danger'

interface ButtonProps {
  children: ReactNode
  onClick?: () => unknown
  href?: string
  to?: string
  isDisabled?: boolean
  icon?: ReactNode
  type?: ButtonType
}

export const Button = ({
  children,
  onClick,
  href,
  to,
  isDisabled,
  icon,
  type
}: ButtonProps): ReactNode => {
  const className = clsx(
    'flex items-center justify-center rounded-md bg-blue-500 hover:bg-blue-600 px-6 py-2 text-white backdrop-invert backdrop-opacity-10 transition-colors hover:border-white content',
    type === 'danger' && 'bg-red-500 hover:bg-red-600'
  )

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
      <button
        onClick={onClick}
        className={clsx(
          className,
          isDisabled &&
            'disabled:cursor-not-allowed disabled:border-transparent disabled:hover:border-transparent'
        )}
        disabled={isDisabled}
      >
        {children}
        {icon ?? ''}
      </button>
    )
  }
}
