import type { Ranking, Tournament } from '@prisma/client'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export type TournamentWithoutTeams = Omit<Tournament, 'teams'>
type RankingWithoutTournament = Omit<Ranking, 'tournament' | 'data' | 'createdAt' | 'updatedAt'>

export interface UserRankings extends RankingWithoutTournament {
  tournament: TournamentWithoutTeams
}

export async function getUserRankings(userId: string): Promise<UserRankings[]> {
  const rankings = await prisma.ranking.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      tournamentId: true,
      data: false,
      userId: true,
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
      }
    }
  })

  redis.set(`${userId}_rankings`, JSON.stringify(rankings), 'ex', ONE_YEAR_IN_SECONDS)

  return rankings
}
