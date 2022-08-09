import type { Ranking } from '@prisma/client'
import type { JsonValue } from 'type-fest'

import prisma from 'Utils/prisma'
import redis, { ONE_YEAR_IN_SECONDS } from 'Utils/redis'

async function createRanking(
  ranking: Ranking,
  tournamentId: string,
  userId: string
): Promise<Ranking> {
  const formattedRanking = ranking as unknown as JsonValue

  const result = await prisma.ranking.create({
    data: {
      data: formattedRanking,
      userId,
      tournamentId: tournamentId
    }
  })

  redis.set(result.id, JSON.stringify(result), 'ex', ONE_YEAR_IN_SECONDS)

  return result
}

export default createRanking
