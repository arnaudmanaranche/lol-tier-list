import { TIER_LIST_VALUES } from '../types'

export const legend = [
  {
    value: TIER_LIST_VALUES.g.toUpperCase(),
    bgColor: 'bg-gTier',
    description: 'God tier'
  },
  {
    value: TIER_LIST_VALUES.s.toUpperCase(),
    bgColor: 'bg-sTier',
    description: 'Best player in his league'
  },
  {
    value: TIER_LIST_VALUES.a.toUpperCase(),
    bgColor: 'bg-aTier',
    description: 'Good player in his league'
  },
  {
    value: TIER_LIST_VALUES.b.toUpperCase(),
    bgColor: 'bg-bTier',
    description: 'Contender'
  },
  {
    value: TIER_LIST_VALUES.c.toUpperCase(),
    bgColor: 'bg-cTier',
    description: 'Player on probation'
  },
  {
    value: TIER_LIST_VALUES.d.toUpperCase(),
    bgColor: 'bg-dTier',
    description: 'Player in difficulty'
  }
]
