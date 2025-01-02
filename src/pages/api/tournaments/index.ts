import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { take, cursor, showPastTournaments } = req.query
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set time to 00:00:00

    let query = supabaseClient
      .from('tournaments')
      .select('id, event, year, region, active, logo, begin_at')
      .order('year', { ascending: false })
      .order('active', { ascending: false })
      .limit(Number(take))

    if (showPastTournaments === 'true') {
      query = query.lt('begin_at', today.toISOString())
    } else {
      query = query.gte('begin_at', today.toISOString())
    }

    if (cursor) {
      query = query.gt('id', cursor)
    }

    const { data } = await query

    res.status(200).json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
