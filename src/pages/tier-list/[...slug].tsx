import type { User } from '@supabase/supabase-js'
import { createClient } from 'clients/supabase/server-props'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import type {
  RankingWithTournament,
  Team as TeamInterface,
  TIER_LIST_VALUES,
  Tournament,
  User as UserInterface
} from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { RankingLegend } from '@/components/RankingLegend'
import { Team } from '@/components/Team'
import { Title } from '@/components/Title'
import { API_ENDPOINT, apiInstance } from '@/utils/api'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { DEFAULT_TITLE, ROUTES, WEBSITE_URL } from '@/utils/constants'

interface TierListWithUser extends RankingWithTournament {
  user: UserInterface
}

interface PageProps {
  ranking: TierListWithUser
  isEditMode: boolean
  user: User | null
}

function Metadata({
  tournament,
  username
}: {
  tournament: Tournament
  username: string
}) {
  const TITLE = `${DEFAULT_TITLE} - ${tournament.region.toUpperCase()} ${tournament.year} ${capitalizeFirstLetter(tournament.event)}`
  const DESCRIPTION = `Discover @${username}'s tier list for the ${tournament.region.toUpperCase()} ${capitalizeFirstLetter(tournament.event)} ${tournament.year} tournament. Create your own tier list and share it with your friends`
  const IMAGE = `${API_ENDPOINT}/og?path=tier-list/${tournament.region}/${tournament.year}/${tournament.event}/${username}`

  return (
    <Head>
      {/* Title */}
      <title>{`${TITLE}`}</title>
      <meta property="og:title" content={TITLE} />
      {/* Image */}
      <meta property="og:image" content={IMAGE} />
      <meta property="twitter:image" content={IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="360" />
      {/* Description */}
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="description" content={DESCRIPTION} />
      <meta
        property="og:url"
        content={`${WEBSITE_URL}/tier-list/${tournament.region}/${tournament.event}/${tournament.year}`}
      />
    </Head>
  )
}

const Page = ({
  ranking,
  isEditMode,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const [isRankingCreation, setIsRankingCreation] = useState(false)

  const copyRanking = Object.assign({}, ranking)

  const onSubmitUpdatedTierList = async () => {
    setIsRankingCreation(true)
    try {
      await apiInstance.patch<RankingWithTournament>(
        `/tier-list/by-id/${copyRanking.id}`,
        {
          ranking: copyRanking
        }
      )
      toast.success('Your tier list was successfully updated.')
    } catch {
      toast.error('An error occured during the tier list update.')
    } finally {
      setIsRankingCreation(false)
    }
  }

  const handleUpdateTierList = (
    value: TIER_LIST_VALUES,
    teamId: number,
    playerId?: number
  ) => {
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
      <Metadata
        tournament={ranking.tournament}
        username={ranking.user.username}
      />
      <Header user={user} />
      <RankingLegend />
      <PageHeaderWrapper>
        <div className="mb-8">
          <Link
            href={ROUTES.TOURNAMENTS}
            className="text-white transition-colors hover:text-opacity-80 hover:underline"
          >
            Tournaments
          </Link>
          <span className="mx-2 text-white text-opacity-60">
            / {ranking.tournament.region.toUpperCase()}{' '}
            {ranking.tournament.year}{' '}
            {capitalizeFirstLetter(ranking.tournament.event)}
          </span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Image
            src={ranking.tournament.logo}
            alt={`${ranking.tournament.region} logo`}
            height={100}
            width={100}
            className="rounded-lg shadow-lg"
            id={`${ranking.tournament.region}_${ranking.tournament.event}_${ranking.tournament.year}`}
          />
        </div>
        <Title>
          {`@${ranking.user.username}'s tier list ${ranking.tournament.region.toUpperCase()} ${capitalizeFirstLetter(ranking.tournament.event)} - ${
            ranking.tournament.year
          }`}
        </Title>
      </PageHeaderWrapper>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 rounded-xl bg-gray-900/50 p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-3">
          {(copyRanking?.data as unknown as TeamInterface[])?.map(
            ({ id: teamId, logo, name, players, teamValue }) => (
              <Team
                onUpdate={(value, playerId) => {
                  handleUpdateTierList(value, teamId, playerId)
                }}
                key={teamId}
                id={teamId}
                logo={logo}
                disabled={!isEditMode}
                name={name}
                players={players}
                teamValue={teamValue}
              />
            )
          )}
        </div>
      </div>
      {isEditMode ? (
        <div className="my-20 flex flex-col items-center gap-4">
          <Button
            isDisabled={isRankingCreation}
            onClick={onSubmitUpdatedTierList}
            className="min-w-[200px] shadow-lg transition-shadow hover:shadow-xl"
          >{`Update my ${ranking.tournament.region} tier list`}</Button>
        </div>
      ) : null}
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const supabase = createClient(context)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const {
    params,
    query: { edit }
  } = context

  if (!params || !params.slug) {
    return {
      notFound: true
    }
  }

  const { data } = await apiInstance.get<TierListWithUser>(
    `/tier-list/${(params.slug as string[]).join('/')}`,
    {
      headers: {
        Cookie: context.req.headers?.cookie ?? ''
      }
    }
  )

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      ranking: data,
      isEditMode: edit !== undefined && user?.id === data.user_id,
      user,
      username: data.user.username
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
