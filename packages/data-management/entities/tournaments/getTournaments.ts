import { prismaClient } from 'Clients/prisma'
import { redisClient } from 'Clients/redis'
import type { TournamentWithoutTeams } from 'Entities/users'

const REDIS_CACHE_KEY = 'tournamentsList'

export async function getTournaments(): Promise<TournamentWithoutTeams[]> {
  const cachedData = await redisClient.get<TournamentWithoutTeams[]>(REDIS_CACHE_KEY)

  if (cachedData) {
    return cachedData
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

    // await redisClient.set(REDIS_CACHE_KEY, JSON.stringify(tournaments), {
    //   ex: ONE_YEAR_IN_SECONDS
    // })

    return tournaments
  }
}
