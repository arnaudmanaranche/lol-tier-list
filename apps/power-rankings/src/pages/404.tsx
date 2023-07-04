import type { ReactElement } from 'react'

import { Button, PageHeaderWrapper, Title } from '@prodigy/ui'

import { ROUTES } from 'Utils/constants'

const Page404 = (): ReactElement => {
  return (
    <>
      <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
      <PageHeaderWrapper>
        <Title>Page not found</Title>
        <div className="mt-8 max-w-lg space-y-6 text-lg leading-[1.4] text-gray-300 md:max-w-xl lg:text-xl">
          <p className="mb-10">
            You found something that used to exist, or you typed something wrong. Try that URL again
            or return home.
          </p>
        </div>
        <div className="mt-10 flex">
          <Button to={ROUTES.HOME}>Return to home</Button>
        </div>
      </PageHeaderWrapper>
    </>
  )
}

export default Page404
