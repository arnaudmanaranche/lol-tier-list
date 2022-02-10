import { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import redis, { ONE_YEAR_IN_SECONDS } from 'Utils/redis'

async function updateRanking(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  const {
    preview,
    body: { ranking }
  } = req

  const result = await prisma.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: ranking.data
    }
  })

  if (!preview) redis.set(result.id, JSON.stringify(result), 'ex', ONE_YEAR_IN_SECONDS)

  res.json(result)
}

export default withSentry(updateRanking)
