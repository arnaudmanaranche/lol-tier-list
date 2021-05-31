import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

export default async function updateTournament(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { tournamentId, status, teams } = req.body

  const result = await prisma.tournament.update({
    where: {
      id: tournamentId
    },
    data: {
      teams,
      status
    }
  })

  res.json(result)
}
