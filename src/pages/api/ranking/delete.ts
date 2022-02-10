import { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

async function deleteRanking(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  const { rankingId } = req.body

  const ranking = await prisma.ranking.delete({
    where: { id: rankingId }
  })

  res.json(ranking)
}

export default withSentry(deleteRanking)
