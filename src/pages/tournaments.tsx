import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Error from 'Components/Error'
import Tournament from 'Components/Tournament'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import { TOURNAMENT } from 'Utils/types'

type PROPS = {
  tournaments: TOURNAMENT[]
}

const Tournaments: React.FC<PROPS> = ({ tournaments }) => (
  <>
    <Head>
      <title>{`Tournaments - ${DEFAULT_TITLE}`}</title>
    </Head>
    <h1 className="text-center">Select a tournament</h1>
    {tournaments.length === 0 ? (
      <Error className="text-center">
        <p>No tournament are available for the moment.</p>
        <p>Please try again later.</p>
      </Error>
    ) : (
      <div className="grid grid-cols-2 gap-10">
        {tournaments.map((tournament) => {
          return (
            <Link key={tournament.id} href={`/ranking/new/${tournament.id}`}>
              <a>
                <Tournament {...tournament} />
              </a>
            </Link>
          )
        })}
      </div>
    )}
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const tournaments = await prisma.tournament.findMany()

  return {
    props: { tournaments },
    revalidate: 3600
  }
}

export default Tournaments
