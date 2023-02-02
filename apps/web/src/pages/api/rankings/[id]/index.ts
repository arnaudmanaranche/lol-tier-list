import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteRanking, updateRanking } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  switch (req.method) {
    case 'DELETE':
      const rankingId = req.query.id as string
      await deleteRanking(rankingId)
      res.status(204).json({ status: 'OK' })
      break
    case 'PATCH':
      const {
        body: { ranking }
      } = req
      const updatedRanking = await updateRanking(ranking)
      res.status(204).json(updatedRanking)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default withSentry(handler)
