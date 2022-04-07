import type { ReactElement, ReactNode } from 'react'

const Error = ({
  className,
  children
}: {
  className?: string
  children?: ReactNode
}): ReactElement => <div className={className}>{children}</div>

export default Error
