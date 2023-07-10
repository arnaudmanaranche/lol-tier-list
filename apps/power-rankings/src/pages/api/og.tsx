import { wrapApiHandlerWithSentry } from '@sentry/nextjs'
import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'

import { API_ENDPOINT } from 'Utils/api'
import { generatedOgImage } from 'Utils/generatedOgImage'

export const config = {
  runtime: 'edge'
}

const fetchEntity = async (entity: string, id: string): Promise<any> => {
  const res = await fetch(`${API_ENDPOINT}/${entity}/${id}`).then((res) => res.json())

  return res
}

async function handler(req: NextRequest) {
  try {
    let tournamentRegion = ''
    let tournamentLogo = ''
    let tournamentEvent = ''
    let tournamentYear = ''
    const { searchParams } = new URL(req.url)

    const entity = searchParams.get('entity')
    const entityId = searchParams.get('id')

    if (entity && entityId) {
      const entityData = await fetchEntity(entity, entityId)

      if (entity === 'tournaments') {
        tournamentRegion = entityData.region
        tournamentYear = entityData.year
        tournamentEvent = entityData.event
        tournamentLogo = entityData.logo
      } else {
        tournamentRegion = entityData.tournament.region
        tournamentYear = entityData.tournament.year
        tournamentEvent = entityData.tournament.event
        tournamentLogo = entityData.tournament.logo
      }

      return new ImageResponse(
        generatedOgImage(entity, tournamentRegion, tournamentLogo, tournamentEvent, tournamentYear),
        {
          width: 1200,
          height: 630
        }
      )
    }
  } catch (_) {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

export default wrapApiHandlerWithSentry(handler, '/api/og')
