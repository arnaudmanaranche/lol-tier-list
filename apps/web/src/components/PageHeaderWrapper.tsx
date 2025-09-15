import type { ReactElement, ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

export const PageHeaderWrapper = ({ children }: TitleProps): ReactElement => {
  return (
    <div className="mb-10 mt-16 border-white/5 lg:border-y lg:py-2">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">{children}</div>
    </div>
  )
}
