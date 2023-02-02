import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { createUser, deleteUser } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const userId = req.query.id as string

  switch (req.method) {
    case 'DELETE':
      await deleteUser(userId)
      res.status(204).json({ status: 'OK' })
      break
    case 'POST':
      const user = await createUser(userId)
      res.json(user)
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default withSentry(handler)
