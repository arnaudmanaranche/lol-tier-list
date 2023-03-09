import type { Tournament } from '@prisma/client'
import { getPlaiceholder } from 'plaiceholder'

import type { PLAYER, TEAM } from '@lpr/types'

import { prismaClient } from 'Clients/prisma'
import type { PandaScoreTournament } from 'Pandascore/types'

const LINEUP_ORDER = ['top', 'jun', 'mid', 'adc', 'sup']

export interface TournamentData {
  tournamentId: string
  tournamentRegion: string
  tournamentLogo: string
  tournamentEvent: string
  tournamentYear: number
}

export async function createTournament(data: TournamentData): Promise<Tournament> {
  const { tournamentEvent, tournamentId, tournamentLogo, tournamentRegion, tournamentYear } = data

  const organizedTeams: TEAM[] = []

  const pandaScoreTournament: PandaScoreTournament = await fetch(
    `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
  ).then((response) => response.json())

  await Promise.all(
    pandaScoreTournament.rosters.map(async ({ acronym, id, name, players: unorganizedPlayers }) => {
      const organizedPlayers: PLAYER[] = []

      unorganizedPlayers.sort(
        (a: PLAYER, b: PLAYER) => LINEUP_ORDER.indexOf(a.role) - LINEUP_ORDER.indexOf(b.role)
      )

      unorganizedPlayers.map(({ id, name, role }) => {
        organizedPlayers.push({
          id,
          name,
          role
        })
      })

      const teamLogo = `https://${
        process.env.NEXT_PUBLIC_SUPABASE_ID
      }.supabase.co/storage/v1/object/public/${tournamentRegion.toLowerCase()}/${tournamentYear}/${
        acronym ? acronym.toLowerCase() : ''.toLowerCase()
      }.png`

      const { base64 } = await getPlaiceholder(teamLogo)

      organizedTeams.push({
        acronym,
        id,
        name,
        players: organizedPlayers,
        logo: teamLogo,
        logo_base64: base64
      })
    })
  )

  const { base64 } = await getPlaiceholder(tournamentLogo)

  const tournament = await prismaClient.tournament.create({
    data: {
      event: tournamentEvent,
      region: tournamentRegion,
      pandascore_id: parseInt(tournamentId),
      // @ts-expect-error TODO: type Prisma.JsonValue
      teams: organizedTeams,
      logo: tournamentLogo,
      year: tournamentYear,
      logo_base64: base64
    }
  })

  return tournament
}
