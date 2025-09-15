import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { take, page = 0 } = req.query

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const from = Number(page) * Number(take)
    const to = from + Number(take) - 1

    const { data } = await supabaseClient
      .from('rankings')
      .select(
        'tournament:tournaments(year, event, region, logo), user:users(username)'
      )
      .range(from, to)

    res.status(200).json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
