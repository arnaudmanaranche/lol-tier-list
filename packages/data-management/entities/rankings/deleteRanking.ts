import { prismaClient } from '../../config/prisma'
import { redisClient } from '../../config/redis'

export async function deleteRanking(id: string): Promise<void> {
  const ranking = await prismaClient.ranking.delete({
    where: { id }
  })

  redisClient.del(`ranking_${ranking.id}`)
}
