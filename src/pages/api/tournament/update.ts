import { Tournament } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from 'Utils/prisma'
import initRedis, { ONE_YEAR_IN_SECONDS } from 'Utils/redis'

async function updateTournament(
  req: NextApiRequest,
  res: NextApiResponse<Tournament>
): Promise<void> {
  const {
    preview,
    body: { tournamentId, status, teams }
  } = req

  const redis = initRedis(preview)

  const tournament = await prisma.tournament.update({
    where: {
      id: tournamentId
    },
    data: {
      teams,
      status
    }
  })

  if (!preview) redis.set(tournament.id, JSON.stringify(tournament), 'ex', ONE_YEAR_IN_SECONDS)

  res.json(tournament)
}

export default withSentry(updateTournament)
