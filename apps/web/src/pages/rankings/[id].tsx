import { track as PanelbearTrack } from '@panelbear/panelbear-js'
import type { Ranking } from '@prisma/client'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import type { ReactElement } from 'react'

import type { RankingWithTournamentTeams } from '@lpr/data'
import type { RANKING_VALUES } from '@lpr/types'
import { Button, Team, Title } from '@lpr/ui'

import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE } from 'Utils/constants'
import { supabase } from 'Utils/supabase'

const ViewRanking = ({
  ranking,
  isEditMode
}: {
  ranking: RankingWithTournamentTeams
  isEditMode: boolean
}): ReactElement => {
  const copyRanking = Object.assign({}, ranking)

  const updateRanking = async () => {
    try {
      const { data } = await apiInstance.patch<Ranking>(`/rankings/${copyRanking.id}`, {
        ranking: copyRanking
      })
      const updatedRanking = data
      PanelbearTrack('UpdateRanking')
      return updatedRanking
    } catch (error) {
      return error
    }
  }

  const onUpdate = (value: RANKING_VALUES, playerId: number, teamId: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const team = copyRanking.data.find((t) => t.id === teamId)

    const player = team?.players.find((p) => p.id === playerId)

    if (player) {
      player.value = value
    }

    return
  }

  return (
    <div className="max-w-screen-xl pt-10 mx-auto">
      <Head>
        <title>{`${ranking.tournament.region} - ${DEFAULT_TITLE}`}</title>
        <meta property="og:image" content={ranking?.tournament?.logo} key="og:image" />
        <meta property="og:image:secure_url" content={ranking?.tournament?.logo} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={`${ranking.tournament.region} logo`} />
      </Head>
      <div className="flex justify-center items-center mb-10">
        <Image
          src={ranking.tournament.logo}
          alt={`${ranking.tournament.region} logo`}
          height={60}
          width={60}
          id={`${ranking.tournament.region}_${ranking.tournament.event}_${ranking.tournament.year}`}
          placeholder="blur"
          blurDataURL={ranking.tournament.logo_base64}
        />
        <Title tag="h1" className="capitalize">
          {`${ranking.tournament.region} ${ranking.tournament.event} - ${ranking.tournament.year}`}
        </Title>
      </div>
      <div className="grid gap-10 mx-auto sm:grid-cols-2 md:grid-cols-3">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        {copyRanking.data.map(({ id: teamId, logo, name, players, logo_base64 }) => (
          <Team
            onUpdate={(value, playerId) => {
              onUpdate(value, playerId, teamId)
            }}
            key={teamId}
            id={teamId}
            logo={logo}
            logo_base64={logo_base64}
            disabled={!isEditMode}
            name={name}
            players={players}
          />
        ))}
      </div>
      {isEditMode ? (
        <div className="flex justify-center m-6">
          <Button
            onClick={updateRanking}
          >{`Update my ${ranking.tournament.region} power ranking`}</Button>
        </div>
      ) : null}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)

  const {
    params: { id },
    query: { edit }
  } = context

  const { data } = await apiInstance.get<RankingWithTournamentTeams>(`/rankings/${id}`)

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ranking: data,
      isEditMode: edit !== undefined && user?.id === data.userId
    }
  }
}

export default ViewRanking
