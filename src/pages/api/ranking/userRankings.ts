import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

export default async function userRankings(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ status: 'Bad Request', message: 'No user ID provided.' })
  }

  try {
    const result = await prisma.ranking.findMany({
      where: {
        userId
      },
      include: {
        tournament: true
      }
    })

    res.json(result)
  } catch (error) {
    res.json({ error })
  }
}
