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

const mockPlayers2: Player[] = [
  {
    name: 'Brokenblade',
    role: 'top',
    id: 6,
    value: TIER_LIST_VALUES.sPlusTier
  },
  {
    name: 'Yike',
    role: 'jun',
    id: 7,
    value: TIER_LIST_VALUES.sMinusTier
  },
  {
    name: 'cAPS',
    role: 'mid',
    id: 8,
    value: TIER_LIST_VALUES.gTier
  },
  {
    name: 'Hans Sama',
    role: 'adc',
    id: 9,
    value: TIER_LIST_VALUES.aPlusTier
  },
  {
    name: 'Mikyx',
    role: 'sup',
    id: 10,
    value: TIER_LIST_VALUES.sTier
  }
]

const mockPlayers3: Player[] = [
  {
    name: 'Bwipo',
    role: 'top',
    id: 11,
    value: TIER_LIST_VALUES.sTier
  },
  {
    name: 'Inspired',
    role: 'jun',
    id: 12,
    value: TIER_LIST_VALUES.sPlusTier
  },
  {
    name: 'Quad',
    role: 'mid',
    id: 13,
    value: TIER_LIST_VALUES.aPlusTier
  },
  {
    name: 'Massu',
    role: 'adc',
    id: 14,
    value: TIER_LIST_VALUES.bTier
  },
  {
    name: 'Busio',
    role: 'sup',
    id: 15,
    value: TIER_LIST_VALUES.bPlusTier
  }
]

export const mockTeams = [
  {
    id: 1,
    name: 'T1',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lck/2025/t1.png`,
    players: mockPlayers1,
    value: TIER_LIST_VALUES.gTier
  },
  {
    id: 2,
    name: 'G2 Esports',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lec/2025/g2.png`,
    players: mockPlayers2,
    value: TIER_LIST_VALUES.sTier
  },
  {
    id: 3,
    name: 'Fly Quest',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lcs/2025/fly.png`,
    players: mockPlayers3,
    value: TIER_LIST_VALUES.aPlusTier
  }
]
