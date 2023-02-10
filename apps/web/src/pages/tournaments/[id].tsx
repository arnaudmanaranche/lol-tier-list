import { track as PanelbearTrack } from '@panelbear/panelbear-js'
import type { Ranking, Tournament } from '@prisma/client'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from "next/legacy/image";
import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import type { TournamentWithoutTeams } from '@lpr/data'
import type { RANKING_VALUES, TEAM } from '@lpr/types'
import { Button, Modal, Team, Title } from '@lpr/ui'

import TwitterIcon from 'Assets/twitter.svg'
import { useUser } from 'Contexts/user'
import { apiInstance } from 'Utils/api'
import { login } from 'Utils/auth'
import { DEFAULT_TITLE } from 'Utils/constants'

const CreateRankingPage = ({ tournament }: { tournament: Tournament }): ReactElement => {
  const { teams, id, logo, event, region, year, logo_base64 } = tournament

  const user = useUser()
  const [isModalOpen, setModalOpen] = useState(false)
  const [rankingId, setRankingId] = useState('')
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
    try {
      const { data } = await apiInstance.post<Ranking>('/rankings', {
        ranking,
        tournamentId: id,
        userId: user.id
      })
      PanelbearTrack('NewRanking')
      setRankingId(data.id)
      toggleModal()
      window.localStorage.removeItem(tournament.id)
    } catch (error) {
      // TODO: display a notification
      return error
    }
  }

  const handleChangePlayerValue = (value: RANKING_VALUES, playerId: number, teamId: number) => {
    const team = ranking.find(({ id }) => id === teamId)

    if (team) {
      const player = team.players.find(({ id }) => id === playerId)

      if (player) {
        player.value = value
      }
    }

    const hasUnsavedRanking = window.localStorage.getItem(rankingId)

    if (!hasUnsavedRanking) {
      window.localStorage.setItem(tournament.id, JSON.stringify(ranking))
    }
  }

  return (
    <div className="max-w-screen-xl pt-10 mx-auto">
      <Head>
        <title>{`${region} - ${DEFAULT_TITLE}`}</title>
        <meta property="og:image" content={logo} key="og:image" />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={`${region} logo`} />
      </Head>
      <div className="flex justify-center items-center mb-10">
        <Image
          src={logo}
          alt={`${region} logo`}
          height={70}
          width={70}
          id={`${region}_${event}_${year}`}
          placeholder="blur"
          blurDataURL={logo_base64}
        />
        <Title tag="h1" className="capitalize">
          {`${region} ${event} - ${year}`}
        </Title>
      </div>
      <div className="grid gap-10 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:px-0">
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
              handleChangePlayerValue(value, playerId, teamId)
            }}
          />
        ))}
      </div>
      <div className="flex justify-center m-6">
        {user?.id ? (
          <Button onClick={handleCreateRanking}>Create my power ranking</Button>
        ) : (
          <Button onClick={login}>
            Login with Twitter <TwitterIcon className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>
      <Modal title="Your power ranking was created" toggleModal={toggleModal} isOpen={isModalOpen}>
        <p className="mb-3">It&apos;s time to share it !</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Button
            href={`https://www.facebook.com/sharer/sharer.php?u=https://lol-power-ranking.app/rankings/${rankingId}`}
          >
            Share on Facebook
          </Button>
          <Button
            href={`https://twitter.com/intent/tweet?url=https://lol-power-ranking.app/rankings/${rankingId}`}
          >
            Share on Twitter
          </Button>
        </div>
      </Modal>
    </div>
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
