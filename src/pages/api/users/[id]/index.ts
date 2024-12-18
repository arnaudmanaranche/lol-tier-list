import createClient from 'clients/supabase/api'
import type { NextApiRequest, NextApiResponse } from 'next'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const userId = req.query.id as string
  const supbaseClient = createClient(req, res)

  if (req.method === 'DELETE') {
    await supbaseClient.from('users').delete().eq('id', userId)

    res.status(200).json({ message: 'User deleted' })
  } else {
    throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default handler
