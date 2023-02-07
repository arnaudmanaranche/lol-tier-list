import type { Tournament } from '@prisma/client'
import { getPlaiceholder } from 'plaiceholder'

import type { PLAYER } from '@lpr/types'

import prisma from '../../config/prisma'

export const LINEUP_ORDER = ['top', 'jun', 'mid', 'adc', 'sup']

export interface TournamentData {
  tournamentId: string
  tournamentRegion: string
  tournamentLogo: string
  tournamentEvent: string
  tournamentYear: number
}

export async function createTournament(data: TournamentData): Promise<Tournament> {
  // TODO: type teams
  const organizedTeams = []

  const unorganizedTeams = await fetch(
    `https://api.pandascore.co/tournaments/${data.tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
  ).then((response) => response.json())

  await Promise.all(
    unorganizedTeams.rosters.map(
      async ({
        acronym,
        id,
        name,
        players: unorganizedPlayers
      }: {
        acronym: string
        id: number
        name: string
        players: PLAYER[]
      }) => {
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
        }.supabase.co/storage/v1/object/public/${data.tournamentRegion.toLowerCase()}/${
          acronym ? acronym.toLowerCase() : ''.toLowerCase()
        }.png`

        const { base64 } = await getPlaiceholder(teamLogo)

        organizedTeams.push({
          acronym,
          id,
          name,
          players: organizedPlayers,
          logo: teamLogo,
          base64
        })
      }
    )
  )

  const { base64 } = await getPlaiceholder(data.tournamentLogo)

  const tournament = await prisma.tournament.create({
    data: {
      name: `${data.tournamentRegion} - ${data.tournamentEvent} (${data.tournamentYear})`,
      pandascoreId: parseInt(data.tournamentId),
      teams: organizedTeams,
      logo: data.tournamentLogo,
      year: data.tournamentYear,
      base64
    }
  })

  // await apiInstance.get(`/revalidate?secret=${process.env.REVALIDATE_SECRET}&path=tournaments`)

  return tournament
}
