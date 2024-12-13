export interface PandaScoreTournament {
  rosters: PandaScoreTournamentRoster[]
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
