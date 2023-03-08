import { prismaClient } from 'Clients/prisma'
import type { TournamentWithoutTeams } from 'Entities/users'

export async function getTournaments(): Promise<TournamentWithoutTeams[]> {
  const tournaments = await prismaClient.tournament.findMany({
    select: {
      teams: false,
      id: true,
      event: true,
      pandascore_id: true,
      active: true,
      region: true,
      logo: true,
      logo_base64: true,
      year: true
    }
  })

  return tournaments
}
