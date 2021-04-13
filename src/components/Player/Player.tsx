import clsx from 'clsx'
import React from 'react'

import { RANKING_VALUES } from 'Utils/constants'
import { PLAYER } from 'Utils/types'

interface Props extends PLAYER {
  onUpdate: (value: string) => void
  disabled: boolean
}

const Player: React.FC<Props> = ({ name, role, value, onUpdate, disabled }) => {
  const [currentValue, setValue] = React.useState(value)

  let currentClassname = ''

  switch (currentValue) {
    case RANKING_VALUES['g']:
      currentClassname = 'bg-gTier'
      break
    case RANKING_VALUES['s']:
      currentClassname = 'bg-sTier'
      break
    case RANKING_VALUES['a']:
      currentClassname = 'bg-aTier'
      break
    case RANKING_VALUES['b']:
      currentClassname = 'bg-bTier'
      break
    case RANKING_VALUES['c']:
      currentClassname = 'bg-cTier'
      break
    case RANKING_VALUES['d']:
      currentClassname = 'bg-dTier'
      break
    default:
      break
  }

  const className = clsx(
    'flex uppercase items-center justify-center h-full px-1.5 py-2.5 border-0	',
    currentClassname
  )

  return (
    <div className="flex items-center justify-between">
      <p className="p-2 uppercase">{role}</p>
      <p className="p-2">{name}</p>
      {disabled ? (
        <p className={className}>{currentValue}</p>
      ) : (
        <select
          disabled={disabled}
          className={className}
          onChange={(e) => {
            onUpdate(e.target.value)
            setValue(e.target.value)
          }}
          defaultValue={currentValue}
        >
          <option value="">N/A</option>
          <option value={RANKING_VALUES['g']}>G</option>
          <option value={RANKING_VALUES['s']}>S</option>
          <option value={RANKING_VALUES['a']}>A</option>
          <option value={RANKING_VALUES['b']}>B</option>
          <option value={RANKING_VALUES['c']}>C</option>
          <option value={RANKING_VALUES['d']}>D</option>
        </select>
      )}
    </div>
  )
}

export default Player
