import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (!req.query.event || !req.query.year || !req.query.region) {
    throw new Error('Missing query parameters')
  }

  if (req.method === 'GET') {
    const { data } = await supabaseClient
      .from('tournaments')
      .select('*')
      .eq('event', req.query.event)
      .eq('year', req.query.year)
      .eq('region', req.query.region)
      .single()

    res.json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
