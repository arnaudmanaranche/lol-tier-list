import { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import redis from 'Utils/redis'

async function deleteRanking(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  const {
    body: { rankingId }
  } = req

  const ranking = await prisma.ranking.delete({
    where: { id: rankingId }
  })

  redis.del(ranking.id)

  res.json(ranking)
}

export default withSentry(deleteRanking)
