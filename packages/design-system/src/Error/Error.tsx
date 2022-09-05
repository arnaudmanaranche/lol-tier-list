import type { ReactElement, ReactNode } from 'react'

export interface ErrorProps {
  className?: string
  children?: ReactNode
}

export const Error = ({ className, children }: ErrorProps): ReactElement => (
  <div className={className}>{children}</div>
)
