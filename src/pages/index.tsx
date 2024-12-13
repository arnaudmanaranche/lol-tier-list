import type { User } from '@supabase/supabase-js'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import { m } from 'framer-motion'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/legacy/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { type ReactNode, useEffect } from 'react'
import { toast } from 'sonner'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { UrlDisplay } from '@/components/UrlDisplay/UrlDisplay'
import { useLogin } from '@/hooks/useLogin'
import { ROUTES, SUPPORTED_REGIONS } from '@/utils/constants'
import { parent, stat } from '@/utils/framerMotion'

interface PageProps {
  user: User | null
}

const Page = ({
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const handleLogin = useLogin()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCTA = () => {
    if (!user) {
      handleLogin()
    } else {
      router.push(ROUTES.TOURNAMENTS)
    }
  }

  useEffect(() => {
    const status = searchParams.get('status')

    if (status === 'auth_error') {
      toast.message(
        'An error occurred while trying to authenticate you. Please try again.'
      )
    }
  }, [searchParams])

  return (
    <div className="px-4">
      <Header user={user} />
      <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
      <PageHeaderWrapper>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          <h1 className="text-center text-5xl font-bold text-white md:text-8xl">
            Build Tier Lists for Tournaments Quickly and Easily
          </h1>
          <div className="mx-auto flex flex-col items-center space-y-10 text-lg leading-[1.4] text-gray-300 md:max-w-3xl lg:text-xl">
            <p className="text-center">
              Create, share, and explore passionate tier lists for League of
              Legends tournaments. Join a community of enthusiasts and deepen
              your game understanding.
            </p>
            <div
              role="button"
              onClick={handleCTA}
              className="group block w-full max-w-lg transform rounded-lg bg-blue-500 py-3 text-center capitalize text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg"
            >
              Create my League of Legend Tier List
            </div>
          </div>
        </m.div>
      </PageHeaderWrapper>
      <div className="mx-auto mt-20 space-y-20 bg-white/10 px-4 md:px-6">
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          <div className="col-span-2">
            <section className="flex flex-col items-center space-y-4">
              <h2 className="text-center text-4xl font-bold text-white">
                Supported Regions
              </h2>
              <p className="max-w-xl text-center text-lg text-gray-300">
                Discover the latest tournaments from the most popular regions in
                the world.
              </p>
              <m.div
                variants={parent}
                initial="hidden"
                animate="show"
                className="mx-auto grid max-w-7xl grid-cols-2 gap-4 pt-6 md:gap-8 lg:grid-cols-5"
              >
                {SUPPORTED_REGIONS.map((region) => (
                  <m.div
                    variants={stat}
                    key={region}
                    className="group flex cursor-pointer justify-center rounded-lg border-[1px] border-white/20 bg-white/5 p-10 backdrop-blur-sm transition-all duration-200"
                    tabIndex={0}
                  >
                    <Image
                      src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/${region}/2023/logo.png`}
                      alt={`${region} logo`}
                      height={80}
                      width={80}
                      className="transition-transform duration-200"
                    />
                  </m.div>
                ))}
              </m.div>
            </section>
          </div>
          <div className="col-span-2 col-start-3">2</div>
          <div className="col-span-4 row-start-2">
            <section className="flex flex-col items-center space-y-4">
              <h2 className="text-center text-4xl font-bold text-white">
                Your Custom URLS
              </h2>
              <p className="max-w-xl text-center text-lg text-gray-300">
                Shareable custom urls for your tier lists and share them with
                your friends. Express your opinions and compare your rankings
                with others
              </p>
              <UrlDisplay />
            </section>
          </div>
        </div>

        <section className="mb-20 rounded-2xl border-[1px] border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-3xl font-bold text-white">Stay Updated</h2>
          <p className="mb-6 text-gray-300">
            Join our newsletter to receive the latest updates about tournaments
            and tier lists.
          </p>
          <form className="mx-auto max-w-md">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const supabaseClient = createServerPropsClient(context)
  const {
    data: { user }
  } = await supabaseClient.auth.getUser()

  return {
    props: {
      user
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
