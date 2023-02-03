import type { Tournament } from '@prisma/client'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'
import type { TournamentWithoutTeams } from '../users'

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

export async function getTournamentWitoutTeams(
  tournamentId: string
): Promise<TournamentWithoutTeams | null> {
  const cachedData = await redis.get(`${tournamentId}_withoutTeams`)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const tournament = await prisma.tournament.findUnique({
      where: {
        id: tournamentId
      },
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

    if (tournament) {
      redis.set(
        `${tournamentId}_withoutTeams`,
        JSON.stringify(tournament),
        'ex',
        ONE_YEAR_IN_SECONDS
      )

      return tournament
    }

    return null
  }
}
