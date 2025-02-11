export interface PandaScoreTournamentInfo {
  begin_at: string
}
export interface PandaScoreTournament {
  rosters: PandaScoreTournamentRoster[]
}

export interface PandaScoreTournamentWithExpectedRosters {
  expected_roster: Array<{
    team: {
      id: number
      name: string
    }
    players: Array<{
      name: string
    }>
  }>
  serie: {
    full_name: string
  }
}

export interface PandaScoreTournamentRoster {
  acronym: string
  id: number
  name: string
  players: {
    id: number
    role: 'top' | 'jun' | 'mid' | 'adc' | 'sup'
    name: string
  }[]
}
