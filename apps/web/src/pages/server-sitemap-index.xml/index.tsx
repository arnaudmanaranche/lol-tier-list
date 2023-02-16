import type { GetServerSideProps } from 'next'
import { getServerSideSitemapIndex } from 'next-sitemap'

import { apiInstance } from 'Utils/api'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const urls = []

  const { data } = await apiInstance.get<{ id: string }[]>('/rankings')

  data.map(({ id }) => urls.push(`https://lol-power-ranking.vercel.app/rankings/${id}`))

  return getServerSideSitemapIndex(ctx, urls)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {}
