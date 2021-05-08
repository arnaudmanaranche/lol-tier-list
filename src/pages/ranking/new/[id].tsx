import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import Button from 'Components/Button'
import Modal from 'Components/Modal'
import Team from 'Components/Team'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import { PLAYER, TOURNAMENT } from 'Utils/types'

const addPageClass = () => {
  document?.querySelector('html')?.classList.add('disableScroll')
}

const removePageClass = () => {
  document?.querySelector('html')?.classList.remove('disableScroll')
}

type Props = {
  tournament: TOURNAMENT
}

const Ranking: React.FC<Props> = ({ tournament }) => {
  const router = useRouter()

  // Make a clean loading state
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const { teams, id, logo, name } = tournament
  const [modalOpen, toggleModal] = React.useState(false)
  const [rankingId, setRankingId] = React.useState('')

  const ranking = teams

  React.useEffect(() => {
    window.addEventListener('click', (event) => {
      const isClickInside = document.getElementById('overlay')?.contains(event.target as Node)

      if (isClickInside && modalOpen) {
        toggleModal(false)
        removePageClass()
      }
    })

    window.addEventListener('keydown', (event) => {
      if (!modalOpen && event.key === 'Escape') {
        toggleModal(false)
        removePageClass()
      }
    })
  }, [modalOpen])

  const createRanking = async () => {
    const newRanking = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ranking, tournamentId: id })
    }

    try {
      const fetchResponse = await fetch('/api/ranking/new', newRanking)
      const data = await fetchResponse.json()
      setRankingId(id)
      return data
    } catch (error) {
      return error
    }
  }

  const onUpdate = (value: string, playerId: number, teamId: number) => {
    const team = ranking.find((t) => t.id === teamId)
    const player = team?.players.find((p) => p.id === playerId)

    if (player) {
      player.value = value
    }

    return
  }

  return (
    <>
      <Head>
        <title>{`${name} - ${DEFAULT_TITLE}`}</title>
        <meta property="og:image" content={logo} key="og:image" />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={`${name} logo`} />
      </Head>
      <h1 className="flex items-center justify-center mb-4 capitalize">
        <Image src={logo} height={60} width={60} />
        <p>{name}</p>
      </h1>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
        {ranking?.map(
          ({
            id: teamId,
            logo,
            name,
            players
          }: {
            id: number
            logo: string
            name: string
            players: PLAYER[]
          }) => (
            <Team
              key={teamId}
              id={teamId}
              disabled={false}
              logo={logo}
              name={name}
              players={players}
              onUpdate={(value, playerId) => {
                onUpdate(value, playerId, teamId)
              }}
            />
          )
        )}
      </div>
      <div className="my-6 text-center">
        <Button
          onClick={() => {
            toggleModal(true)
            addPageClass()
            createRanking()
          }}
        >{`Create my ${name} power raking`}</Button>
      </div>
      <div id="overlay" className="{`${styles.bgModal} ${modalOpen === true styles.active}`}" />
      <Modal
        open={modalOpen}
        className="{styles.modall}"
        closeModal={(value) => {
          toggleModal(value)
          removePageClass()
        }}
      >
        <p>You power ranking was created. It's time to share your power ranking.</p>
        <div className="{styles.shareButtons}">
          <Button
            href={`https://www.facebook.com/sharer/sharer.php?u=https://lol-power-ranking.app/ranking/view/${rankingId}`}
          >
            Share on Facebook
          </Button>
          <Button
            href={`https://twitter.com/intent/tweet?url=https://lol-power-ranking.app/ranking/view/${rankingId}`}
          >
            Share on Twitter
          </Button>
        </div>
      </Modal>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tournaments = await prisma.tournament.findMany()

  const paths = tournaments.map((tournament) => ({
    params: { id: tournament.id }
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params

  const tournament = await prisma.tournament.findUnique({
    where: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      id
    }
  })

  if (!tournament) {
    return {
      notFound: true
    }
  }

  return {
    props: { tournament },
    revalidate: 3600
  }
}

export default Ranking
