import type { Player } from 'types'
import { TIER_LIST_VALUES } from 'types'

const mockPlayers1: Player[] = [
  {
    name: 'Zeus',
    role: 'top',
    id: 2,
    value: TIER_LIST_VALUES.sPlusTier
  },
  {
    name: 'Oner',
    role: 'jun',
    id: 3,
    value: TIER_LIST_VALUES.gTier
  },
  {
    name: 'Faker',
    role: 'mid',
    id: 1,
    value: TIER_LIST_VALUES.gTier
  },
  {
    name: 'Gumayusi',
    role: 'adc',
    id: 5,
    value: TIER_LIST_VALUES.aPlusTier
  },
  {
    name: 'Keria',
    role: 'sup',
    id: 4,
    value: TIER_LIST_VALUES.gTier
  }
]

export const mockTeams = [
  {
    id: 1,
    name: 'T1',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lck/2025/t1.png`,
    players: mockPlayers1,
    value: TIER_LIST_VALUES.gTier
  }
]
