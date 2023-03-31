import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'

import { createTournament, getTournaments } from '@lpr/data'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { take, cursor, showPastTournaments } = req.query

      const tournaments = await getTournaments(
        Number(take),
        cursor as string,
        Boolean(showPastTournaments) ?? false
      )
      res.json(tournaments)
      break
    case 'POST':
      const { tournamentId, tournamentRegion, tournamentLogo, tournamentEvent, tournamentYear } =
        req.body
      await createTournament({
        tournamentId,
        tournamentRegion,
        tournamentLogo,
        tournamentEvent,
        tournamentYear
      })
      res.json({ status: 'OK' })
      break
    default:
      throw new Error(`Method ${req.method} is not allowed`)
  }
}

export default wrapApiHandlerWithSentry(handler, '/api/tournaments')
