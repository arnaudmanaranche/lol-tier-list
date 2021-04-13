import { GetServerSideProps } from 'next'
import Head from 'next/head'

import Team from 'Components/Team'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import { RANKING } from 'Utils/types'

type Props = {
  ranking: RANKING
}

const ViewRanking: React.FC<Props> = ({ ranking }) => (
  <>
    <Head>
      <title>{`${ranking?.tournament?.name} - ${DEFAULT_TITLE}`}</title>
      <meta property="og:image" content={ranking?.tournament?.logo} key="og:image" />
      <meta property="og:image:secure_url" content={ranking?.tournament?.logo} />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={`${ranking?.tournament?.name} logo`} />
    </Head>
    <div className="">
      {ranking?.data?.map(({ id: teamId, logo, name, players }) => (
        <Team
          onUpdate={() => null}
          key={teamId}
          id={teamId}
          logo={logo}
          disabled
          name={name}
          players={players}
        />
      ))}
    </div>
  </>
)

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params

  const ranking = await prisma.ranking.findUnique({
    where: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id
    },
    include: { tournament: true }
  })

  if (!ranking) {
    return {
      notFound: true
    }
  }

  return {
    props: { ranking }
  }
}

export default ViewRanking
