import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

async function revalidate(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid revalidate secret' })
  }

  try {
    await res.revalidate(`/${req.query.path}`)
    return res.json({ status: `Revalidated is done for path ${req.query.path}` })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

export default wrapApiHandlerWithSentry(revalidate, '/api/revalidate')
