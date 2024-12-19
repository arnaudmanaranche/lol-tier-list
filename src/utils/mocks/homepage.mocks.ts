import type { Player } from 'types'
import { TIER_LIST_VALUES } from 'types'

const mockPlayers1: Player[] = [
  {
    name: 'Zeus',
    role: 'top',
    id: 2,
    value: 's'
  },
  {
    name: 'Oner',
    role: 'jun',
    id: 3,
    value: 'g'
  },
  {
    name: 'Faker',
    role: 'mid',
    id: 1,
    value: 'g'
  },
  {
    name: 'Gumayusi',
    role: 'adc',
    id: 5,
    value: 'a'
  },
  {
    name: 'Keria',
    role: 'sup',
    id: 4,
    value: 'g'
  }
]

const mockPlayers2: Player[] = [
  {
    name: 'Brokenblade',
    role: 'top',
    id: 6,
    value: 's'
  },
  {
    name: 'Yike',
    role: 'jun',
    id: 7,
    value: 'a'
  },
  {
    name: 'cAPS',
    role: 'mid',
    id: 8,
    value: 'g'
  },
  {
    name: 'Hans Sama',
    role: 'adc',
    id: 9,
    value: 'a'
  },
  {
    name: 'Mikyx',
    role: 'sup',
    id: 10,
    value: 's'
  }
]

const mockPlayers3: Player[] = [
  {
    name: 'Bwipo',
    role: 'top',
    id: 11,
    value: 's'
  },
  {
    name: 'Inspired',
    role: 'jun',
    id: 12,
    value: 's'
  },
  {
    name: 'Quad',
    role: 'mid',
    id: 13,
    value: 'a'
  },
  {
    name: 'Massu',
    role: 'adc',
    id: 14,
    value: 'b'
  },
  {
    name: 'Busio',
    role: 'sup',
    id: 15,
    value: 'b'
  }
]

export const mockTeams = [
  {
    id: 1,
    name: 'T1',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lck/2025/t1.png`,
    players: mockPlayers1,
    value: TIER_LIST_VALUES.g
  },
  {
    id: 2,
    name: 'G2 Esports',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lec/2025/g2.png`,
    players: mockPlayers2,
    value: TIER_LIST_VALUES.s
  },
  {
    id: 3,
    name: 'Fly Quest',
    logo: `https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co/storage/v1/object/public/lcs/2025/fly.png`,
    players: mockPlayers3,
    value: TIER_LIST_VALUES.a
  }
]
