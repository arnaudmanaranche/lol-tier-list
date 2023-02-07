import type { Ranking } from '@prisma/client'
import type { JsonValue } from 'type-fest'

import prisma from '../../config/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from '../../config/redis'

export async function updateRanking(ranking: Ranking): Promise<Ranking> {
  const formattedRanking = ranking as unknown as JsonValue

  const updatedRanking = await prisma.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: formattedRanking
    }
  })

  redis.set(updatedRanking.id, JSON.stringify(updatedRanking), 'EX', ONE_YEAR_IN_SECONDS)

  return updatedRanking
}
