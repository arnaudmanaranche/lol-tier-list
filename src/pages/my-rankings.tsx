import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import Button from 'Components/Button'
import prisma from 'Utils/prisma'
import protectedRoute from 'Utils/protectedRoute'
import type { RANKING } from 'Utils/types'

const MyRankings = ({ rankings }: { rankings: RANKING[] }): ReactElement => {
  const router = useRouter()

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
      router.replace(router.asPath)
    } catch (error) {
      return error
    }
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="mb-10 text-5xl font-bold text-center dark:text-white">My Rankings</h1>
      <ul>
        {rankings?.map((ranking) => (
          <li className="flex items-center my-12" key={ranking.id}>
            <div className="flex items-center w-[30%]">
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
            <div className="flex justify-end w-[70%] space-x-4">
              <Button
                onClick={() => {
                  deleteRanking(ranking.id)
                }}
              >
                Delete
              </Button>
              <Button href={`/ranking/view/${ranking.id}?edit`}>Edit</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = (context) =>
  protectedRoute(context, async (user) => {
    const rankings = await prisma.ranking.findMany({
      where: {
        userId: user.id
      },
      include: {
        tournament: true
      }
    })

    return { rankings }
  })

export default MyRankings
