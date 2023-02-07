import prisma from '../../config/prisma'
import { redis } from '../../config/redis'

export async function deleteRanking(id: string): Promise<void> {
  const ranking = await prisma.ranking.delete({
    where: { id }
  })

  redis.del(ranking.id)
}
