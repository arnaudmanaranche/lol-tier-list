import type { ReactElement, ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
}

export const PageHeaderWrapper = ({ children }: TitleProps): ReactElement => {
  return (
    <div className="mt-20 mb-10 border-white/5 md:mt-64 lg:my-28 lg:border-y lg:py-2">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">{children}</div>
    </div>
  )
}
