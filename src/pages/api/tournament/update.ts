import { Tournament } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'

async function updateTournament(
  req: NextApiRequest,
  res: NextApiResponse<Tournament>
): Promise<void> {
  const { tournamentId, status, teams } = req.body

  const tournament = await prisma.tournament.update({
    where: {
      id: tournamentId
    },
    data: {
      teams,
      status
    }
  })

  res.json(tournament)
}

export default withSentry(updateTournament)
