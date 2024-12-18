import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { data } = await supabaseClient
      .from('rankings')
      .select(
        `
      *,
      tournament:tournaments!inner(
        *
      ),
      user:users!inner(
        *
      )
    `
      )
      .eq('tournament.event', req.query.event as string)
      .eq('tournament.year', req.query.year as string)
      .eq('tournament.region', req.query.region as string)
      .eq('user.username', req.query.username as string)
      .single()

    res.status(200).json(data)
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handler
