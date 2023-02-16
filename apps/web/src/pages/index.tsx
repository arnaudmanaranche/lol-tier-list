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
      <div className="absolute inset-0 -top-[90px] -z-10 bgGradient opacity-20 blur-3xl" />
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
          <Link href={ROUTES.TOURNAMENTS} className="flex items-center w-fit">
            <span>See tournaments</span>
            <ArrowTopRightOnSquareIcon className="ml-2 h-5 w-5 text-white" />
          </Link>
        </div>
      </PageHeaderWrapper>
      <div className="mx-auto max-w-7xl px-4 md:px-6 mt-20">
        <span className="rounded-full text-lg font-semibold text-white">Supported regions</span>
        <m.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="max-w-7xl pt-6 pb-20 grid lg:grid-cols-5 md:gap-8 grid-cols-2 gap-4"
        >
          {SUPPORTED_REGIONS.map((region) => (
            <m.div
              variants={stat}
              key={region}
              className="flex justify-center rounded-lg p-10 border-white/20 transition-colors border-[1px] backdrop-opacity-10 backdrop-invert bg-white/5"
              tabIndex={0}
            >
              <Image
                src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.in/storage/v1/object/public/${region}/logo.png`}
                alt={`${region} logo`}
                height={80}
                width={80}
              />
            </m.div>
          ))}
        </m.div>
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 justify-center flex">
        <div className="flex flex-col md:flex-row items-center text-white">
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
