import type { Tournament } from '@prisma/client'

import { prismaClient } from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../config/redis'
import type { TournamentWithoutTeams } from '../users'

export async function getTournament(tournamentId: string): Promise<Tournament | null> {
  const cachedData = await redisClient.get(`tournament_${tournamentId}`)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournament = await prismaClient.tournament.findUnique({
      where: {
        id: tournamentId
      }
    })

    if (tournament) {
      redisClient.set(
        `tournament_${tournamentId}`,
        JSON.stringify(tournament),
        'EX',
        ONE_YEAR_IN_SECONDS
      )

      return tournament
    }

    return null
  }
}

export async function getTournamentWitoutTeams(
  tournamentId: string
): Promise<TournamentWithoutTeams | null> {
  const cachedData = await redisClient.get(`tournament_${tournamentId}_withoutTeams`)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournament = await prismaClient.tournament.findUnique({
      where: {
        id: tournamentId
      },
      select: {
        teams: false,
        id: true,
        region: true,
        event: true,
        pandascore_id: true,
        active: true,
        logo: true,
        logo_base64: true,
        year: true
      }
    })

    if (tournament) {
      redisClient.set(
        `tournament_${tournamentId}_withoutTeams`,
        JSON.stringify(tournament),
        'EX',
        ONE_YEAR_IN_SECONDS
      )

      return tournament
    }

    return null
  }
}
