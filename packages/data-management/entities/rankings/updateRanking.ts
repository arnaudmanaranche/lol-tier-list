import type { Prisma, Ranking } from '@prisma/client'

import { prismaClient } from 'Clients/prisma'
import { ONE_YEAR_IN_SECONDS, redisClient } from 'Clients/redis'

export async function updateRanking(ranking: Ranking): Promise<Ranking> {
  const updatedRanking = await prismaClient.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: ranking.data as unknown as Prisma.InputJsonValue
    }
  })

  redisClient.set(
    `ranking_${updatedRanking.id}`,
    JSON.stringify(updatedRanking),
    'EX',
    ONE_YEAR_IN_SECONDS
  )

  return updatedRanking
}
