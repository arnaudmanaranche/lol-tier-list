import { ImageResponse } from '@vercel/og'
import type { NextRequest } from 'next/server'
import type { RankingWithTournament, Tournament } from 'types'

import { API_ENDPOINT } from '@/utils/api'
import { generatedOgImage } from '@/utils/generatedOgImage'

export const config = {
  runtime: 'edge'
}

interface PathToEntity {
  'tournaments/:region/:year/:event': Tournament
  'tier-list/:region/:year/:event/:username': RankingWithTournament
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
  entityData: Tournament | RankingWithTournament,
  isTierlist: boolean
): { region: string; year: number; event: string; logo: string } => {
  const tournamentData = isTierlist
    ? (entityData as RankingWithTournament).tournament
    : (entityData as Tournament)
  return {
    region: tournamentData.region,
    year: tournamentData.year,
    event: tournamentData.event,
    logo: tournamentData.logo
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

    const { region, year, event, logo } = extractEntityData(
      entityData,
      isTierlist
    )
    const ogImage = generatedOgImage(isTierlist, region, logo, event, year)

    return new ImageResponse(ogImage, { width: 1200, height: 630 })
  } catch {
    return new Response(`Failed to generate the image`, { status: 500 })
  }
}

export default handler
