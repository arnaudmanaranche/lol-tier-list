import { track } from '@cronitorio/cronitor-rum'
import { DailyGuess } from '@lol-tier-list/shared/components'
import { storage } from '@lol-tier-list/shared/storage'
import { createClient as createServerPropsClient } from 'clients/supabase/server-props'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import type { PandaScoreTournamentWithExpectedRosters } from 'providers/pandascore/types'
import type { ReactNode } from 'react'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { WEBSITE_URL } from '@/utils/constants'

interface PageProps {
  roster: {
    team: {
      id: number
      name: string
    }
    players: {
      name: string
    }[]
  }
  tournamentName: string
}

const Page = ({
  roster,
  tournamentName
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactNode => {
  const handleSupportPress = () => {
    window.open('https://buymeacoffee.com/arnaudmanaranche', '_blank')
  }

  const handleTrack = (event: string) => {
    track(event)
  }

  return (
    <>
      <Head>
        <meta name="og:image" content={`${WEBSITE_URL}/opengraph_v2.png`} />
        <meta
          name="twitter:image"
          content={`${WEBSITE_URL}/opengraph_v2.png`}
        />
      </Head>
      <div>
        <div>
          <Header user={null} />
          <div className="bgGradient absolute inset-0 -top-[90px] -z-10 opacity-20 blur-3xl" />
        </div>
        <DailyGuess
          roster={roster}
          tournamentName={tournamentName}
          storage={storage}
          onSupportPress={handleSupportPress}
          onTrack={handleTrack}
        />
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps = (async (context) => {
  const supabaseClient = createServerPropsClient(context)

  const { data, error } = await supabaseClient
    .from('daily-guess')
    .select('*')
    .lte('created_at', new Date().toISOString())
    .order('created_at', { ascending: false })
    .limit(1)

  if (error) {
    return {
      notFound: true
    }
  }

  const response = await fetch(
    `https://api.pandascore.co/tournaments/${data[0]?.tournament_id}?token=${process.env.PANDASCORE_TOKEN}`
  )

  const { expected_roster, league, begin_at } =
    (await response.json()) as PandaScoreTournamentWithExpectedRosters

  const roster = expected_roster.find((r) => r.team.id === data[0]?.team_id)

  if (!roster) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      roster,
      tournamentName: `${new Date(begin_at).getFullYear()} ${league.name}`
    }
  }
}) satisfies GetServerSideProps<PageProps>

export default Page
