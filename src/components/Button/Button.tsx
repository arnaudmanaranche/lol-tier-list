import Link from 'next/link'

type Props = {
  children: React.ReactNode
  onClick?: () => unknown
  href?: string
}

const Button: React.FC<Props> = ({ children, onClick, href }) => {
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
