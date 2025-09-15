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
  className?: string
}

export const Button = ({
  children,
  onClick,
  href,
  to,
  isDisabled,
  icon,
  type,
  className: cN
}: ButtonProps): ReactNode => {
  const className = clsx(
    'flex items-center justify-center rounded-md px-6 py-2 text-white transition-all hover:border-white',
    type === 'danger'
      ? 'bg-red-500 hover:bg-red-600'
      : 'bg-[#6036a2] hover:bg-[#472878]',
    isDisabled && 'pointer-events-none cursor-not-allowed',
    cN
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
      <Link
        href={to}
        prefetch={false}
        className={className}
        aria-disabled={isDisabled}
      >
        {children}
      </Link>
    )
  } else {
    return (
      <button
        onClick={onClick}
        className={clsx(className)}
        disabled={isDisabled}
      >
        {children}
        {icon ?? ''}
      </button>
    )
  }
}
