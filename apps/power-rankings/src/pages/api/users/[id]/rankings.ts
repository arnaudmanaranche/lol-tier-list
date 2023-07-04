import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getUserRankings } from '@prodigy/data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

export default wrapApiHandlerWithSentry(handler, '/api/users/[id]/rankings')
