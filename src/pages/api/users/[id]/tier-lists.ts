import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userId = req.query.id as string

  const supabaseClient = createClient(req, res)

  if (req.method === 'GET') {
    const { data } = await supabaseClient
      .from('rankings')
      .select('*, tournament:tournaments(*)')
      .eq('user_id', userId)

    res.status(200).json(data)
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
