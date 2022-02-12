import { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import initRedis from 'Utils/redis'

async function deleteRanking(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  const {
    preview,
    body: { rankingId }
  } = req

  const redis = initRedis(preview)

  const ranking = await prisma.ranking.delete({
    where: { id: rankingId }
  })

  if (!preview) redis.del(ranking.id)

  res.json(ranking)
}

export default withSentry(deleteRanking)
