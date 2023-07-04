import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getTournament } from '@prodigy/data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const tournament = await getTournament(req.query.id as string)
      res.json(tournament)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default wrapApiHandlerWithSentry(handler, '/api/tournaments/[id]')
