import type { ReactElement, ReactNode } from 'react'

export const Section = ({ children }: { children: ReactNode }): ReactElement => {
  return <div className="mt-10">{children}</div>
}

const Title = ({ children }: { children: ReactNode }): ReactElement => (
  <h2 className="mb-5 px-4 text-xl text-white md:px-6">{children}</h2>
)

Section.Title = Title
