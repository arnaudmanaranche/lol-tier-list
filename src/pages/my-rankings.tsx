import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import type { ReactElement } from 'react'
import { useState } from 'react'

import Button from 'Components/Button'
import { ROUTES } from 'Utils/constants'
import prisma from 'Utils/prisma'
import supabase from 'Utils/supabase'
import { RANKING } from 'Utils/types'

const MyRankings = ({ rankings }: { rankings: RANKING[] }): ReactElement => {
  const [myRankings, setMyRakings] = useState(rankings)

  const deleteRanking = async (rankingId) => {
    const ranking = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rankingId })
    }

    try {
      await fetch('/api/ranking/delete', ranking)
      const myRankingsCopy = [...myRankings]
      const index = myRankings.findIndex((arr) => arr.id === rankingId)
      if (index !== -1) {
        myRankingsCopy.splice(index, 1)
        setMyRakings(myRankingsCopy)
      }
    } catch (error) {
      return error
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="mb-5">My Rankings</h1>
      <ul>
        {myRankings.map((ranking) => (
          <li className="flex items-center justify-around" key={ranking.id}>
            <div className="flex items-center">
              <Image
                src={ranking.tournament.logo}
                alt={`${ranking.tournament.name} logo`}
                height={60}
                width={60}
                id={ranking.tournament.name}
                onLoadingComplete={() => {
                  const img = document.getElementById(ranking.tournament.name)

                  img.classList.add('imageIsLoaded')
                }}
                placeholder="blur"
                blurDataURL={ranking.tournament.base64}
                className="image"
              />
              <span>{ranking.tournament.name}</span>
            </div>
            <div>
              <Button
                onClick={() => {
                  deleteRanking(ranking.id)
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: ROUTES.HOME } }
  }

  const rankings = await prisma.ranking.findMany({
    where: {
      userId: user.id
    },
    include: {
      tournament: true
    }
  })

  return { props: { rankings } }
}

export default MyRankings
