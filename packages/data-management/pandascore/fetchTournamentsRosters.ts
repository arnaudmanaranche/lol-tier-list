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

  const rosterPromises = tournamentIds.map(async (tournamentId) => {
    const pandaScoreTournament: PandaScoreTournament = await fetch(
      `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
    ).then((response) => response.json())

    for (const {
      acronym,
      id,
      name: tournamentName,
      players: unorganizedPlayers
    } of pandaScoreTournament.rosters) {
      const teamLogo = `https://${
        process.env.NEXT_PUBLIC_SUPABASE_ID
      }.supabase.co/storage/v1/object/public/${tournamentRegion.toLowerCase()}/${tournamentYear}/${
        acronym?.toLowerCase() ?? ''
      }.png`
      const { base64 } = await getPlaiceholder(teamLogo)

      const organizedPlayers: PLAYER[] = []
      unorganizedPlayers.sort(
        (a: PLAYER, b: PLAYER) => LINEUP_ORDER.indexOf(a.role) - LINEUP_ORDER.indexOf(b.role)
      )

      for (const { id, name, role } of unorganizedPlayers) {
        organizedPlayers.push({ id, name, role })
      }

      organizedTeams.push({
        id,
        acronym,
        name: tournamentName,
        players: organizedPlayers,
        logo: teamLogo,
        logo_base64: base64
      })
    }
  })

  await Promise.all(rosterPromises)

  return organizedTeams
}
