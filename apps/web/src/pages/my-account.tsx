import { Tab } from '@headlessui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { Fragment } from 'react'
import { toast } from 'sonner'

import type { UserRankings } from '@lpr/data'
import { Button, PageHeaderWrapper, Title } from '@lpr/ui'

import TwitterIcon from 'Assets/twitter.svg'
import { apiInstance } from 'Utils/api'
import { DEFAULT_TITLE, ROUTES } from 'Utils/constants'

const MyAccountPage = ({
  user,
  rankings
}: {
  user: User
  rankings: UserRankings[]
}): ReactElement => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const deleteMyAccount = async () => {
    try {
      await supabaseClient.auth.signOut()
      await apiInstance.delete(`/users/${user.id}`)
      router.push(ROUTES.HOME)
    } catch (error) {
      return error
    }
  }

  const deleteRanking = async (rankingId: string) => {
    try {
      await apiInstance.delete(`/rankings/${rankingId}`)
      router.replace(router.asPath)
      toast.success('Your ranking was successfuly deleted.')
    } catch (error) {
      return error
    }
  }

  const handleLogout = async () => {
    await supabaseClient.auth.signOut()
    router.push(ROUTES.HOME)
  }

  return (
    <div>
      <Head>
        <title>{`My Account - ${DEFAULT_TITLE}`}</title>
      </Head>
      <PageHeaderWrapper>
        <Title>My Account</Title>
      </PageHeaderWrapper>
      <Tab.Group defaultIndex={0}>
        <div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
          <Tab.List className="flex space-x-4 rounded-md bg-gunmetal p-2 text-white">
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={
                    selected
                      ? 'cursor-pointer rounded-md bg-gunmetalDark p-2'
                      : 'cursor-pointer p-2 transition-all'
                  }
                >
                  My Rankings
                </div>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <div
                  className={
                    selected
                      ? 'cursor-pointer rounded-md bg-gunmetalDark p-2'
                      : 'cursor-pointer p-2 transition-all'
                  }
                >
                  Settings
                </div>
              )}
            </Tab>
          </Tab.List>
        </div>
        <Tab.Panels>
          <Tab.Panel>
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
              {rankings.length <= 0 ? (
                <p className="text-center text-white">You haven&apos;t created any rankings yet.</p>
              ) : (
                <ul className="rounded-sm border border-brightGray bg-gunmetal">
                  {rankings?.map((ranking) => (
                    <li className="flex items-center p-6 text-white" key={ranking.id}>
                      <div className="flex grow items-center">
                        <Image
                          src={ranking.tournament.logo}
                          alt={`${ranking.tournament.region} logo`}
                          height={60}
                          width={60}
                          id={`${ranking.tournament.region}_${ranking.tournament.event}_${ranking.tournament.year}`}
                          placeholder="blur"
                          blurDataURL={ranking.tournament.logo_base64}
                        />
                        <span className="ml-2 capitalize">{`${ranking.tournament.region} ${ranking.tournament.event} - ${ranking.tournament.year}`}</span>
                      </div>
                      <div className="flex justify-end space-x-4">
                        <Button to={`/rankings/${ranking.id}?edit`}>
                          <span className="hidden md:flex">Edit</span>
                          <PencilIcon className="h-5 w-5 md:ml-2" />
                        </Button>
                        <Button
                          onClick={() => {
                            deleteRanking(ranking.id)
                          }}
                        >
                          <span className="hidden md:flex">Delete</span>
                          <TrashIcon className="h-5 w-5 md:ml-2" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
              <div className="rounded-md border border-brightGray bg-gunmetal text-white md:w-4/5">
                <h2 className="p-5 text-xl">Login Connection</h2>
                <div className="flex items-center p-4">
                  <TwitterIcon className="h-5 w-5 fill-white" />
                  <div className="flex flex-col justify-center p-4">
                    <span>Twitter</span>
                    <p className="text-md text-white">
                      {user.email}{' '}
                      <Link
                        href={`https://twitter.com/${user.user_metadata.preferred_username}`}
                        target="_blank"
                        rel="external nofollow noreferrer"
                      >
                        (@{user.user_metadata.preferred_username})
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
              <div className="rounded-md border border-red-600 text-white md:w-4/5">
                <h2 className="p-5 text-xl">Delete Personal Account</h2>
                <p className="p-4 text-base">
                  Permanently remove your Personal Account and all of its contents from the LoL
                  Power Ranking platform. This action is not reversible, so please continue with
                  caution.
                </p>
                <div className="flex flex-row-reverse rounded-b-md px-6 py-3">
                  <Button onClick={deleteMyAccount}>Delete my account</Button>
                </div>
              </div>
            </div>
            <div className="mx-auto my-20 w-full max-w-7xl px-4 md:px-6">
              <div className="md:w-4/5">
                <Button onClick={handleLogout}>Log out</Button>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createPagesServerClient(context)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      redirect: {
        destination: ROUTES.HOME,
        permanent: false
      }
    }
  }

  const { data } = await apiInstance.get<UserRankings[]>(`/users/${user.id}/rankings`)

  return {
    props: {
      user,
      rankings: data
    }
  }
}

export default MyAccountPage
