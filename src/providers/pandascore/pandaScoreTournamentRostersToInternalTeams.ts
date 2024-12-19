import type { Player, Team } from 'types'

import type { PandaScoreTournamentRoster } from './types'

export const LINE_UP_ORDER = ['top', 'jun', 'mid', 'adc', 'sup']

export async function pandaScoreTournamentRostersToInternalTeams(
  rosters: PandaScoreTournamentRoster[],
  tournamentRegion: string,
  tournamentYear: number
): Promise<Team[]> {
  const organizedTeams: Team[] = []

  await Promise.all(
    rosters.map(
      async ({
        acronym,
        id,
        name: tournamentName,
        players: unorganizedPlayers
      }) => {
        const teamLogo = `https://${
          process.env.NEXT_PUBLIC_SUPABASE_ID
        }.supabase.co/storage/v1/object/public/${tournamentRegion.toLowerCase()}/${tournamentYear}/${
          acronym?.toLowerCase() ?? ''
        }.png`

        const organizedPlayers: Player[] = unorganizedPlayers
          .sort(
            (a, b) =>
              LINE_UP_ORDER.indexOf(a.role) - LINE_UP_ORDER.indexOf(b.role)
          )
          .map(({ id, name, role }) => ({
            id,
            name,
            role,
            value: ''
          }))

        organizedTeams.push({
          name: tournamentName,
          players: organizedPlayers,
          logo: teamLogo,
          id
        })
      }
    )
  )

  return organizedTeams
}
