import type { Tournament } from '@prisma/client'

import { prismaClient } from '../../clients/prisma'

export type TournamentWithoutTeams = Omit<Tournament, 'teams'>

export async function getTournaments(
  take?: number,
  cursor?: string,
  showPastTournaments?: boolean
): Promise<TournamentWithoutTeams[]> {
  const tournaments = await prismaClient.tournament.findMany({
    where: {
      active: showPastTournaments ? false : true
    },
    select: {
      teams: false,
      id: true,
      event: true,
      active: true,
      region: true,
      logo: true,
      logo_base64: true,
      year: true
    },
    orderBy: [
      {
        year: 'desc'
      },
      {
        active: 'desc'
      }
    ],
    ...(take && {
      take
    }),
    skip: cursor ? 1 : 0,
    ...(cursor && {
      cursor: {
        id: cursor
      }
    })
  })

  return tournaments
}
