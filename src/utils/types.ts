export enum RANKING_VALUES {
  g = 'g',
  s = 's',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd'
}

export type PLAYER = {
  id: number
  name: string
  role: string
  value?: string
}

export type TEAM = {
  id: number
  acronym?: string
  logo: string
  base64: string
  name: string
  players: PLAYER[]
}

export type RANKING = {
  id: string
  data: TEAM[]
  tournamentId: string
  tournament: TOURNAMENT
}

export type TOURNAMENT = {
  id: string
  logo: string
  name: string
  status: boolean
  base64: string
  year: number
  pandascoreId: number
  teams: TEAM[]
}
