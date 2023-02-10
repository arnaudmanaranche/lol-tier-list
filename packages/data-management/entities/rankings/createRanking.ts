import type { Prisma, Ranking } from '@prisma/client'

import { prismaClient } from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../config/redis'

export async function createRanking(
  ranking: Ranking,
  tournamentId: string,
  userId: string
): Promise<Ranking> {
  const createdRanking = await prismaClient.ranking.create({
    data: {
      data: ranking as unknown as Prisma.InputJsonValue,
      userId,
      tournamentId: tournamentId
    }
  })

  redisClient.set(
    `ranking_${createdRanking.id}`,
    JSON.stringify(createdRanking),
    'EX',
    ONE_YEAR_IN_SECONDS
  )

  return createdRanking
}
