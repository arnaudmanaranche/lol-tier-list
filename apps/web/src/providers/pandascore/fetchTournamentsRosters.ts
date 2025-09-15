import type { PandaScoreTournament, PandaScoreTournamentRoster } from './types'

export async function fetchPandascoreTournamentsRosters(
  tournamentIds: string[]
): Promise<PandaScoreTournamentRoster[]> {
  const pandaScoreTournamentRosters: PandaScoreTournamentRoster[] = []

  const fetchRostersPromise = tournamentIds.map(async (tournamentId) => {
    const response = await fetch(
      `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=${process.env.PANDASCORE_TOKEN}`
    )

    if (response.status === 200) {
      const { rosters } = (await response.json()) as PandaScoreTournament

      pandaScoreTournamentRosters.push(...rosters)
    } else {
      throw new Error(
        `Cannot fetch PandaScore rosters for tournament ID: ${tournamentId}`
      )
    }
  })

  await Promise.all(fetchRostersPromise)

  return pandaScoreTournamentRosters
}
