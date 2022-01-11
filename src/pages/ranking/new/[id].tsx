import { Dialog, Transition } from '@headlessui/react'
import { RoomProvider, useMyPresence, useObject, useOthers } from '@liveblocks/react'
import * as Panelbear from '@panelbear/panelbear-js'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, ReactElement, useRef, useState } from 'react'

import Button from 'Components/Button'
import Team from 'Components/Team'
import { useUser } from 'Contexts/user'
import { login } from 'Utils/auth'
import { DEFAULT_TITLE } from 'Utils/constants'
import prisma from 'Utils/prisma'
import type { PLAYER, RANKING_VALUES, TOURNAMENT } from 'Utils/types'

function Cursor({ color, x, y }) {
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        transition: 'transform 0.5s cubic-bezier(.17,.93,.38,1)',
        transform: `translateX(${x}px) translateY(${y}px)`
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  )
}

const COLORS = [
  '#E57373',
  '#9575CD',
  '#4FC3F7',
  '#81C784',
  '#FFF176',
  '#FF8A65',
  '#F06292',
  '#7986CB'
]

const RankingContainer = ({ tournament }: { tournament: TOURNAMENT }): ReactElement => {
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [_, updateMyPresence] = useMyPresence()
  const [rankingId, setRankingId] = useState('')
  const cancelButtonRef = useRef()
  const others = useOthers()
  const { teams, id, logo, name, base64 } = tournament

  function closeModal() {
    setOpen(false)
  }

  function openModal() {
    setOpen(true)
  }

  const data = useObject('ranking', {
    ranking: teams
  })

  const createRanking = async () => {
    const newRanking = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ranking, tournamentId: id, userId: user?.id })
    }

    try {
      const fetchResponse = await fetch('/api/ranking/new', newRanking)
      const data = await fetchResponse.json()
      Panelbear.track('NewRanking')
      setRankingId(data.id)
      openModal()
      return data
    } catch (error) {
      return error
    }
  }

  const onUpdate = (value: RANKING_VALUES, playerId: number, teamId: number) => {
    const team = ranking.find((t) => t.id === teamId)

    const player = team?.players.find((p) => p.id === playerId)

    if (player) {
      player.value = value
      data.set('ranking', ranking)
    }

    return
  }

  if (!data) return <div>Loading</div>

  const { ranking } = data.toObject()

  return (
    <div
      className="max-w-screen-xl pt-10 mx-auto"
      onPointerMove={(event) =>
        updateMyPresence({
          cursor: {
            x: Math.round(event.clientX),
            y: Math.round(event.clientY)
          }
        })
      }
      onPointerLeave={() =>
        updateMyPresence({
          cursor: null
        })
      }
    >
      <Head>
        <title>{`${name} - ${DEFAULT_TITLE}`}</title>
        <meta property="og:image" content={logo} key="og:image" />
        <meta property="og:image:secure_url" content={logo} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:image:alt" content={`${name} logo`} />
      </Head>
      <div className="flex items-center justify-center w-full mb-10">
        {others.map(({ connectionId, presence }) => {
          if (presence == null || presence.cursor == null) {
            return null
          }

          return (
            <Cursor
              key={`cursor-${connectionId}`}
              color={COLORS[connectionId % COLORS.length]}
              x={presence.cursor.x}
              y={presence.cursor.y}
            />
          )
        })}
        <Image
          src={logo}
          alt={`${name} logo`}
          height={70}
          width={70}
          id={name}
          placeholder="blur"
          blurDataURL={base64}
        />
        <div className="prose lg:prose-xl">
          <h1 className="capitalize dark:text-white">{name}</h1>
        </div>
      </div>
      <div className="grid gap-10 px-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:px-0">
        {ranking?.map(
          ({
            id: teamId,
            logo,
            name,
            players,
            base64
          }: {
            id: number
            logo: string
            name: string
            base64: string
            players: PLAYER[]
          }) => (
            <Team
              key={teamId}
              id={teamId}
              disabled={false}
              logo={logo}
              name={name}
              base64={base64}
              players={players}
              onUpdate={(value, playerId) => {
                onUpdate(value, playerId, teamId)
              }}
              onFocus={(name) => {
                updateMyPresence({ focusedId: name })
              }}
              onBlur={() => updateMyPresence({ focusedId: null })}
            />
          )
        )}
      </div>
      <div className="flex justify-center m-6">
        {user?.id ? (
          <Button onClick={createRanking}>{`Create my ${name} power ranking`}</Button>
        ) : (
          <Button onClick={login}>Login with Twitter</Button>
        )}
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-opacity-75 bg-dark"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="mb-6 text-lg font-medium leading-6 text-gray-900">
                  Your power ranking was created.
                  <br />
                  It&apos;s time to share your power ranking.
                </Dialog.Title>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

const RankingPage = ({ tournament }: { tournament: TOURNAMENT }): ReactElement => {
  return (
    <RoomProvider id={tournament.id}>
      <RankingContainer tournament={tournament} />
    </RoomProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params

  const tournament = await prisma.tournament.findUnique({
    where: {
      id: id as string
    }
  })

  if (!tournament) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      tournament
    }
  }
}

export default RankingPage
