import { ImageResponse } from '@vercel/og'
import type { NextApiRequest } from 'next'

// TODO: import from index should not import all files - https://github.com/vercel/next.js/issues/12557
import { getTournamentEdge } from '@lpr/data/entities/tournaments/getTournamentEdge'

export const config = {
  runtime: 'experimental-edge'
}

async function handler(req: NextApiRequest) {
  const tournamentId = req.query.id as string

  const data = await getTournamentEdge(tournamentId)

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {`Create your ranking for the ${data.region} ${data.event} ${data.year}`}
      </div>
    ),
    {
      width: 1200,
      height: 600
    }
  )
}

export default handler
