import { m } from 'framer-motion'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'

import type { TournamentWithoutTeams } from '@lpr/data'
import { Error, Title, Tournament } from '@lpr/ui'

import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE } from 'Utils/constants'

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

const Tournaments = ({ tournaments }: { tournaments: TournamentWithoutTeams[] }): ReactElement => (
  <div className="max-w-screen-md pt-10 mx-auto text-center">
    <Head>
      <title>{`Tournaments - ${DEFAULT_TITLE}`}</title>
    </Head>
    <div className="mb-10">
      <Title tag="h1">Select a tournament</Title>
    </div>
    {tournaments?.length === 0 ? (
      <Error className="text-center">
        <p>No tournament are available for the moment.</p>
        <p>Please try again later.</p>
      </Error>
    ) : (
      <m.div
        variants={parent}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3"
      >
        {tournaments?.map((tournament) => (
          <m.div variants={stat} key={tournament.pandascore_id}>
            {tournament.active ? (
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
          </m.div>
        ))}
      </m.div>
    )}
  </div>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await apiInstance.get<TournamentWithoutTeams[]>('/tournaments')

  return {
    props: {
      tournaments: data
    }
  }
}

export default Tournaments
