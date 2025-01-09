import type { GetServerSideProps } from 'next'
import type { ISitemapField } from 'next-sitemap'
import { getServerSideSitemapLegacy } from 'next-sitemap'
import type {
  TierListWithTournamentAndUsername,
  TournamentWithoutTeams
} from 'types'

import { apiInstance } from '@/utils/api'
import { WEBSITE_URL } from '@/utils/constants'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: upcomingTournaments } =
    await apiInstance.get<TournamentWithoutTeams[]>(`/tournaments`)

  const { data: tierLists } =
    await apiInstance.get<TierListWithTournamentAndUsername[]>(`/tier-lists`)

  const fields: ISitemapField[] = []

  upcomingTournaments.map((tournament) => {
    fields.push({
      loc: `${WEBSITE_URL}/tournaments/${tournament.region}/${tournament.year}/${tournament.event}`,
      lastmod: new Date().toISOString()
    })
  })

  tierLists.map((tierList) => {
    fields.push({
      loc: `${WEBSITE_URL}/tier-list/${tierList.tournament.region}/${tierList.tournament.year}/${tierList.tournament.event}/${tierList.user.username}`,
      lastmod: new Date().toISOString()
    })
  })

  return getServerSideSitemapLegacy(ctx, fields)
}

export default function SitemapIndex(): undefined {}
