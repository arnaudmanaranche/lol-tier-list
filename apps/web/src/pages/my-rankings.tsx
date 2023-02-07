import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import type { UserRankings } from '@lpr/data'
import { Button, Error, Title } from '@lpr/ui'

import { apiInstance } from 'Utils/api'
import { ROUTES } from 'Utils/constants'
import { supabase } from 'Utils/supabase'

const { HOME } = ROUTES

const MyRankings = ({ rankings }: { rankings: UserRankings[] }): ReactElement => {
  const router = useRouter()

  const deleteRanking = async (rankingId) => {
    try {
      await apiInstance.delete(`/rankings/${rankingId}`)
      router.replace(router.asPath)
    } catch (error) {
      return error
    }
  }

  return (
    <div className="max-w-screen-md pt-10 mx-auto">
      <Title tag="h1">My Rankings</Title>
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
                  alt={`${ranking.tournament.region} logo`}
                  height={60}
                  width={60}
                  id={`${ranking.tournament.region}_${ranking.tournament.event}_${ranking.tournament.year}`}
                  placeholder="blur"
                  blurDataURL={ranking.tournament.logo_base64}
                />
                <span>{`${ranking.tournament.region} ${ranking.tournament.event} - ${ranking.tournament.year}`}</span>
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

  const { data } = await apiInstance.get<UserRankings[]>(`/users/${user.id}/rankings`)

  return {
    props: {
      rankings: data
    }
  }
}

export default MyRankings
