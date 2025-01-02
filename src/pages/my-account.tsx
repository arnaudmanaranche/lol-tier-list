import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import * as Tabs from '@radix-ui/react-tabs'
import type { User } from '@supabase/supabase-js'
import { createClient } from 'clients/supabase/client'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'
import type { TierListWithTournament } from 'types'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Title } from '@/components/Title'
import { apiInstance } from '@/utils/api'
import { ROUTES } from '@/utils/constants'

import XIcon from '../svgs/x.svg'

interface PageProps {
  user: User
  tierlists: TierListWithTournament[]
}

const Page = ({
  user,
  tierlists
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const supabaseClient = createClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const deleteMyAccount = async () => {
    try {
      await apiInstance.delete(`/users/${user.id}`)
      await supabaseClient.auth.signOut()
      router.push(ROUTES.HOME)
    } catch {
      toast.error(
        'An error occured during your account deletion. Please try again later.'
      )
    }
  }

  const handleDeleteTierlist = async (tierListId: string) => {
    try {
      setIsLoading(true)
      await apiInstance.delete(`/tier-list/by-id/${tierListId}`)
      router.replace(router.asPath)
      toast.success('Your tier list was successfuly deleted.')
    } catch {
      toast.error(
        'An error occured during your tier list deletion. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoading(true)
      await supabaseClient.auth.signOut()
      router.push(ROUTES.HOME)
    } catch {
      toast.error(
        'An error occured during your logout. Please try again later.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header user={user} />
      <PageHeaderWrapper>
        <Title>My Account</Title>
      </PageHeaderWrapper>
      <Tabs.Root defaultValue="tab1">
        <div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
          <Tabs.List className="flex space-x-4 rounded-md bg-gunmetal p-2 text-white">
            <Tabs.Trigger
              value="tab1"
              className="cursor-pointer rounded-md p-2 transition-all data-[state=active]:bg-gunmetalDark"
            >
              My tier lists
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              className="cursor-pointer rounded-md p-2 transition-all data-[state=active]:bg-gunmetalDark"
            >
              Settings
            </Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="tab1">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6">
            {tierlists && tierlists?.length <= 0 ? (
              <div className="flex flex-col items-center space-y-4">
                <h2 className="text-2xl text-white">
                  You don&apos;t have any tier list yet
                </h2>
                <Button to={ROUTES.TOURNAMENTS}>Browse tournaments</Button>
              </div>
            ) : (
              <ul className="rounded-sm border border-brightGray bg-gunmetal">
                {tierlists?.map((tierlist) => (
                  <li
                    className="flex items-center p-6 text-white"
                    key={tierlist.id}
                  >
                    <div className="flex grow items-center">
                      <Image
                        src={tierlist.tournament.logo}
                        alt={`${tierlist.tournament.region} logo`}
                        height={60}
                        width={60}
                        id={`${tierlist.tournament.region}_${tierlist.tournament.event}_${tierlist.tournament.year}`}
                      />
                      <span className="ml-2 capitalize">{`${tierlist.tournament.region.toUpperCase()} ${tierlist.tournament.event} - ${tierlist.tournament.year}`}</span>
                    </div>
                    <div className="flex justify-end space-x-4">
                      <Button
                        to={`/tier-list/${tierlist.tournament.region}/${tierlist.tournament.year}/${tierlist.tournament.event}/${user.identities?.[0].identity_data?.preferred_username}?edit`}
                        isDisabled={isLoading}
                      >
                        <span className="hidden md:flex">Edit</span>
                        <PencilIcon className="h-5 w-5 md:ml-2" />
                      </Button>
                      <Button
                        isDisabled={isLoading}
                        onClick={() => {
                          handleDeleteTierlist(tierlist.id)
                        }}
                        type="danger"
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
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
            <div className="rounded-md border border-brightGray bg-gunmetal text-white md:w-4/5">
              <h2 className="p-5 text-xl">Connection method</h2>
              <div className="flex items-center px-5">
                <XIcon className="h-5 w-5 fill-white" />
                <div className="flex flex-col justify-center p-4">
                  <span>X (formerly Twitter)</span>
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
          <div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
            <div className="rounded-md border border-red-600 text-white md:w-4/5">
              <h2 className="p-5 text-xl">Delete Personal Account</h2>
              <p className="p-4 text-base">
                Permanently delete your account and all of its contents from the
                Lol Tier List platform. This action is not reversible, so please
                continue with caution.
              </p>
              <div className="flex flex-row-reverse rounded-b-md px-6 py-3">
                <Button type="danger" onClick={deleteMyAccount}>
                  Delete my account
                </Button>
              </div>
            </div>
          </div>
          <div className="mx-auto my-20 w-full max-w-7xl px-4 md:px-6">
            <div className="md:w-4/5">
              <Button isDisabled={isLoading} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const supabase = createServerPropsClient(context)

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

  const { data } = await apiInstance.get<TierListWithTournament[]>(
    `/users/${user.id}/tier-lists`
  )

  return {
    props: {
      user,
      tierlists: data
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
