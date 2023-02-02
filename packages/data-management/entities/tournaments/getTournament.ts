import type { Tournament } from '@prisma/client'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export async function getTournament(tournamentId: string): Promise<Tournament | null> {
  const cachedData = await redis.get(tournamentId)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId
      }
    })

    if (tournament) {
      redis.set(tournamentId, JSON.stringify(tournament), 'ex', ONE_YEAR_IN_SECONDS)

      return tournament
    }

    return null
  }
}
