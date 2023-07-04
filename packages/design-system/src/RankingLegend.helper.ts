import { RANKING_VALUES } from '@prodigy/types'

export const legend = [
  {
    value: RANKING_VALUES.g.toUpperCase(),
    bgColor: 'bg-gTier',
    description: 'God tier'
  },
  {
    value: RANKING_VALUES.s.toUpperCase(),
    bgColor: 'bg-sTier',
    description: 'Best player in his league'
  },
  {
    value: RANKING_VALUES.a.toUpperCase(),
    bgColor: 'bg-aTier',
    description: 'Good player in his league'
  },
  {
    value: RANKING_VALUES.b.toUpperCase(),
    bgColor: 'bg-bTier',
    description: 'Contender'
  },
  {
    value: RANKING_VALUES.c.toUpperCase(),
    bgColor: 'bg-cTier',
    description: 'Player on probation'
  },
  {
    value: RANKING_VALUES.d.toUpperCase(),
    bgColor: 'bg-dTier',
    description: 'Player in difficulty'
  }
]
