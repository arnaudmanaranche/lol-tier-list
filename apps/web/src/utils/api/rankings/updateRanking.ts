import type { Ranking } from '@prisma/client'
import type { JsonValue } from 'type-fest'

import type { RANKING } from '@lpr/types'

import prisma from 'Utils/prisma'
import { ONE_YEAR_IN_SECONDS, redis } from 'Utils/redis'

export async function updateRanking(ranking: RANKING): Promise<Ranking> {
  const formattedRanking = ranking as unknown as JsonValue

  const result = await prisma.ranking.update({
    where: {
      id: ranking.id
    },
    data: {
      data: formattedRanking
    }
  })

  redis.set(result.id, JSON.stringify(result), 'ex', ONE_YEAR_IN_SECONDS)

  return result
}
