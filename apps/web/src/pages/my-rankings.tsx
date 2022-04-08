import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import type { RANKING } from '@lpr/types'
import { Button, Error } from '@lpr/ui'

import { ROUTES } from 'Utils/constants'
import prisma from 'Utils/prisma'
import supabase from 'Utils/supabase'

const { HOME } = ROUTES

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
    <div className="max-w-screen-md pt-10 mx-auto">
      <h1 className="mb-10 text-5xl font-bold text-center dark:text-white">My Rankings</h1>
      {rankings.length <= 0 ? (
        <Error className="text-center">
          <span>You have not created any ranking for the moment.</span>
        </Error>
      ) : (
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
                  placeholder="blur"
                  blurDataURL={ranking.tournament.base64}
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
                <Button to={`/ranking/view/${ranking.id}?edit`}>Edit</Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)

  if (!user) {
    return {
      redirect: {
        destination: HOME,
        permanent: false
      }
    }
  }

  const rankings = await prisma.ranking.findMany({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      tournamentId: true,
      data: false,
      tournament: {
        select: {
          teams: false,
          id: true,
          name: true,
          pandascoreId: true,
          status: true,
          logo: true,
          base64: true,
          year: true
        }
      },
      userId: true
    }
  })

  return {
    props: {
      rankings
    }
  }
}

export default MyRankings
