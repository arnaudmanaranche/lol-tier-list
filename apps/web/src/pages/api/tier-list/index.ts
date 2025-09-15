import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Json } from 'types/database.types'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const supabaseClient = createClient(req, res)

  if (req.method === 'POST') {
    const {
      body: { tierList, tournamentId, userId }
    } = req

    const { error } = await supabaseClient.from('rankings').insert({
      data: tierList as unknown as Json,
      tournament_id: tournamentId,
      user_id: userId
    })

    if (error) {
      return res.status(500).json({
        message: 'An error occured during the tier list creation',
        cause: error
      })
    } else {
      res.status(201).json({
        message: 'Tier list created successfully'
      })
    }
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
