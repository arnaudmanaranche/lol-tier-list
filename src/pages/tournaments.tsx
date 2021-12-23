import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Error from 'Components/Error'
import Tournament from 'Components/Tournament'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import protectedRoute from 'Utils/protectedRoute'
import { TOURNAMENT } from 'Utils/types'

type PROPS = {
  tournaments: TOURNAMENT[]
}

const Tournaments: React.FC<PROPS> = ({ tournaments }) => (
  <div className="max-w-screen-md mx-auto">
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
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
        {tournaments?.map((tournament) => {
          return tournament.status ? (
            <Link key={tournament.id} href={`/ranking/new/${tournament.id}`} prefetch={false}>
              <a>
                <Tournament {...tournament} />
              </a>
            </Link>
          ) : (
            <div className="opacity-50 cursor-not-allowed" key={tournament.id}>
              <Tournament {...tournament} />
            </div>
          )
        })}
      </div>
    )}
  </div>
)

export const getServerSideProps: GetServerSideProps = (context) =>
  protectedRoute(context, async () => {
    const tournaments = await prisma.tournament.findMany()

    return { tournaments }
  })

export default Tournaments
