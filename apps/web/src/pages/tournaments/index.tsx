import type { User } from '@supabase/supabase-js'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import { m } from 'framer-motion'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import type { FormEvent, ReactNode } from 'react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import useSWRInfinite from 'swr/infinite'
import type { TournamentWithoutTeams } from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Title } from '@/components/Title'
import { Tournament } from '@/components/Tournament'
import { apiInstance } from '@/utils/api'
import { DEFAULT_TITLE, WEBSITE_URL } from '@/utils/constants'
import { fetcher } from '@/utils/fetcher'
import { parent, stat } from '@/utils/framerMotion'
import { isValidEmail } from '@/utils/isValidEmail'

const TAKE_PARAM_ARGUMENT = 5

interface PageProps {
  upcomingTournaments: TournamentWithoutTeams[]
  pastTournaments: TournamentWithoutTeams[]
  user: User | null
}

const Page = ({
  upcomingTournaments,
  pastTournaments,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const searchParams = useSearchParams()
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

      return `/api/tournaments?page=${pageIndex}&take=${TAKE_PARAM_ARGUMENT}&showPastTournaments=true`
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

  const handleSubscribeNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const email = form.email.value

    if (isValidEmail(email)) {
      try {
        await apiInstance.post('/newsletter', { email })
        toast.success('Subscribed successfully!')
        form.reset()
      } catch {
        toast.message(
          'An error occurred while trying to subscribe. Please try again.'
        )
      }
    }
  }

  useEffect(() => {
    if (pastTournamentsDataError) {
      toast.error(
        'An error occured during fetching new tournaments. Please try again later.'
      )
    }
  }, [pastTournamentsDataError])

  useEffect(() => {
    const status = searchParams.get('status')

    if (status === 'unauthorized') {
      toast.message(
        'You already create a tier list for this tournament. Go to your tiers list page to edit it.'
      )
    }
  }, [searchParams])

  const lastPage = pastTournamentsData?.[pastTournamentsDataSize - 1]
  const isReachingEnd = !lastPage || lastPage.length < TAKE_PARAM_ARGUMENT

  return (
    <>
      <Head>
        <title>{`${DEFAULT_TITLE} - Tournaments list`}</title>
        {/* Image */}
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
      </Head>
      <Header user={user} />
      <PageHeaderWrapper>
        <Title>Select a tournament</Title>
      </PageHeaderWrapper>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mt-10">
          <h2 className="mb-5 px-4 text-2xl font-semibold text-white md:px-6">
            Upcoming tournaments
          </h2>
          {upcomingTournaments.length ? (
            <m.div
              variants={parent}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4"
            >
              {upcomingTournaments.map((tournament) => (
                <m.div variants={stat} key={tournament.id}>
                  {tournament.active && user ? (
                    <Link
                      href={`/tournaments/${tournament.region}/${tournament.year}/${tournament.event}`}
                      prefetch={false}
                    >
                      <Tournament {...tournament} />
                    </Link>
                  ) : (
                    <div
                      onClick={() => {
                        toast.info(
                          user
                            ? 'This tournament is not yet active'
                            : 'You need to be logged in to access this tournament'
                        )
                      }}
                    >
                      <Tournament {...tournament} active={false} />
                    </div>
                  )}
                </m.div>
              ))}
            </m.div>
          ) : (
            <section className="mb-10 rounded-2xl border-[1px] border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm transition-colors hover:border-white/30 md:p-12">
              <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-100 md:text-xl">
                Join our newsletter to know when the next tournament will be
                live.
              </p>
              <form
                className="mx-auto max-w-md"
                onSubmit={handleSubscribeNewsletter}
              >
                <div className="flex flex-col gap-4 sm:flex-row">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-colors focus:border-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#6036a2] px-8 py-3 font-medium text-white transition-all hover:bg-[#472878] hover:shadow-lg"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </section>
          )}
        </div>
        <div className="mt-10">
          <h2 className="mb-5 px-4 text-2xl font-semibold text-white md:px-6">
            Past tournaments
          </h2>
          {pastTournamentsDataIsLoading ? (
            <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((arr) => (
                <div
                  className="relative h-[90px] min-w-[200px] overflow-hidden rounded-sm bg-gunmetal p-2"
                  key={arr}
                >
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
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
                      <div className="cursor-not-allowed">
                        <Tournament {...tournament} active={false} />
                      </div>
                    </m.div>
                  ))
                })}
              </m.div>
              {isReachingEnd ? (
                <div className="my-10 text-center text-gray-400">
                  No more tournaments to load
                </div>
              ) : (
                <div className="my-10 flex justify-center">
                  <Button
                    isDisabled={pastTournamentsDataIsLoading}
                    onClick={() =>
                      pastTournamentsDataSetSize(pastTournamentsDataSize + 1)
                    }
                  >
                    Load more
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const supabase = createServerPropsClient(context)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data: upcomingTournaments } = await apiInstance.get<
    TournamentWithoutTeams[]
  >(`/tournaments?take=${TAKE_PARAM_ARGUMENT}`)
  const { data: pastTournaments } = await apiInstance.get<
    TournamentWithoutTeams[]
  >(`/tournaments?take=${TAKE_PARAM_ARGUMENT}&showPastTournaments=true`)

  return {
    props: {
      upcomingTournaments,
      pastTournaments,
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
