import type { Ranking } from '@prisma/client'

import { prismaClient } from '../../clients/prisma'
import type { TournamentWithoutTeams } from '../tournaments/getTournaments'

type RankingWithoutTournament = Omit<
  Ranking,
  'tournament' | 'data' | 'createdAt' | 'updatedAt' | 'teamValue'
>

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
          active: true,
          logo: true,
          logo_base64: true,
          year: true
        }
      },
      teamValue: false
    }
  })

  return rankings
}
