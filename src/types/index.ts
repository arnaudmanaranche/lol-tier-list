import type { Tables } from './database.types'

export type Tournament = Tables<'tournaments'>
export type Tierlist = Tables<'rankings'>
export type TierListWithTournament = Omit<Tierlist, 'tournament'> & {
  tournament: Tournament
  data: Team[]
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
  teamValue: TIER_LIST_VALUES | ''
  id: number
}

export type TournamentWithoutTeams = Omit<Tournament, 'teams'>

export enum TIER_LIST_VALUES {
  gTier = 'g',
  sPlusTier = 's+',
  sTier = 's',
  sMinusTier = 's-',
  aPlusTier = 'a+',
  aTier = 'a',
  aMinusTier = 'a-',
  bPlusTier = 'b+',
  bTier = 'b',
  bMinusTier = 'b-',
  cPlusTier = 'c+',
  cTier = 'c',
  cMinusTier = 'c-',
  dPlusTier = 'd+',
  dTier = 'd',
  dMinusTier = 'd-'
}
