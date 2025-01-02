import type { User } from '@supabase/supabase-js'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import { m } from 'framer-motion'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Image from 'next/legacy/image'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import type { FormEvent } from 'react'
import { type ReactNode, useEffect } from 'react'
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

  return (
    <div className="px-4">
      <div className="md:h-screen">
        <Header user={user} />
        <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
        <PageHeaderWrapper>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-12 md:space-y-16"
          >
            <h1 className="text-center text-5xl font-bold text-white lg:text-8xl">
              You don&apos;t have to be a{' '}
              <span
                className="rounded-md bg-[#6036a2] px-4 font-sans leading-relaxed"
                id="bg"
              >
                challenger
              </span>{' '}
              to rate pro players
            </h1>
            <div className="mx-auto flex flex-col items-center space-y-10 text-lg leading-[1.4] text-gray-100 md:max-w-3xl md:space-y-20 lg:text-xl">
              <div className="space-y-4">
                <p className="text-center text-lg md:text-xl">
                  Create, share, and analyze tier lists made by passionate for
                  League of Legends tournaments.
                </p>
                <p className="text-center text-lg md:text-xl">
                  Join a community of enthusiasts and deepen your game
                  understanding.
                </p>
              </div>
              <div
                role="button"
                onClick={handleCTA}
                className="w-full max-w-lg transform rounded-lg bg-[#6036a2] bg-gradient-to-r py-4 text-center font-sans text-2xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Create my tier list
              </div>
            </div>
          </m.div>
        </PageHeaderWrapper>
      </div>
      <div className="mx-auto flex max-w-screen-lg flex-col gap-20 md:gap-40">
        <section
          className="flex flex-col justify-center gap-10 md:flex-row md:items-center md:gap-20"
          id="features"
        >
          <div className="flex flex-col space-y-6">
            <h2 className="max-w-xl text-center text-3xl font-bold text-white md:text-left md:text-5xl">
              Your opinion matters
            </h2>
            <p className="max-w-xl text-center text-lg text-gray-100 md:text-left md:text-xl">
              Express your views by assigning a ranking to each player on the
              roster and evaluating the team&apos;s overall performance. Your
              input shapes the ultimate tier list!
            </p>
          </div>
          <div className="relative flex-1">
            <Team
              logo={mockTeams[0].logo}
              name={mockTeams[0].name}
              players={mockTeams[0].players}
              disabled={false}
              teamValue={mockTeams[0].value}
              id={mockTeams[0].id}
            />
            <span className="max-md:-translate-x-1/5 absolute -right-[82px] top-5 hidden translate-y-full -rotate-3 flex-nowrap items-center gap-0.5 whitespace-nowrap tracking-wide text-white max-md:bottom-1 md:flex lg:text-xl">
              <span className="opacity-100">
                <svg
                  className="h-12 w-12 rotate-180 fill-white"
                  viewBox="0 0 130 130"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M60.9866 102.011C75.5791 112.188 92.2457 119.614 108.76 118.142C114.825 117.601 120.44 115.34 126.202 113.089C126.708 112.891 126.959 112.318 126.761 111.813C126.564 111.307 125.991 111.055 125.486 111.253C119.899 113.436 114.463 115.655 108.587 116.178C92.3221 117.629 75.9409 110.146 61.6177 100.05C61.6659 99.904 61.7161 99.7581 61.7664 99.6122C62.8717 96.4058 62.1703 91.7303 60.3636 86.8178C57.7429 79.686 52.8573 72.0229 48.4641 67.7902C46.4383 65.8366 44.4768 64.6098 42.8751 64.3519C41.5406 64.1357 40.3951 64.5004 39.5108 65.5345C38.7833 66.3888 38.3673 67.4776 38.2447 68.7539C38.0819 70.4574 38.4477 72.5256 39.2174 74.7761C42.0652 83.1034 50.4316 94.0615 54.9675 97.5779C56.3884 98.6797 57.8334 99.7607 59.3045 100.818C59.0111 101.74 58.7277 102.621 58.38 103.433C57.8696 104.626 57.2244 105.663 56.1352 106.411C54.1255 107.791 51.7158 108.026 49.2519 107.666C45.3068 107.093 41.2271 105.009 38.2186 103.222C21.2968 93.1733 12.9424 75.7346 8.44871 58.2386C3.90274 40.5446 3.30786 22.7699 1.96336 12.2859C1.89302 11.7467 1.39863 11.3638 0.860028 11.4341C0.321425 11.5018 -0.0604183 11.9968 0.00791197 12.5359C1.36045 23.0773 1.9714 40.9432 6.53948 58.7283C11.1598 76.7114 19.8197 94.5877 37.2137 104.918C40.4152 106.817 44.7703 109.005 48.9685 109.617C51.9369 110.047 54.8289 109.698 57.2486 108.036C58.6594 107.067 59.5316 105.749 60.1908 104.21C60.4862 103.519 60.7394 102.78 60.9866 102.011ZM59.9436 98.8516C60.8761 95.976 60.1144 91.8475 58.5147 87.4976C55.9965 80.6445 51.3179 73.2757 47.0975 69.2071C45.6827 67.8449 44.3382 66.8577 43.1504 66.4487C42.2923 66.1518 41.5426 66.1883 41.0101 66.8134C40.3971 67.5323 40.166 68.5143 40.176 69.6604C40.1861 70.981 40.5217 72.5048 41.0824 74.1405C43.8136 82.1266 51.8243 92.6498 56.1734 96.0203C57.4113 96.9788 58.6694 97.9244 59.9436 98.8516Z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M127.814 110.052C127.747 110.502 127.522 111.075 127.263 111.677C126.678 113.039 125.846 114.493 125.476 115.196C125.225 115.678 125.41 116.274 125.892 116.527C126.375 116.78 126.97 116.592 127.223 116.11C127.673 115.251 128.774 113.323 129.365 111.727C129.669 110.906 129.832 110.151 129.799 109.606C129.765 109.072 129.548 108.713 129.239 108.458C128.913 108.189 128.409 108.03 127.735 108.051C126.996 108.075 125.941 108.309 124.781 108.395C123.808 108.468 122.745 108.437 121.779 107.952C121.292 107.707 120.699 107.903 120.456 108.39C120.213 108.874 120.408 109.468 120.894 109.71C122.707 110.622 124.765 110.424 126.391 110.19C126.875 110.119 127.476 110.073 127.814 110.052Z"
                  ></path>
                </svg>
                click me
              </span>
            </span>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Unique URLs
            </h2>
            <p className="max-w-xl text-center text-lg text-gray-100 md:text-xl">
              Create personalized tier lists with unique URLs that you can
              easily share with your friends, allowing them to explore and
              discuss your rankings effortlessly.
            </p>
          </div>
          <UrlDisplay />
        </section>
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="max-w-xl text-3xl font-bold text-white md:text-5xl">
              Supported regions
            </h2>
            <p className="max-w-xl text-center text-lg text-gray-100 md:text-xl">
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
                    src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/${region}/${new Date().getFullYear()}/logo.png`}
                    alt={`${region} logo`}
                    height={80}
                    width={80}
                  />
                </m.div>
              ))}
            </m.div>
          </div>
        </section>
        <section className="mb-10 rounded-2xl border-[1px] border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-8 text-center backdrop-blur-sm transition-colors hover:border-white/30 md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Stay Updated
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-100 md:text-xl">
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
