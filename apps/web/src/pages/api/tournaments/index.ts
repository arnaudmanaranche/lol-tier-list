import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getTournaments } from '@lpr/data'
import type { TOURNAMENT } from '@lpr/types'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TOURNAMENT | null>
): Promise<void> {
  let response = null

  switch (req.method) {
    case 'GET':
      response = await getTournaments()
      res.json(response)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default withSentry(handler)
