import { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import initRedis, { ONE_YEAR_IN_SECONDS } from 'Utils/redis'

async function createRanking(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  const {
    preview,
    body: { ranking, tournamentId, userId }
  } = req

  const redis = initRedis(preview)

  const result = await prisma.ranking.create({
    data: {
      data: ranking,
      userId,
      tournamentId: tournamentId
    }
  })

  if (!preview) redis.set(result.id, JSON.stringify(result), 'ex', ONE_YEAR_IN_SECONDS)

  res.json(result)
}

export default withSentry(createRanking)
