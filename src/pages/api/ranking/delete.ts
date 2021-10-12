import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

export default async function deleteRanking(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { rankingId } = req.body

  const ranking = await prisma.ranking.delete({
    where: { id: rankingId }
  })

  res.json(ranking)
}
