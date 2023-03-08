import { m } from 'framer-motion'
// import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'

import type { TournamentWithoutTeams } from '@lpr/data'
import { PageHeaderWrapper, Title, Tournament } from '@lpr/ui'

// import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE } from 'Utils/constants'
import { parent, stat } from 'Utils/framerMotion'

const TournamentsListPage = ({
  tournaments = []
}: {
  tournaments: TournamentWithoutTeams[]
}): ReactElement => (
  <>
    <Head>
      <title>{`Tournaments - ${DEFAULT_TITLE}`}</title>
    </Head>
    <PageHeaderWrapper>
      <Title>Select a tournament</Title>
    </PageHeaderWrapper>
    <m.div
      variants={parent}
      initial="hidden"
      animate="show"
      className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4"
    >
      {tournaments?.map((tournament) => (
        <m.div variants={stat} key={tournament.pandascore_id}>
          {tournament.active ? (
            <Link href={`/tournaments/${tournament.id}`} prefetch={false}>
              <Tournament {...tournament} />
            </Link>
          ) : (
            <div className="cursor-not-allowed opacity-50">
              <Tournament {...tournament} />
            </div>
          )}
        </m.div>
      ))}
    </m.div>
  </>
)

// export const getStaticProps: GetStaticProps = async () => {
//   const { data } = await apiInstance.get<TournamentWithoutTeams[]>('/tournaments')

//   return {
//     props: {
//       tournaments: data
//     }
//   }
// }

export default TournamentsListPage
