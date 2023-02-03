import type { Ranking } from '@prisma/client'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'
import type { TournamentWithoutTeams } from '../users'

type RankingWithoutDates = Omit<Ranking, 'createdAt' | 'updatedAt'>

export interface RankingWithTournament extends RankingWithoutDates {
  tournament: TournamentWithoutTeams
}

export async function getRanking(rankingId: string): Promise<RankingWithTournament | null> {
  const cachedData = await redis.get(rankingId)

  if (cachedData) {
    return JSON.parse(cachedData)
  } else {
    const ranking = await prisma.ranking.findUnique({
      where: {
        id: rankingId
      },
      select: {
        id: true,
        tournamentId: true,
        data: true,
        tournament: {
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
        },
        userId: true
      }
    })

    if (ranking) {
      redis.set(rankingId, JSON.stringify(ranking), 'ex', ONE_YEAR_IN_SECONDS)

      return ranking
    }

    return null
  }
}
