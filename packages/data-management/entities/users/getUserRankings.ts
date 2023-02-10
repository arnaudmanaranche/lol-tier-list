import type { Ranking, Tournament } from '@prisma/client'

import { prismaClient } from 'Clients/prisma'

export type TournamentWithoutTeams = Omit<Tournament, 'teams'>
type RankingWithoutTournament = Omit<Ranking, 'tournament' | 'data' | 'createdAt' | 'updatedAt'>

export interface UserRankings extends RankingWithoutTournament {
  tournament: TournamentWithoutTeams
}

export async function getUserRankings(userId: string): Promise<UserRankings[]> {
  const rankings = await prismaClient.ranking.findMany({
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
          event: true,
          region: true,
          pandascore_id: true,
          active: true,
          logo: true,
          logo_base64: true,
          year: true
        }
      }
    }
  })

  return rankings
}
