import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { createRanking, getRankings } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const {
        body: { ranking, tournamentId, userId }
      } = req

      const createdRanking = await createRanking(ranking, tournamentId, userId)
      res.json(createdRanking)
      break
    case 'GET':
      const rankings = await getRankings()
      res.json(rankings)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default wrapApiHandlerWithSentry(handler, '/api/rankings')
