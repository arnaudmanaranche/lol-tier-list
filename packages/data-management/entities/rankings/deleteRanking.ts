import { prismaClient } from '../../config/prisma'
import { redis } from '../../config/redis'

export async function deleteRanking(id: string): Promise<void> {
  const ranking = await prismaClient.ranking.delete({
    where: { id }
  })

  redis.del(`ranking_${ranking.id}`)
}
