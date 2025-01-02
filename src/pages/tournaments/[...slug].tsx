import type { User } from '@supabase/supabase-js'
import { createClient } from 'clients/supabase/server-props'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type {
  Ranking,
  Team as TeamInterface,
  TIER_LIST_VALUES,
  Tournament
} from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { RankingCreatedModal } from '@/components/modals/TierListCreated.Modal'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Team } from '@/components/Team'
import { Title } from '@/components/Title'
import { API_ENDPOINT, apiInstance } from '@/utils/api'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { DEFAULT_TITLE, ROUTES, WEBSITE_URL } from '@/utils/constants'
import { tournamentEventModifier } from '@/utils/tournamentEventModifier'

const Modal = dynamic(
  () => import('../../components/Modal').then((mod) => mod.Modal),
  {
    ssr: false
  }
)

interface PageProps {
  tournament: Tournament
  user: User
}

function Metadata({ tournament }: { tournament: Tournament }): ReactNode {
  const TITLE = `${DEFAULT_TITLE} - ${tournament.region.toUpperCase()} ${tournament.year} ${capitalizeFirstLetter(tournament.event)}`
  const DESCRIPTION = `Create your own tier list for the ${tournament.region.toUpperCase()} ${capitalizeFirstLetter(tournament.event)} ${tournament.year} tournament and share it with your friends`
  const IMAGE = `${API_ENDPOINT}/og?path=tournaments/${tournament.region}/${tournament.year}/${tournament.event}`

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
  tournament,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const { region, event, year, logo, teams, id } = tournament
  const [ranking, setRanking] = useState<TeamInterface[] | null>(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isRankingCreation, setIsRankingCreation] = useState(false)

  const username = user?.identities?.[0]?.identity_data
    ?.preferred_username as string

  const handleToggleModal = () => {
    if (isModalOpen) {
      router.replace(`/tier-list/${region}/${year}/${event}/${username}?edit`)
    } else {
      setModalOpen((value) => !value)
    }
  }

  const handleUpdateValue = (
    value: TIER_LIST_VALUES,
    teamId: number,
    playerId?: number
  ) => {
    if (playerId) {
      const team = ranking?.find(({ id }) => id === teamId)

      if (team) {
        const player = team.players.find(({ id }) => id === playerId)

        if (player) {
          player.value = value
        } else {
          toast.error('An error occured during the player value selection.')
        }
      }
    } else {
      const team = ranking?.find(({ id }) => id === teamId)

      if (team) {
        team.teamValue = value
      } else {
        toast.error('An error occured during the team value selection.')
      }
    }

    window.localStorage.setItem(tournament.id, JSON.stringify(ranking))
  }

  const handleOnCreateTierList = async () => {
    setIsRankingCreation(true)
    try {
      await apiInstance.post<Ranking>('/tier-list', {
        ranking,
        tournamentId: id,
        userId: user?.id
      })
      handleToggleModal()
      window.localStorage.removeItem(tournament.id)
    } catch {
      toast.error('An error occured during the tier list creation.')
    } finally {
      setIsRankingCreation(false)
    }
  }

  useEffect(() => {
    const hasUnsavedRanking = window.localStorage.getItem(tournament.id)

    if (hasUnsavedRanking) {
      setRanking(JSON.parse(hasUnsavedRanking))
    } else {
      setRanking(teams as unknown as TeamInterface[])
    }
  }, [teams, tournament.id])

  return (
    <>
      <Metadata tournament={tournament} />
      <Header user={user} />
      <PageHeaderWrapper>
        <div className="mb-8">
          <Link
            href={ROUTES.TOURNAMENTS}
            className="text-white transition-colors hover:text-opacity-80 hover:underline"
          >
            Tournaments
          </Link>
          <span className="mx-2 text-white text-opacity-60">
            / {region.toUpperCase()} {year}{' '}
            {capitalizeFirstLetter(tournamentEventModifier(event))}
          </span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Image
            src={logo}
            alt={`This is the logo of ${region} for the ${year} ${event} tournament`}
            height={120}
            width={120}
            className="rounded-lg shadow-lg"
            id={`${region}_${event}_${year}`}
          />
          <Title>{`${region.toUpperCase()} ${year} ${capitalizeFirstLetter(tournamentEventModifier(event))}`}</Title>
        </div>
      </PageHeaderWrapper>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="grid gap-6 rounded-xl bg-gray-900/50 p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-3">
          {(ranking as TeamInterface[])?.map(
            ({ id: teamId, logo, name, players }) => (
              <Team
                key={teamId}
                id={teamId}
                disabled={false}
                logo={logo}
                name={name}
                players={players}
                onUpdate={(value, playerId) => {
                  handleUpdateValue(value, teamId, playerId)
                }}
                teamValue=""
              />
            )
          )}
        </div>
      </div>
      <div className="my-20 flex flex-col items-center gap-4">
        <Button isDisabled={isRankingCreation} onClick={handleOnCreateTierList}>
          {isRankingCreation ? 'Creating...' : 'Create my tier list'}
        </Button>
      </div>
      <Modal
        title="Your tier list was created!"
        toggleModal={handleToggleModal}
        isOpen={isModalOpen}
      >
        <RankingCreatedModal
          year={year}
          event={event}
          username={username}
          region={region}
        />
      </Modal>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const { params } = context

  if (!params || !params.slug) {
    return {
      notFound: true
    }
  }

  const supabase = createClient(context)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { data: userCanAccess } = await supabase.rpc(
    'can_access_to_tournament',
    {
      p_user_id: user.id,
      p_event: params.slug[2],
      p_region: params.slug[0],
      p_year: params.slug[1] as unknown as number
    }
  )

  const username = user.identities?.[0].identity_data
    ?.preferred_username as string

  if (!userCanAccess) {
    return {
      redirect: {
        destination: `/tier-list/${params.slug[0]}/${params.slug[1]}/${params.slug[2]}/${username}`,
        permanent: false
      }
    }
  }

  const { data: tournament } = await apiInstance.get<Tournament>(
    `/tournaments/${(params.slug as string[]).join('/')}`
  )

  if (!tournament.active) {
    return {
      redirect: {
        destination: '/tournaments',
        permanent: false
      }
    }
  }

  return {
    props: {
      tournament,
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
