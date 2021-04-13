import Link from 'next/link'

type Props = {
  children: React.ReactNode
  onClick?: () => unknown
  href?: string
}

const Button: React.FC<Props> = ({ children, onClick, href }) => {
  const className = 'p-4 uppercase border-2 border-primary'

  if (href) {
    return (
      <Link href={href}>
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
