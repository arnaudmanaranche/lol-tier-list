import Head from 'next/head'
import type { ReactNode } from 'react'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Title } from '@/components/Title'
import { ROUTES, WEBSITE_URL } from '@/utils/constants'

const Page = (): ReactNode => {
  return (
    <>
      <Head>
        {/* Image */}
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
      </Head>
      <Header user={null} />
      <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
      <PageHeaderWrapper>
        <Title>Page not found</Title>
        <div className="mt-8 max-w-lg space-y-6 text-lg leading-[1.4] text-gray-300 md:max-w-xl lg:text-xl">
          <p className="mb-10">
            You found something that used to exist, or you typed something
            wrong. Try that URL again or return home.
          </p>
        </div>
        <div className="mt-10 flex">
          <Button to={ROUTES.HOME}>Return to home</Button>
        </div>
      </PageHeaderWrapper>
      <Footer />
    </>
  )
}

export default Page
