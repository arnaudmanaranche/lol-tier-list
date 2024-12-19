import type { Tables } from './database.types'

export type Tournament = Tables<'tournaments'>
export type Ranking = Tables<'rankings'>
export type RankingWithTournament = Omit<Ranking, 'tournament'> & {
  tournament: Tournament
}
export type User = Tables<'users'>

export interface Player {
  name: string
  role: string
  id: number
  value: string
}

export interface Team {
  logo: string
  name: string
  players: Player[]
  teamValue?: TIER_LIST_VALUES
  id: number
}

export type TournamentWithoutTeams = Omit<Tournament, 'teams'>

export enum TIER_LIST_VALUES {
  g = 'g',
  s = 's',
  a = 'a',
  b = 'b',
  c = 'c',
  d = 'd'
}
