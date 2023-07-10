import type { Prisma, Ranking } from '@prisma/client'

import { prismaClient } from '../../clients/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../clients/redis'

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

  await redisClient.set(`ranking_${createdRanking.id}`, JSON.stringify(createdRanking), {
    ex: ONE_YEAR_IN_SECONDS
  })

  return createdRanking
}
