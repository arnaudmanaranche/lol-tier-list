import { prismaClient } from '../../clients/prisma'
import { redisClient } from '../../clients/redis'

export async function deleteRanking(id: string): Promise<void> {
  const ranking = await prismaClient.ranking.delete({
    where: { id }
  })

  await redisClient.del(`ranking_${ranking.id}`)
}
