import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

async function deleteRanking(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { rankingId } = req.body

  const ranking = await prisma.ranking.delete({
    where: { id: rankingId }
  })

  res.json(ranking)
}

export default withSentry(deleteRanking)
