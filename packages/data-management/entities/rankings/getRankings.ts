import { prismaClient } from 'Clients/prisma'

export async function getRankings(): Promise<{ id: string }[]> {
  const rankings = await prismaClient.ranking.findMany({
    select: {
      id: true,
      tournamentId: false,
      data: false,
      tournament: false
    }
  })

  return rankings
}
