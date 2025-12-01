import type { NextApiRequest, NextApiResponse } from 'next'

import createClient from '@/clients/supabase/api'
import type { PandaScoreTournamentWithExpectedRosters } from '@/providers/pandascore/types'

interface RosterResponse {
  roster: {
    team: {
      id: number
      name: string
    }
    players: {
      name: string
    }[]
  }
  tournamentName: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RosterResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabaseClient = createClient(req, res)

    const { data, error } = await supabaseClient
      .from('daily-guess')
      .select('*')
      .lte('created_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)

    if (error || !data || data.length === 0) {
      return res.status(404).json({ error: 'No daily guess found' })
    }

    const response = await fetch(
      `https://api.pandascore.co/tournaments/${data[0]?.tournament_id}?token=${process.env.PANDASCORE_TOKEN}`
    )

    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch tournament data' })
    }

    const { expected_roster, league, begin_at } =
      (await response.json()) as PandaScoreTournamentWithExpectedRosters

    const roster = expected_roster.find((r) => r.team.id === data[0]?.team_id)

    if (!roster) {
      return res.status(404).json({ error: 'Roster not found' })
    }

    return res.status(200).json({
      roster,
      tournamentName: `${new Date(begin_at).getFullYear()} ${league.name}`
    })
  } catch (error) {
    console.error('Daily guess API error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
