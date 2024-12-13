import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchPandascoreTournamentsRosters } from 'providers/pandascore/fetchTournamentsRosters'
import { pandaScoreTournamentRostersToInternalTeams } from 'providers/pandascore/pandaScoreTournamentRostersToInternalTeams'
import type { Json } from 'types/database.types'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  switch (req.method) {
    case 'POST':
      const {
        tournamentId,
        tournamentRegion,
        tournamentLogo,
        tournamentEvent,
        tournamentYear
      } = req.body

      const pandascoreTournamentsRosters =
        await fetchPandascoreTournamentsRosters(tournamentId)

      const organizedTeams = await pandaScoreTournamentRostersToInternalTeams(
        pandascoreTournamentsRosters,
        tournamentRegion,
        tournamentYear
      )

      await supabaseClient.from('tournaments').upsert({
        event: tournamentEvent,
        region: tournamentRegion,
        teams: organizedTeams as unknown as Json[],
        logo: tournamentLogo,
        year: tournamentYear
      })
      res.status(201).json({ message: 'Tournament created' })
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
