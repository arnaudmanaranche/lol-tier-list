import type { GetServerSideProps } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

import { apiInstance } from 'Utils/api'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = []

  const { data } = await apiInstance.get<{ id: string }[]>('/rankings')

  data.map(({ id }) =>
    fields.push({
      loc: `https://lol-power-ranking.vercel.app/rankings/${id}`,
      lastmod: new Date().toISOString()
    })
  )

  return getServerSideSitemap(ctx, fields)
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
