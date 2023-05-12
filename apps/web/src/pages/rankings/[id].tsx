import { track as CronitorTrack } from '@cronitorio/cronitor-rum-js'
import type { Ranking } from '@prisma/client'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import type { ReactElement } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'

import type { RankingWithTournamentTeams } from '@lpr/data'
import type { RANKING_VALUES } from '@lpr/types'
import { Button, PageHeaderWrapper, RankingLegend, Team, Title } from '@lpr/ui'

import { API_ENDPOINT, apiInstance } from 'Utils/api'
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter'
import { DEFAULT_TITLE } from 'Utils/constants'

const ViewRankingPage = ({
  ranking,
  isEditMode
}: {
  ranking: RankingWithTournamentTeams
  isEditMode: boolean
}): ReactElement => {
  const [isRankingCreation, setIsRankingCreation] = useState(false)

  const copyRanking = Object.assign({}, ranking)

  const updateRanking = async () => {
    setIsRankingCreation(true)
    try {
      await apiInstance.patch<Ranking>(`/rankings/${copyRanking.id}`, {
        ranking: copyRanking
      })
      toast.success('Your power ranking was successfully updated.')
      CronitorTrack('UpdateRanking')
    } catch (error) {
      toast.error('An error occured during the power ranking update.')
    } finally {
      setIsRankingCreation(false)
    }
  }

  const onUpdate = (value: RANKING_VALUES, playerId: number, teamId: number) => {
    // @ts-expect-error TODO: type Prisma.JsonValue
    const team = copyRanking.data.find((t) => t.id === teamId)

    // @ts-expect-error TODO: type Prisma.JsonValue
    const player = team?.players.find((p) => p.id === playerId)

    if (player) {
      player.value = value
    }

    return
  }

  return (
    <>
      <Head>
        <title>{`${ranking.tournament.region} ${capitalizeFirstLetter(ranking.tournament.event)} ${
          ranking.tournament.year
        } - ${DEFAULT_TITLE}`}</title>
        <meta property="og:image" content={`${API_ENDPOINT}/og?id=${ranking.id}&entity=rankings`} />
        <meta
          property="twitter:image"
          content={`${API_ENDPOINT}/og?id=${ranking.id}&entity=rankings`}
        />
        <meta
          property="og:title"
          content={`${ranking.tournament.region} - ${ranking.tournament.event} - ${ranking.tournament.year}`}
        />
        <meta
          property="og:description"
          content={`Check my ${ranking.tournament.region} ${ranking.tournament.event} ${ranking.tournament.year} own power ranking`}
        />
        <meta name="twitter:site" content="@bearnais_volant" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:secure_url" content={ranking?.tournament?.logo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="360" />
        <meta property="og:image:alt" content={`${ranking.tournament.region} logo`} />
        <meta
          name="description"
          content={`Check my ${ranking.tournament.region} ${ranking.tournament.event} ${ranking.tournament.year} own power ranking`}
        />
        <meta
          property="og:url"
          content={`https://lol-power-ranking.vercel.app/rankings/${ranking.id}`}
        />
      </Head>
      <RankingLegend />
      <PageHeaderWrapper>
        <Image
          src={ranking.tournament.logo}
          alt={`${ranking.tournament.region} logo`}
          height={100}
          width={100}
          id={`${ranking.tournament.region}_${ranking.tournament.event}_${ranking.tournament.year}`}
          placeholder="blur"
          blurDataURL={ranking.tournament.logo_base64}
        />
        <Title>
          {`${ranking.tournament.region} ${capitalizeFirstLetter(ranking.tournament.event)} - ${
            ranking.tournament.year
          }`}
        </Title>
      </PageHeaderWrapper>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
        {/* @ts-expect-error TODO: type Prisma.JsonValue */}
        {copyRanking.data.map(
          // @ts-expect-error TODO: type Prisma.JsonValue
          ({ id: teamId, logo, name, players, logo_base64, value: teamValue }) => (
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
              teamValue={teamValue}
            />
          )
        )}
      </div>
      {isEditMode ? (
        <div className="my-20 flex justify-center">
          <Button
            isDisabled={isRankingCreation}
            onClick={updateRanking}
          >{`Update my ${ranking.tournament.region} power ranking`}</Button>
        </div>
      ) : null}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context)

  const {
    data: { user }
  } = await supabase.auth.getUser()

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

export default ViewRankingPage
