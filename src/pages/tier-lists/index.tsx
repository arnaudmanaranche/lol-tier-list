import type { User } from '@supabase/supabase-js'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import { m } from 'framer-motion'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import type { ReactNode } from 'react'
import useSWRInfinite from 'swr/infinite'
import type { TierListWithTournamentAndUsername } from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { TierListCard } from '@/components/TierListCard/TierListCard'
import { Title } from '@/components/Title'
import { apiInstance } from '@/utils/api'
import { DEFAULT_TITLE, WEBSITE_URL } from '@/utils/constants'
import { fetcher } from '@/utils/fetcher'
import { parent, stat } from '@/utils/framerMotion'

const TAKE_PARAM_ARGUMENT = 5

interface PageProps {
  tierList: TierListWithTournamentAndUsername[]
  user: User | null
}

const Page = ({
  tierList,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const {
    data: tierListData,
    size: tierListDataSize,
    setSize: tierListDataSetSize,
    isLoading: tierListDataIsLoading
  } = useSWRInfinite<TierListWithTournamentAndUsername[]>(
    (pageIndex, previousPageData) => {
      // Initialy, we don't have previous data
      if (pageIndex === 0) return `/api/tier-lists?take=${TAKE_PARAM_ARGUMENT}`

      // We have reached the end of the pagination
      if (previousPageData && !previousPageData.length) return null

      return `/api/tier-lists?page=${pageIndex}&take=${TAKE_PARAM_ARGUMENT}`
    },
    fetcher,
    {
      revalidateOnFocus: false,
      onErrorRetry(err) {
        if (err) return
      },
      fallback: { tierList }
    }
  )

  const lastPage = tierListData?.[tierListDataSize - 1]
  const isReachingEnd = !lastPage || lastPage.length < TAKE_PARAM_ARGUMENT

  return (
    <>
      <Head>
        <title>{`${DEFAULT_TITLE} - Tier lists`}</title>
        {/* Image */}
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
      </Head>
      <Header user={user} />
      <PageHeaderWrapper>
        <Title>Tiers list made by the community</Title>
      </PageHeaderWrapper>
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="mt-10">
          {tierListDataIsLoading ? (
            <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((arr) => (
                <div
                  className="relative h-[249px] min-w-[224px] overflow-hidden rounded-lg bg-gunmetal p-2"
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
                className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-4"
              >
                {tierListData?.map((tierList) => {
                  return tierList.map((tierList) => (
                    <m.div variants={stat} key={tierList.id}>
                      <div className="cursor-not-allowed">
                        <TierListCard tierList={tierList} />
                      </div>
                    </m.div>
                  ))
                })}
              </m.div>
              {isReachingEnd ? (
                <div className="my-10 text-center text-gray-400">
                  No more tier lists to load
                </div>
              ) : (
                <div className="my-10 flex justify-center">
                  <Button
                    isDisabled={tierListDataIsLoading}
                    onClick={() => tierListDataSetSize(tierListDataSize + 1)}
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

  const { data: tierList } = await apiInstance.get<
    TierListWithTournamentAndUsername[]
  >(`/tier-lists?take=${TAKE_PARAM_ARGUMENT}`)

  return {
    props: {
      tierList,
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
