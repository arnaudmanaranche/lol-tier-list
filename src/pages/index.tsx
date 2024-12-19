import type { User } from '@supabase/supabase-js'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import { AnimatePresence, m } from 'framer-motion'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/legacy/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { type ReactNode, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { PageHeaderWrapper } from '@/components/PageHeaderWrapper'
import { Team } from '@/components/Team'
import { UrlDisplay } from '@/components/UrlDisplay/UrlDisplay'
import { useLogin } from '@/hooks/useLogin'
import { apiInstance } from '@/utils/api'
import { ROUTES, SUPPORTED_REGIONS } from '@/utils/constants'
import { parent, stat } from '@/utils/framerMotion'
import { isValidEmail } from '@/utils/isValidEmail'
import { mockTeams } from '@/utils/mocks/homepage.mocks'

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

  const handleSubscribeNewsletter = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const email = form.email.value

    if (isValidEmail(email)) {
      try {
        await apiInstance.post('/newsletter', { email })
        toast.message('Subscribed successfully!')
        form.reset()
      } catch {
        toast.message(
          'An error occurred while trying to subscribe. Please try again.'
        )
      }
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

  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTeamIndex((prev) => (prev + 1) % mockTeams.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="px-4">
      <div className="h-screen">
        <Header user={user} />
        <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
        <PageHeaderWrapper>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 md:space-y-16"
          >
            <h1 className="text-center text-6xl font-bold text-white lg:text-8xl">
              You don&apos;t have to be a{' '}
              <span className="bg-blue-600 px-2 font-sans leading-relaxed">
                challenger
              </span>{' '}
              to rate pro players
            </h1>
            <div className="mx-auto flex flex-col items-center space-y-8 text-lg leading-[1.4] text-gray-300 md:max-w-3xl md:space-y-10 lg:text-xl">
              <p className="text-center text-lg md:text-2xl">
                Create, share, and analyze tier lists made by passionate for
                League of Legends tournaments.
              </p>
              <p className="text-center text-lg md:text-2xl">
                Join a community of enthusiasts and deepen your game
                understanding.
              </p>
              <div
                role="button"
                onClick={handleCTA}
                className="w-full max-w-lg transform rounded-lg bg-blue-500 py-4 text-center text-lg font-bold capitalize text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
              >
                Create my tier list
              </div>
              <a
                href="#features"
                className="flex items-center gap-2 text-lg leading-6 text-white transition-colors hover:text-blue-400"
              >
                Learn more
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </m.div>
        </PageHeaderWrapper>
      </div>
      <div className="mx-auto flex max-w-screen-lg flex-col gap-40">
        <div
          className="flex flex-col justify-center gap-10 md:flex-row md:items-center md:gap-20"
          id="features"
        >
          <div className="flex flex-col space-y-6">
            <h2 className="max-w-xl text-center text-5xl font-bold text-white md:text-left md:text-5xl">
              Your opinion matters
            </h2>
            <p className="max-w-xl text-center text-xl text-gray-300 md:text-left md:text-2xl">
              Express your views by assigning a ranking to each player on the
              roster and evaluating the team&apos;s overall performance. Your
              input shapes the ultimate tier list!
            </p>
          </div>
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <m.div
                key={currentTeamIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Team
                  logo={mockTeams[currentTeamIndex].logo}
                  name={mockTeams[currentTeamIndex].name}
                  players={mockTeams[currentTeamIndex].players}
                  teamValue={mockTeams[currentTeamIndex].value}
                  disabled
                  id={mockTeams[currentTeamIndex].id}
                />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-5xl font-bold text-white">Unique URLs</h2>
            <p className="max-w-xl text-center text-xl text-gray-300 md:text-2xl">
              Create personalized tier lists with unique URLs that you can
              easily share with your friends, allowing them to explore and
              discuss your rankings effortlessly.
            </p>
          </div>
          <UrlDisplay />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <section className="flex flex-col items-center space-y-6">
            <h2 className="max-w-xl text-5xl font-bold text-white">
              Supported regions
            </h2>
            <p className="max-w-xl text-center text-xl text-gray-300 md:text-2xl">
              Stay up to date with the most exciting tournaments from the top
              esports regions across the globe, featuring the best teams and
              thrilling matches.
            </p>
            <m.div
              variants={parent}
              initial="hidden"
              animate="show"
              className="mx-auto grid grid-cols-2 gap-6 pt-8 md:gap-8 lg:grid-cols-5"
            >
              {SUPPORTED_REGIONS.map((region) => (
                <m.div
                  variants={stat}
                  key={region}
                  className="flex justify-center rounded-lg border-[0.5px] border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                  tabIndex={0}
                >
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/${region}/2023/logo.png`}
                    alt={`${region} logo`}
                    height={80}
                    width={80}
                  />
                </m.div>
              ))}
            </m.div>
          </section>
        </div>
        <section className="mb-10 rounded-2xl border-[1px] border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-white/30 md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Stay Updated
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Join our newsletter to receive the latest updates about tournaments
            and tier lists.
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
                className="flex-1 rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-8 py-3 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg"
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
