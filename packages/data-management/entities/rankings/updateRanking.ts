import type { Prisma, Ranking } from '@prisma/client'

import { prismaClient } from '../../clients/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from '../../clients/redis'

export async function updateRanking(ranking: Ranking): Promise<Ranking> {
  const updatedRanking = await prismaClient.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: ranking.data as unknown as Prisma.InputJsonValue
    }
  })

  await redisClient.set(`ranking_${updatedRanking.id}`, JSON.stringify(updatedRanking), {
    ex: ONE_YEAR_IN_SECONDS
  })

  return updatedRanking
}
