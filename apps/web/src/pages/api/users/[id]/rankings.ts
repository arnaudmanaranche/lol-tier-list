import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserRankings } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userId = req.query.id as string

  switch (req.method) {
    case 'GET':
      const rankings = await getUserRankings(userId)
      res.status(200).json(rankings)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default withSentry(handler)
