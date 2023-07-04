import { m } from 'framer-motion'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWRInfinite from 'swr/infinite'

import type { TournamentWithoutTeams } from '@prodigy/data'
import { Button, PageHeaderWrapper, Title, Tournament } from '@prodigy/ui'

import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE } from 'Utils/constants'
import { fetcher } from 'Utils/fetcher'
import { parent, stat } from 'Utils/framerMotion'

import { Section } from '../../sections/Section'

const TAKE_PARAM_ARGUMENT = 5

const TournamentsListPage = ({
  upcomingTournaments,
  pastTournaments
}: {
  upcomingTournaments: TournamentWithoutTeams[]
  pastTournaments: TournamentWithoutTeams[]
}): ReactElement => {
  const {
    data: pastTournamentsData,
    size: pastTournamentsDataSize,
    setSize: pastTournamentsDataSetSize,
    isLoading: pastTournamentsDataIsLoading,
    error: pastTournamentsDataError
  } = useSWRInfinite<TournamentWithoutTeams[]>(
    (pageIndex, previousPageData) => {
      // Initialy, we don't have previous data
      if (pageIndex === 0)
        return `/api/tournaments?take=${TAKE_PARAM_ARGUMENT}&showPastTournaments=true`

      // We have reached the end of the pagination
      if (previousPageData && !previousPageData.length) return null

      return `/api/tournaments?cursor=${
        previousPageData[previousPageData.length - 1].id
      }&take=${TAKE_PARAM_ARGUMENT}&showPastTournaments=true`
    },
    fetcher,
    {
      revalidateOnFocus: false,
      onErrorRetry(err) {
        if (err) return
      },
      fallback: { pastTournaments }
    }
  )

  useEffect(() => {
    if (pastTournamentsDataError) {
      toast.error('An error occured during fetching new tournaments. Please try again later.')
    }
  }, [pastTournamentsDataError])

  return (
    <>
      <Head>
        <title>{`Tournaments - ${DEFAULT_TITLE}`}</title>
      </Head>
      <PageHeaderWrapper>
        <Title>Select a tournament</Title>
      </PageHeaderWrapper>
      <div className="mx-auto mt-10 w-full max-w-7xl px-4 md:px-6">
        <Section>
          <Section.Title>Upcoming tournaments</Section.Title>
          {upcomingTournaments.length ? (
            <m.div
              variants={parent}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4"
            >
              {upcomingTournaments.map((tournament) => (
                <m.div variants={stat} key={tournament.id}>
                  {tournament.active ? (
                    <Link href={`/tournaments/${tournament.id}`} prefetch={false}>
                      <Tournament {...tournament} />
                    </Link>
                  ) : (
                    // Some upcoming tournaments can be not active due to missing
                    // data from the PandaScore API
                    <div className="cursor-not-allowed opacity-50">
                      <Tournament {...tournament} />
                    </div>
                  )}
                </m.div>
              ))}
            </m.div>
          ) : (
            <p className="text-center text-white">
              There is no upcoming tournament for the moment.
            </p>
          )}
        </Section>
        <Section>
          <Section.Title>Past tournaments</Section.Title>
          {pastTournamentsDataIsLoading ? (
            <div className="grid animate-pulse grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((arr) => (
                <div className="h-[90px] min-w-[200px] rounded-sm bg-gunmetal p-2" key={arr} />
              ))}
            </div>
          ) : (
            <>
              <m.div
                variants={parent}
                initial="hidden"
                animate="show"
                className="mt-5 grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4"
              >
                {pastTournamentsData?.map((tournaments) => {
                  return tournaments.map((tournament) => (
                    <m.div variants={stat} key={tournament.id}>
                      <div className="cursor-not-allowed opacity-50">
                        <Tournament {...tournament} />
                      </div>
                    </m.div>
                  ))
                })}
              </m.div>
              {/* We have reached the end of the pagination */}
              {!pastTournamentsData[pastTournamentsDataSize - 1]?.length &&
              !pastTournamentsDataError ? null : (
                <div className="my-10 flex justify-center">
                  <Button
                    isDisabled={pastTournamentsDataIsLoading}
                    onClick={() => pastTournamentsDataSetSize(pastTournamentsDataSize + 1)}
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </Section>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: upcomingTournaments } = await apiInstance.get<TournamentWithoutTeams[]>(
    `/tournaments?take=${TAKE_PARAM_ARGUMENT}`
  )
  const { data: pastTournaments } = await apiInstance.get<TournamentWithoutTeams[]>(
    `/tournaments?take=${TAKE_PARAM_ARGUMENT}&showPastTournaments=true`
  )

  return {
    props: {
      upcomingTournaments,
      pastTournaments
    }
  }
}

export default TournamentsListPage
