import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteRanking, getRanking, updateRanking } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const rankingId = req.query.id as string

  switch (req.method) {
    case 'GET':
      const ranking = await getRanking(rankingId)
      res.status(200).json(ranking)
      break
    case 'DELETE':
      await deleteRanking(rankingId)
      res.status(204).json({ status: 'OK' })
      break
    case 'PATCH':
      const {
        body: { ranking: rankingData }
      } = req
      const updatedRanking = await updateRanking(rankingData)
      res.status(204).json(updatedRanking)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default wrapApiHandlerWithSentry(handler, '/api/rankings/[id]')
