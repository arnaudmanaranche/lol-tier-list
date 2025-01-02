import type { PandaScoreTournamentInfo } from './types'

export async function fetchPandascoreTournamentInfo(
  tournamentId: string
): Promise<{
  begin_at: string
}> {
  const response = await fetch(
    `https://api.pandascore.co/tournaments/${tournamentId}?token=${process.env.PANDASCORE_TOKEN}`
  )

  if (response.status === 200) {
    const { begin_at } = (await response.json()) as PandaScoreTournamentInfo

    return {
      begin_at
    }
  } else {
    throw new Error(
      `Cannot fetch PandaScore tournament info for tournament ID: ${tournamentId}`
    )
  }
}
