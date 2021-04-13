import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

import { LINEUP_ORDER } from 'Utils/constants'
import prisma from 'Utils/prisma'
import { PLAYER, TEAM } from 'Utils/types'

export default async function synchronizeTournament(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const tournamentId = req.body.pandascoreId
  const tournamentRegion = req.body.region
  const tournamentLogo = req.body.logo
  const tournamentEvent = req.body.event
  const tournamentYear = req.body.year

  const organizedTeams: TEAM[] = []

  const unorganizedTeams = await fetch(
    `https://api.pandascore.co/tournaments/${tournamentId}/rosters?token=2m6hvBX4vR09uxa1SMDhYG3SXXM5VibpSiMH0vv_wU0SJVZEAuo`
  ).then((response) => response.json())

  unorganizedTeams.rosters.map(
    ({
      acronym,
      id,
      name,
      players: unorganizedPlayers
    }: {
      acronym: string
      id: number
      name: string
      players: PLAYER[]
    }) => {
      const organizedPlayers: PLAYER[] = []

      unorganizedPlayers.sort(
        (a: PLAYER, b: PLAYER) => LINEUP_ORDER.indexOf(a.role) - LINEUP_ORDER.indexOf(b.role)
      )

      unorganizedPlayers.map(({ id, name, role }) => {
        organizedPlayers.push({
          id,
          name,
          role
        })
      })

      organizedTeams.push({
        acronym,
        id,
        name,
        players: organizedPlayers,
        logo: `https://firebasestorage.googleapis.com/v0/b/esport-power-ranking-15c5b.appspot.com/o/league_of_legends%2F${tournamentRegion.toLowerCase()}%2F${
          acronym ? acronym.toLowerCase() : ''.toLowerCase()
        }.png?alt=media`
      })
    }
  )

  const team = await prisma.tournament.create({
    data: {
      name: `${tournamentRegion} - ${tournamentEvent} (${tournamentYear})`,
      pandascoreId: parseInt(tournamentId),
      teams: organizedTeams,
      logo: tournamentLogo,
      year: tournamentYear
    }
  })

  res.json(team)
}
