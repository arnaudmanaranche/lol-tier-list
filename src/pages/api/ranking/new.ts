import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

export default async function createRanking(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { ranking, tournamentId } = req.body

  const result = await prisma.ranking.create({
    data: {
      data: ranking,
      tournamentId
    }
  })

  res.json(result)
}
