import { getPlaiceholder } from 'plaiceholder'

import type { PLAYER, TEAM } from '@lpr/types'

import type { PandaScoreTournament } from './types'

const LINEUP_ORDER = ['top', 'jun', 'mid', 'adc', 'sup']

export async function fetchPandascoreTournamentsRosters(
  tournamentIds: string[],
  tournamentRegion: string,
  tournamentYear: number
) {
  const organizedTeams: TEAM[] = []

  await Promise.all(
    tournamentIds.map(async (tournamentId) => {
      const pandaScoreTournament: PandaScoreTournament = await fetch(
        `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
      ).then((response) => response.json())

      await Promise.all(
        pandaScoreTournament.rosters.map(
          async ({ acronym, id, name: tournamentName, players: unorganizedPlayers }) => {
            const teamLogo = `https://${
              process.env.NEXT_PUBLIC_SUPABASE_ID
            }.supabase.co/storage/v1/object/public/${tournamentRegion.toLowerCase()}/${tournamentYear}/${
              acronym ? acronym.toLowerCase() : ''.toLowerCase()
            }.png`

            const { base64 } = await getPlaiceholder(teamLogo)

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

            organizedTeams.push({
              id,
              acronym,
              name: tournamentName,
              players: organizedPlayers,
              logo: teamLogo,
              logo_base64: base64
            })
          }
        )
      )
    })
  )

  return organizedTeams
}
