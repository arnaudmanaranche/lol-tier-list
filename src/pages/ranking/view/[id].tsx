import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import type { ReactElement } from 'react'

import Button from 'Components/Button'
import Team from 'Components/Team'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import supabase from 'Utils/supabase'
import type { RANKING, RANKING_VALUES } from 'Utils/types'

const ViewRanking = ({
  ranking,
  isEditMode
}: {
  ranking: RANKING
  isEditMode: boolean
}): ReactElement => {
  const copyRanking = Object.assign({}, ranking)

  const updateRanking = async () => {
    const newRanking = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ranking })
    }

    try {
      const fetchResponse = await fetch('/api/ranking/update', newRanking)
      const data = await fetchResponse.json()
      return data
    } catch (error) {
      return error
    }
  }

  const onUpdate = (value: RANKING_VALUES, playerId: number, teamId: number) => {
    const team = copyRanking.data.find((t) => t.id === teamId)

    const player = team?.players.find((p) => p.id === playerId)

    if (player) {
      player.value = value
    }

    return
  }

  return (
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
        {copyRanking?.data?.map(({ id: teamId, logo, name, players, base64 }) => (
          <Team
            onUpdate={(value, playerId) => {
              onUpdate(value, playerId, teamId)
            }}
            key={teamId}
            id={teamId}
            logo={logo}
            base64={base64}
            disabled={!isEditMode}
            name={name}
            players={players}
          />
        ))}
      </div>
      {isEditMode ? (
        <div className="m-6 text-center">
          <Button
            onClick={updateRanking}
          >{`Update my ${ranking.tournament.name} power raking`}</Button>
        </div>
      ) : null}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)

  const { id } = context.params
  const { edit } = context.query

  const ranking = await prisma.ranking.findUnique({
    where: {
      id: id as string
    },
    select: {
      id: true,
      tournamentId: true,
      data: true,
      tournament: {
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
      },
      userId: true
    }
  })

  if (!ranking) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ranking,
      isEditMode: edit !== undefined && user?.id === ranking.userId
    }
  }
}

export default ViewRanking
