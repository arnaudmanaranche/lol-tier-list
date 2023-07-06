import { getPlaiceholder } from 'plaiceholder'

import type { PandaScoreTournamentRoster } from 'Pandascore/types'

import { pandaScoreTournamentRostersToProdigyTeams } from './pandaScoreTournamentRostersToProdigyTeams'

jest.mock('plaiceholder', () => ({
  getPlaiceholder: jest.fn().mockResolvedValue({ base64: 'mocked-base64' })
}))

describe('pandaScoreTournamentRostersToProdigyTeams', () => {
  describe('given a tournament rosters, a tournament region and a tournament year', () => {
    const rosters: PandaScoreTournamentRoster[] = [
      {
        acronym: 'FNC',
        id: 1,
        name: 'Fnatic',
        players: [
          { id: 1, name: 'Player 1', role: 'adc' },
          { id: 2, name: 'Player 2', role: 'mid' },
          { id: 3, name: 'Player 3', role: 'top' },
          { id: 4, name: 'Player 4', role: 'sup' },
          { id: 5, name: 'Player 5', role: 'jun' }
        ]
      },
      {
        acronym: 'G2',
        id: 1,
        name: 'G2 Esports',
        players: [
          { id: 6, name: 'Player 6', role: 'jun' },
          { id: 7, name: 'Player 7', role: 'adc' },
          { id: 8, name: 'Player 8', role: 'mid' },
          { id: 9, name: 'Player 9', role: 'sup' },
          { id: 10, name: 'Player 10', role: 'top' }
        ]
      }
    ]

    const tournamentRegion = 'LEC'
    const tournamentYear = 2023

    it('should return organized teams with sorted players', async () => {
      const expectedOrganizedTeams = [
        {
          id: 1,
          acronym: 'FNC',
          name: 'Fnatic',
          players: [
            { id: 3, name: 'Player 3', role: 'top' },
            { id: 5, name: 'Player 5', role: 'jun' },
            { id: 2, name: 'Player 2', role: 'mid' },
            { id: 1, name: 'Player 1', role: 'adc' },
            { id: 4, name: 'Player 4', role: 'sup' }
          ],
          logo: 'https://supabase-id.supabase.co/storage/v1/object/public/lec/2023/fnc.png',
          logo_base64: 'mocked-base64'
        },
        {
          id: 1,
          acronym: 'G2',
          name: 'G2 Esports',
          players: [
            { id: 10, name: 'Player 10', role: 'top' },
            { id: 6, name: 'Player 6', role: 'jun' },
            { id: 8, name: 'Player 8', role: 'mid' },
            { id: 7, name: 'Player 7', role: 'adc' },
            { id: 9, name: 'Player 9', role: 'sup' }
          ],
          logo: 'https://supabase-id.supabase.co/storage/v1/object/public/lec/2023/g2.png',
          logo_base64: 'mocked-base64'
        }
      ]

      const response = await pandaScoreTournamentRostersToProdigyTeams(
        rosters,
        tournamentRegion,
        tournamentYear
      )
      expect(response).toEqual(expectedOrganizedTeams)
      expect(getPlaiceholder).toHaveBeenCalledTimes(2)
    })
  })
})
