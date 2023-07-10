import type { Ranking } from '@prisma/client'

import { prismaClient } from '../../clients//prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../clients//redis'
import type { TournamentWithoutTeams } from '../tournaments'
import { getTournamentWitoutTeams } from '../tournaments'

type RankingWithoutDates = Omit<Ranking, 'createdAt' | 'updatedAt'>

export interface RankingWithTournamentTeams extends RankingWithoutDates {
  tournament: TournamentWithoutTeams
}

export async function getRanking(rankingId: string): Promise<RankingWithTournamentTeams | null> {
  const cachedData = await redisClient.get<RankingWithTournamentTeams>(`ranking_${rankingId}`)

  if (cachedData) {
    const cachedRanking = cachedData

    // TODO: tournament name and logo are not cached, so we need to fetch them again.
    const tournament = await getTournamentWitoutTeams(cachedRanking.tournamentId)

    if (tournament) {
      cachedRanking.tournament = tournament
      return cachedRanking
    }

    return null
  } else {
    const ranking = await prismaClient.ranking.findUnique({
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
            event: true,
            region: true,
            active: true,
            logo: true,
            logo_base64: true,
            year: true
          }
        },
        teamValue: true,
        userId: true
      }
    })

    if (ranking) {
      await redisClient.set(`ranking_${rankingId}`, JSON.stringify(ranking), {
        ex: ONE_YEAR_IN_SECONDS
      })

      return ranking
    }

    return null
  }
}
