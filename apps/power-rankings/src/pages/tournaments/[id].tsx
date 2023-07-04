import { track as CronitorTrack } from '@cronitorio/cronitor-rum-js'
import type { Ranking, Tournament } from '@prisma/client'
import { useUser } from '@supabase/auth-helpers-react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import type { TournamentWithoutTeams } from '@prodigy/data'
import type { RANKING_VALUES, TEAM } from '@prodigy/types'
import { Button, Modal, PageHeaderWrapper, RankingLegend, Team, Title } from '@prodigy/ui'

import TwitterIcon from 'Assets/twitter.svg'
import { useLogin } from 'Hooks/useLogin'
import { API_ENDPOINT, apiInstance } from 'Utils/api'
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter'
import { DEFAULT_TITLE } from 'Utils/constants'
import { getShareableFacebookLink, getShareableTwitterLink } from 'Utils/getShareabaleLinks'

const CreateRankingPage = ({ tournament }: { tournament: Tournament }): ReactElement => {
  const { teams, id, logo, event, region, year, logo_base64 } = tournament

  const handleLogin = useLogin()
  const user = useUser()
  const [isModalOpen, setModalOpen] = useState(false)
  const [rankingId, setRankingId] = useState('')
  const [isRankingCreation, setIsRankingCreation] = useState(false)
  const [ranking, setRanking] = useState<TEAM[] | null>(null)

  const toggleModal = () => setModalOpen((value) => !value)

  useEffect(() => {
    const hasUnsavedRanking = window.localStorage.getItem(tournament.id)

    if (hasUnsavedRanking) {
      setRanking(JSON.parse(hasUnsavedRanking))
    } else {
      setRanking(teams as unknown as TEAM[])
    }
  }, [teams, tournament.id])

  const handleCreateRanking = async () => {
    setIsRankingCreation(true)
    try {
      const { data } = await apiInstance.post<Ranking>('/rankings', {
        ranking,
        tournamentId: id,
        userId: user.id
      })
      CronitorTrack('NewRanking')
      setRankingId(data.id)
      toggleModal()
      window.localStorage.removeItem(tournament.id)
    } catch (error) {
      toast.error('An error occured during the power ranking creation.')
    } finally {
      setIsRankingCreation(false)
    }
  }

  const handleUpdateValue = (value: RANKING_VALUES, teamId: number, playerId?: number) => {
    if (playerId) {
      const team = ranking.find(({ id }) => id === teamId)

      if (team) {
        const player = team.players.find(({ id }) => id === playerId)

        if (player) {
          player.value = value
        }
      }
    } else {
      const team = ranking.find(({ id }) => id === teamId)

      team.teamValue = value
    }

    const hasUnsavedRanking = window.localStorage.getItem(rankingId)

    if (!hasUnsavedRanking) {
      window.localStorage.setItem(tournament.id, JSON.stringify(ranking))
    }
  }

  return (
    <>
      <Head>
        <title>{`${region} ${capitalizeFirstLetter(event)} ${year} - ${DEFAULT_TITLE}`}</title>
        <meta
          property="og:image"
          content={`${API_ENDPOINT}/og?id=${tournament.id}&entity=tournaments`}
        />
        <meta
          property="twitter:image"
          content={`${API_ENDPOINT}/og?id=${tournament.id}&entity=tournaments`}
        />
        <meta property="og:title" content={`${region} - ${event} - ${year}`} />
        <meta
          property="og:description"
          content={`Create your personal ${region} ${event} ${year} power ranking`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="360" />
        <meta property="og:image:alt" content={`${region} logo`} />
        <meta
          name="description"
          content={`Create your personal ${region} ${event} ${year} power ranking`}
        />
        <meta
          property="og:url"
          content={`https://lol-power-ranking.vercel.app/tournaments/${tournament.id}`}
        />
      </Head>
      <RankingLegend />
      <PageHeaderWrapper>
        <Image
          src={logo}
          alt={`${region} logo`}
          height={100}
          width={100}
          id={`${region}_${event}_${year}`}
          placeholder="blur"
          blurDataURL={logo_base64}
        />
        <Title>{`${region} ${capitalizeFirstLetter(event)} - ${year}`}</Title>
      </PageHeaderWrapper>
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-3 md:px-6">
        {ranking?.map(({ id: teamId, logo, name, players, logo_base64 }) => (
          <Team
            key={teamId}
            id={teamId}
            disabled={false}
            logo={logo}
            name={name}
            logo_base64={logo_base64}
            players={players}
            onUpdate={(value, playerId) => {
              handleUpdateValue(value, teamId, playerId)
            }}
          />
        ))}
      </div>
      <div className="my-20 flex justify-center">
        {user?.id ? (
          <Button isDisabled={isRankingCreation} onClick={handleCreateRanking}>
            Create my power ranking
          </Button>
        ) : (
          <div className="flex flex-col items-center">
            <Button onClick={handleLogin}>
              Sign in <TwitterIcon className="ml-2 h-5 w-5 fill-white" />
            </Button>
          </div>
        )}
      </div>
      <Modal title="Your power ranking was created" toggleModal={toggleModal} isOpen={isModalOpen}>
        <p className="mb-10 text-white">
          Creating ranking is always exciting, but sharing it with others is even more fulfilling!
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
          <Button href={getShareableFacebookLink(rankingId)}>Share on Facebook</Button>
          <Button href={getShareableTwitterLink(rankingId)}>Share on Twitter</Button>
        </div>
      </Modal>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await apiInstance.get<TournamentWithoutTeams[]>('/tournaments')

  const paths = data.map(({ id }) => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: { id }
  } = context

  const { data: tournament } = await apiInstance.get<Tournament>(`/tournaments/${id}`)

  return {
    props: {
      tournament
    }
  }
}

export default CreateRankingPage
