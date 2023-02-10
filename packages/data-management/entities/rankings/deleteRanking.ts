import { prismaClient } from 'Clients/prisma'
import { redisClient } from 'Clients/redis'

export async function deleteRanking(id: string): Promise<void> {
  const ranking = await prismaClient.ranking.delete({
    where: { id }
  })

  redisClient.del(`ranking_${ranking.id}`)
}
