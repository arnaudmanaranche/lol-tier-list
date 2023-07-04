import { getPlaiceholder } from 'plaiceholder'

import type { TEAM } from '@prodigy/types'

import type { PandaScoreTournament } from './types'

const LINE_UP_ORDER = ['top', 'jun', 'mid', 'adc', 'sup']

export async function fetchPandascoreTournamentsRosters(
  tournamentIds: string[],
  tournamentRegion: string,
  tournamentYear: number
) {
  const organizedTeams: TEAM[] = []

  const rosterPromises = tournamentIds.map(async (tournamentId) => {
    const response = await fetch(
      `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
    )
    const { rosters } = (await response.json()) as PandaScoreTournament

    await Promise.all(
      rosters.map(async ({ acronym, id, name: tournamentName, players: unorganizedPlayers }) => {
        const teamLogo = `https://${
          process.env.NEXT_PUBLIC_SUPABASE_ID
        }.supabase.co/storage/v1/object/public/${tournamentRegion.toLowerCase()}/${tournamentYear}/${
          acronym?.toLowerCase() ?? ''
        }.png`
        const { base64 } = await getPlaiceholder(teamLogo)

        const organizedPlayers = unorganizedPlayers
          .sort((a, b) => LINE_UP_ORDER.indexOf(a.role) - LINE_UP_ORDER.indexOf(b.role))
          .map(({ id, name, role }) => ({ id, name, role }))

        organizedTeams.push({
          id,
          acronym,
          name: tournamentName,
          players: organizedPlayers,
          logo: teamLogo,
          logo_base64: base64
        })
      })
    )
  })

  await Promise.all(rosterPromises)

  return organizedTeams
}
