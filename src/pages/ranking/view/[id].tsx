import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Team from 'Components/Team'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import { RANKING } from 'Utils/types'

type Props = {
  ranking: RANKING
}

const ViewRanking: React.FC<Props> = ({ ranking }) => (
  <div className="max-w-screen-xl mx-auto">
    <Head>
      <title>{`${ranking?.tournament?.name} - ${DEFAULT_TITLE}`}</title>
      <meta property="og:image" content={ranking?.tournament?.logo} key="og:image" />
      <meta property="og:image:secure_url" content={ranking?.tournament?.logo} />
      <meta property="og:image:width" content="200" />
      <meta property="og:image:height" content="200" />
      <meta property="og:image:alt" content={`${ranking?.tournament?.name} logo`} />
    </Head>
    <div className="m-auto mb-10 prose lg:prose-xl">
      <h1 className="flex items-center justify-center mb-4 capitalize">
        <Image
          src={ranking.tournament.logo}
          alt={`${ranking?.tournament?.name} logo`}
          height={60}
          width={60}
          id={ranking?.tournament?.name}
          onLoadingComplete={() => {
            const img = document.getElementById(ranking?.tournament?.name)

            img.classList.add('imageIsLoaded')
          }}
          placeholder="blur"
          blurDataURL={ranking?.tournament?.base64}
          className="image"
        />
        <p>{ranking.tournament.name}</p>
      </h1>
    </div>
    <div className="grid gap-10 mx-auto sm:grid-cols-2 md:grid-cols-3">
      {ranking?.data?.map(({ id: teamId, logo, name, players, base64 }) => (
        <Team
          onUpdate={() => null}
          key={teamId}
          id={teamId}
          logo={logo}
          base64={base64}
          disabled
          name={name}
          players={players}
        />
      ))}
    </div>
  </div>
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
