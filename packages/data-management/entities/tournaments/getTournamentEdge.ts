import type { Tournament } from '@prisma/client'

import prisma from '../../config/prisma-edge'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export async function getTournamentEdge(tournamentId: string): Promise<Tournament | null> {
  const cachedData = await redis.get(`tournament_${tournamentId}`)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId
      }
    })

    if (tournament) {
      redis.set(`tournament_${tournamentId}`, JSON.stringify(tournament), 'EX', ONE_YEAR_IN_SECONDS)

      return tournament
    }

    return null
  }
}
