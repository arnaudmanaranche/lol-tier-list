import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { take, cursor, showPastTournaments } = req.query

    const query = supabaseClient
      .from('tournaments')
      .select('id, event, year, region, active, logo')
      .eq('active', showPastTournaments ? false : true)
      .order('year', { ascending: false })
      .order('active', { ascending: false })
      .limit(Number(take))

    if (cursor) {
      query.gt('id', cursor)
    }

    const { data } = await query

    res.status(200).json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
