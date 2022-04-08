import { motion } from 'framer-motion'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'

import type { TOURNAMENT } from '@lpr/types'
import { Error, Tournament } from '@lpr/ui'

import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'

const parent = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const stat = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const Tournaments = ({ tournaments }: { tournaments: TOURNAMENT[] }): ReactElement => (
  <div className="max-w-screen-md pt-10 mx-auto">
    <Head>
      <title>{`Tournaments - ${DEFAULT_TITLE}`}</title>
    </Head>
    <div className="m-auto mb-10 prose lg:prose-xl">
      <h1 className="text-center dark:text-white">Select a tournament</h1>
    </div>
    {tournaments?.length === 0 ? (
      <Error className="text-center">
        <p>No tournament are available for the moment.</p>
        <p>Please try again later.</p>
      </Error>
    ) : (
      <motion.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-10 md:grid-cols-3"
      >
        {tournaments?.map((tournament) => (
          <motion.div variants={stat} key={tournament.pandascoreId}>
            {tournament.status ? (
              <Link href={`/ranking/new/${tournament.id}`} prefetch={false}>
                <a>
                  <Tournament {...tournament} />
                </a>
              </Link>
            ) : (
              <div className="opacity-50 cursor-not-allowed">
                <Tournament {...tournament} />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
)

export const getStaticProps: GetStaticProps = async () => {
  const tournaments = await prisma.tournament.findMany({
    select: {
      teams: false,
      id: true,
      name: true,
      pandascoreId: true,
      status: true,
      logo: true,
      base64: true,
      year: true
    }
  })

  return {
    props: {
      tournaments
    }
  }
}

export default Tournaments
