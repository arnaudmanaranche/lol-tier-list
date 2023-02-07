import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'
import type { TournamentWithoutTeams } from '../users'

export async function getTournaments(): Promise<TournamentWithoutTeams[]> {
  const tournaments = await prisma.tournament.findMany({
    select: {
      teams: false,
      id: true,
      name: true,
      pandascoreId: true,
      status: true,
      logo: true,
      base64: true,
      year: true
    }
  })

  redis.set('tournamentsList', JSON.stringify(tournaments), 'ex', ONE_YEAR_IN_SECONDS)

  return tournaments
}
