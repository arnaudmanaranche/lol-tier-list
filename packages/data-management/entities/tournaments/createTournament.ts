import type { Tournament } from '@prisma/client'
import { getPlaiceholder } from 'plaiceholder'

import { prismaClient } from 'Clients/prisma'
import { fetchPandascoreTournamentsRosters } from 'Pandascore/fetchTournamentsRosters'

export interface TournamentData {
  tournamentId: string[]
  tournamentRegion: string
  tournamentLogo: string
  tournamentEvent: string
  tournamentYear: number
}

export async function createTournament(data: TournamentData): Promise<Tournament> {
  const { tournamentEvent, tournamentId, tournamentLogo, tournamentRegion, tournamentYear } = data

  const organizedTeams = await fetchPandascoreTournamentsRosters(
    tournamentId,
    tournamentRegion,
    tournamentYear
  )

  const { base64 } = await getPlaiceholder(tournamentLogo)

  const tournament = await prismaClient.tournament.create({
    data: {
      event: tournamentEvent,
      region: tournamentRegion,
      // To be removed
      pandascore_id: 0,
      // @ts-expect-error TODO: type Prisma.JsonValue
      teams: organizedTeams,
      logo: tournamentLogo,
      year: tournamentYear,
      logo_base64: base64
    }
  })

  return tournament
}
