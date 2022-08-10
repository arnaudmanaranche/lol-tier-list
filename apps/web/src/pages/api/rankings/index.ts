import type { Ranking } from '@prisma/client'
import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { createRanking } from 'Utils/api/rankings'

async function handler(req: NextApiRequest, res: NextApiResponse<Ranking>): Promise<void> {
  let response: Ranking = null

  switch (req.method) {
    case 'POST':
      const {
        body: { ranking, tournamentId, userId }
      } = req

      response = await createRanking(ranking, tournamentId, userId)
      res.json(response)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default withSentry(handler)
