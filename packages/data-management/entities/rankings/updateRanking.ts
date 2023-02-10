import type { Prisma, Ranking } from '@prisma/client'

import { prismaClient } from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export async function updateRanking(ranking: Ranking): Promise<Ranking> {
  const updatedRanking = await prismaClient.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: ranking.data as unknown as Prisma.InputJsonValue
    }
  })

  redis.set(
    `ranking_${updatedRanking.id}`,
    JSON.stringify(updatedRanking),
    'EX',
    ONE_YEAR_IN_SECONDS
  )

  return updatedRanking
}
