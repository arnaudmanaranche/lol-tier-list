import { prismaClient } from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../config/redis'
import type { TournamentWithoutTeams } from '../users'

const REDIS_CACHE_KEY = 'tournamentsList'

export async function getTournaments(): Promise<TournamentWithoutTeams[]> {
  const cachedData = await redisClient.get(REDIS_CACHE_KEY)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournaments = await prismaClient.tournament.findMany({
      select: {
        teams: false,
        id: true,
        event: true,
        pandascore_id: true,
        active: true,
        region: true,
        logo: true,
        logo_base64: true,
        year: true
      }
    })

    redisClient.set(REDIS_CACHE_KEY, JSON.stringify(tournaments), 'EX', ONE_YEAR_IN_SECONDS)

    return tournaments
  }
}
