export enum RANKING_VALUES {
  g = 'g',
  s = 's',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd'
}

export interface PLAYER {
  id: number
  name: string
  role: string
  value?: RANKING_VALUES
}

export interface TEAM {
  id: number
  acronym?: string
  logo: string
  logo_base64: string
  name: string
  players: PLAYER[]
  teamValue?: RANKING_VALUES
}
