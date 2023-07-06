import type { Tournament } from '@prisma/client'
import { getPlaiceholder } from 'plaiceholder'

import { prismaClient } from 'Clients/prisma'
import { fetchPandascoreTournamentsRosters } from 'Pandascore/fetchTournamentsRosters'
import { pandaScoreTournamentRostersToProdigyTeams } from 'Utils/pandaScoreTournamentRostersToProdigyTeams'

export interface TournamentData {
  tournamentId: string[]
  tournamentRegion: string
  tournamentLogo: string
  tournamentEvent: string
  tournamentYear: number
}

export async function createTournament(data: TournamentData): Promise<Tournament> {
  const { tournamentEvent, tournamentId, tournamentLogo, tournamentRegion, tournamentYear } = data

  const pandascoreTournamentsRosters = await fetchPandascoreTournamentsRosters(tournamentId)

  const organizedTeams = await pandaScoreTournamentRostersToProdigyTeams(
    pandascoreTournamentsRosters,
    tournamentRegion,
    tournamentYear
  )

  const { base64 } = await getPlaiceholder(tournamentLogo)

  const tournament = await prismaClient.tournament.create({
    data: {
      event: tournamentEvent,
      region: tournamentRegion,
      // @ts-expect-error Type 'TEAM[]' can be assignable to type 'JsonNull | InputJsonValue'
      teams: organizedTeams,
      logo: tournamentLogo,
      year: tournamentYear,
      logo_base64: base64
    }
  })

  await fetch(
    `https://lol-power-ranking.vercel.app/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=tournaments`
  )

  return tournament
}
