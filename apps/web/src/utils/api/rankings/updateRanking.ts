import { Ranking } from '@prisma/client'
import { JsonValue } from 'type-fest'

import { RANKING } from '@lpr/types'

import prisma from 'Utils/prisma'
import redis, { ONE_YEAR_IN_SECONDS } from 'Utils/redis'

async function updateRanking(ranking: RANKING): Promise<Ranking> {
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

export default updateRanking
