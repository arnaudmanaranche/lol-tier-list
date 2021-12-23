import type { ReactElement } from 'react'

const Error = ({
  className,
  children
}: {
  className?: string
  children?: React.ReactNode
}): ReactElement => <div className={className}>{children}</div>

export default Error
