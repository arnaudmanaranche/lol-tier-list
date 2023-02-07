import type { Ranking } from '@prisma/client'
import type { JsonValue } from 'type-fest'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export async function createRanking(
  ranking: Ranking,
  tournamentId: string,
  userId: string
): Promise<Ranking> {
  const formattedRanking = ranking as unknown as JsonValue

  const createdRanking = await prisma.ranking.create({
    data: {
      data: formattedRanking,
      userId,
      tournamentId: tournamentId
    }
  })

  redis.set(createdRanking.id, JSON.stringify(createdRanking), 'ex', ONE_YEAR_IN_SECONDS)

  return createdRanking
}
