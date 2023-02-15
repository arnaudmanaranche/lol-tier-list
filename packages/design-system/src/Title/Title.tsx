import type { ReactElement, ReactNode } from 'react'

export interface TitleProps {
  children: ReactNode
}

export const Title = ({ children }: TitleProps): ReactElement => {
  return (
    <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-[40px] md:leading-[1.1] lg:col-span-2 lg:text-[64px] lg:leading-[1.125em] lg:tracking-[-0.0375em]">
      {children}
    </h1>
  )
}
