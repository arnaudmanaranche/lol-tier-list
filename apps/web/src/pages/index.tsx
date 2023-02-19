import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { m } from 'framer-motion'
import Image from 'next/legacy/image'
import Link from 'next/link'
import type { ReactElement } from 'react'

import { PageHeaderWrapper, Title } from '@lpr/ui'

import { ROUTES, SUPPORTED_REGIONS } from 'Utils/constants'
import { parent, stat } from 'Utils/framerMotion'

const HomePage = (): ReactElement => {
  return (
    <>
      <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
      <PageHeaderWrapper>
        <Title>
          The ultimate destination
          <br />
          for League of Legends enthusiasts.
        </Title>
        <div className="mt-8 max-w-lg space-y-6 text-lg leading-[1.4] text-gray-300 md:max-w-xl lg:text-xl">
          <p className="mb-10">
            Dedicated platform to create and share your own rankings of yours favorites tournaments.
            Join now.
          </p>
          <Link href={ROUTES.TOURNAMENTS} className="flex w-fit items-center">
            <span>See tournaments</span>
            <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 text-white" />
          </Link>
        </div>
      </PageHeaderWrapper>
      <div className="mx-auto mt-20 max-w-7xl px-4 md:px-6">
        <span className="rounded-full text-lg font-semibold text-white">Supported regions</span>
        <m.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="grid max-w-7xl grid-cols-2 gap-4 pt-6 pb-20 md:gap-8 lg:grid-cols-5"
        >
          {SUPPORTED_REGIONS.map((region) => (
            <m.div
              variants={stat}
              key={region}
              className="flex justify-center rounded-lg border-[1px] border-white/20 bg-white/5 p-10 backdrop-invert backdrop-opacity-10 transition-colors"
              tabIndex={0}
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/${region}/logo.png`}
                alt={`${region} logo`}
                height={80}
                width={80}
              />
            </m.div>
          ))}
        </m.div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-center px-4 md:px-6">
        <div className="flex flex-col items-center text-white md:flex-row">
          <p>Data provided by</p>
          <Link
            href="https://pandascore.co/"
            target="_blank"
            rel="noreferrer noopener"
            className="pb-1"
          >
            <Image
              src="/pandascore.png"
              alt="PandaScore logo"
              layout="fixed"
              height="50"
              width="200"
            />
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
