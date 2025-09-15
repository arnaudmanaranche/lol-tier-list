import type { ReactElement, ReactNode } from 'react'

interface TitleProps {
  children: ReactNode
}

export const Title = ({ children }: TitleProps): ReactElement => {
  return (
    <h1 className="text-center text-3xl font-bold text-white md:text-6xl md:leading-[1.1] lg:col-span-2 lg:text-8xl lg:leading-[1.125em]">
      {children}
    </h1>
  )
}
