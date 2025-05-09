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
  Player,
  Team as TeamInterface,
  TIER_LIST_VALUES,
  TierListWithTournament,
  Tournament,
  User as UserInterface
} from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { Modal } from '@/components/Modal'
import { TierListCreatedModal } from '@/components/modals/TierListCreated.Modal'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Team } from '@/components/Team'
import { Title } from '@/components/Title'
import { API_ENDPOINT, apiInstance } from '@/utils/api'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { DEFAULT_TITLE, ROUTES, WEBSITE_URL } from '@/utils/constants'
import { tournamentEventModifier } from '@/utils/tournamentEventModifier'

interface TierListWithUser extends TierListWithTournament {
  user: UserInterface
}

interface PageProps {
  tierList: TierListWithUser
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
        content={`${WEBSITE_URL}/tier-list/${tournament.region}/${tournament.year}/${tournament.event}/${username}`}
      />
    </Head>
  )
}

const Page = ({
  tierList,
  isEditMode,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const [isTierListCreation, setIsTierListCreation] = useState(false)
  const [localTierList, setLocalTierList] = useState(() => ({
    ...tierList,
    data: tierList?.data?.map((team: TeamInterface) => ({
      ...team,
      players: team.players.map((player: Player) => ({ ...player }))
    }))
  }))
  const [isModalOpen, setModalOpen] = useState(false)

  const onSubmitUpdatedTierList = async () => {
    setIsTierListCreation(true)
    try {
      await apiInstance.patch<TierListWithTournament>(
        `/tier-list/by-id/${localTierList.id}`,
        {
          tierList: localTierList
        }
      )
      setModalOpen(true)
    } catch {
      toast.error('An error occured during the tier list update.')
    } finally {
      setIsTierListCreation(false)
    }
  }

  const handleToggleModal = () => {
    setModalOpen((value) => !value)
  }

  const handleUpdateTierList = (
    value: TIER_LIST_VALUES,
    teamId: number,
    playerId?: number
  ) => {
    setLocalTierList((prev) => {
      const updatedTeams = prev.data.map((team: TeamInterface) => {
        if (team.id === teamId) {
          const updatedPlayers = team.players.map((player: Player) => {
            if (player.id === playerId) {
              return { ...player, value }
            }
            return player
          })

          return { ...team, players: updatedPlayers }
        }
        return team
      })

      return { ...prev, data: updatedTeams }
    })
  }

  return (
    <>
      <Metadata
        tournament={tierList.tournament}
        username={tierList.user.username}
      />
      <Header user={user} />
      <PageHeaderWrapper>
        <div className="mb-8">
          <Link
            href={ROUTES.TIER_LISTS}
            className="text-white transition-colors hover:text-opacity-80 hover:underline"
          >
            Tier Lists
          </Link>
          <span className="mx-2 text-white text-opacity-60">
            / {tierList.tournament.region.toUpperCase()}{' '}
            {tierList.tournament.year}{' '}
            {capitalizeFirstLetter(
              tournamentEventModifier(tierList.tournament.event)
            )}
          </span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Image
            src={tierList.tournament.logo}
            alt={`${tierList.tournament.region} logo`}
            height={100}
            width={100}
            className="rounded-lg shadow-lg"
            id={`${tierList.tournament.region}_${tierList.tournament.event}_${tierList.tournament.year}`}
          />
        </div>
        <Title>
          {`@${tierList.user.username}'s tier list ${tierList.tournament.region.toUpperCase()} ${capitalizeFirstLetter(tournamentEventModifier(tierList.tournament.event))} - ${
            tierList.tournament.year
          }`}
        </Title>
      </PageHeaderWrapper>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div
          className="grid gap-6 rounded-xl bg-gray-900/50 p-6 shadow-xl sm:grid-cols-2 lg:grid-cols-3"
          id="tier-list"
        >
          {(localTierList?.data as unknown as TeamInterface[])?.map(
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
            isDisabled={isTierListCreation}
            onClick={onSubmitUpdatedTierList}
            className="min-w-[200px] shadow-lg transition-shadow hover:shadow-xl"
          >
            Update my tier list
          </Button>
        </div>
      ) : null}
      <Modal
        title="Your tier list was updated!"
        toggleModal={handleToggleModal}
        isOpen={isModalOpen}
      >
        <TierListCreatedModal
          year={tierList.tournament.year}
          event={tierList.tournament.event}
          username={tierList.user.username}
          region={tierList.tournament.region}
        />
      </Modal>
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
      tierList: data,
      isEditMode: edit !== undefined && user?.id === data.user_id,
      user,
      username: data.user.username
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
