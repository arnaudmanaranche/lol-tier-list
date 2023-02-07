import type { Ranking } from '@prisma/client'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'
import { getTournamentWitoutTeams } from '../tournaments'
import type { TournamentWithoutTeams } from '../users'

type RankingWithoutDates = Omit<Ranking, 'createdAt' | 'updatedAt'>

export interface RankingWithTournamentTeams extends RankingWithoutDates {
  tournament: TournamentWithoutTeams
}

export async function getRanking(rankingId: string): Promise<RankingWithTournamentTeams | null> {
  const cachedData = await redis.get(`ranking_${rankingId}`)

  if (cachedData) {
    const cachedRanking = JSON.parse(cachedData)

    // TODO: tournament name and logo are not cached, so we need to fetch them again.
    const tournament = await getTournamentWitoutTeams(cachedRanking.tournamentId)

    if (tournament) {
      cachedRanking.tournament = tournament
      return cachedRanking
    }

    return null
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
            event: true,
            region: true,
            pandascore_id: true,
            active: true,
            logo: true,
            logo_base64: true,
            year: true
          }
        },
        userId: true
      }
    })

    if (ranking) {
      redis.set(`ranking_${rankingId}`, JSON.stringify(ranking), 'EX', ONE_YEAR_IN_SECONDS)

      return ranking
    }

    return null
  }
}
