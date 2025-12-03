import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { take, page = 0 } = req.query

    let query = supabaseClient
      .from('rankings')
      .select(
        'tournament:tournaments(year, event, region, logo), user:users(username)'
      )

    // Only apply pagination if take is provided
    if (take) {
      const from = Number(page) * Number(take)
      const to = from + Number(take) - 1
      query = query.range(from, to)
    }

    const { data } = await query

    res.status(200).json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
