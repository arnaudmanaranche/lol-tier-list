import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import type { TierListWithTournament, Tournament } from 'types'

import { API_ENDPOINT } from '@/utils/api'
import { generatedOgImage } from '@/utils/generatedOgImage'

export const config = {
  runtime: 'edge'
}

interface PathToEntity {
  'tournaments/:region/:year/:event': Tournament
  'tier-list/:region/:year/:event/:username': TierListWithTournament
}

type InferEntity<T extends keyof PathToEntity> = PathToEntity[T]

const fetchEntity = async <T extends keyof PathToEntity>({
  path
}: {
  path: T
}): Promise<InferEntity<T>> => {
  const response = await fetch(`${API_ENDPOINT}/${path}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch entity from ${path}: ${response.statusText}`
    )
  }
  return response.json() as Promise<InferEntity<T>>
}

const extractEntityData = (
  entityData: Tournament | TierListWithTournament,
  isTierlist: boolean
): {
  region: string
  year: number
  event: string
  logo: string
  username: string
} => {
  const tournamentData = isTierlist
    ? (entityData as TierListWithTournament).tournament
    : (entityData as Tournament)

  return {
    region: tournamentData.region,
    year: tournamentData.year,
    event: tournamentData.event,
    logo: tournamentData.logo,
    // @ts-expect-error username is OK
    username: isTierlist ? entityData.user.username : ''
  }
}

async function handler(req: NextRequest): Promise<ImageResponse> {
  try {
    const { searchParams } = new URL(req.url)
    const path = searchParams.get('path') as keyof PathToEntity | null

    if (!path) {
      return new Response(`Missing "path" parameter`, { status: 400 })
    }

    const isTierlist = path.startsWith('tier-list')
    const entityData = await fetchEntity({ path })

    const { region, year, event, logo, username } = extractEntityData(
      entityData,
      isTierlist
    )

    const ogImage = generatedOgImage(
      isTierlist,
      region,
      logo,
      event,
      year,
      username
    )

    return new ImageResponse(ogImage, { width: 800, height: 400 })
  } catch {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}

export default handler
