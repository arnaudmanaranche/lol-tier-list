import clsx from 'clsx'
import type { ReactElement } from 'react'
import { useState } from 'react'

import type { PLAYER } from '@lpr/types'
import { RANKING_VALUES } from '@lpr/types'

export interface Props extends PLAYER {
  onUpdate: (value: RANKING_VALUES) => void
  disabled: boolean
}

export const Player = ({ name, role, value, onUpdate, disabled }: Props): ReactElement => {
  const [currentValue, setValue] = useState(value)

  let currentClassname = ''

  switch (currentValue) {
    case RANKING_VALUES.g:
      currentClassname = 'bg-gTier'
      break
    case RANKING_VALUES.s:
      currentClassname = 'bg-sTier'
      break
    case RANKING_VALUES.a:
      currentClassname = 'bg-aTier'
      break
    case RANKING_VALUES.b:
      currentClassname = 'bg-bTier'
      break
    case RANKING_VALUES.c:
      currentClassname = 'bg-cTier'
      break
    case RANKING_VALUES.d:
      currentClassname = 'bg-dTier'
      break
    default:
      break
  }

  return (
    <div className="flex items-center justify-between text-black">
      <p className="pl-3 uppercase">{role}</p>
      <p className="text-center grow">{name}</p>
      {disabled ? (
        <p
          className={clsx(
            'py-2 flex uppercase items-center justify-center h-full min-w-[60px]',
            currentClassname ? currentClassname : 'bg-white'
          )}
        >
          {currentValue ?? 'N/A'}
        </p>
      ) : (
        <select
          data-testid={`${name}_value`}
          disabled={disabled}
          className={clsx(
            'flex uppercase items-center justify-center h-[40px] border-0 py-2 outline-none min-w-[60px]',
            currentClassname ? currentClassname : 'bg-white'
          )}
          onChange={(e) => {
            onUpdate(e.target.value as RANKING_VALUES)
            setValue(e.target.value as RANKING_VALUES)
          }}
          defaultValue={currentValue}
        >
          <option value="">N/A</option>
          <option value={RANKING_VALUES.g}>G</option>
          <option value={RANKING_VALUES.s}>S</option>
          <option value={RANKING_VALUES.a}>A</option>
          <option value={RANKING_VALUES.b}>B</option>
          <option value={RANKING_VALUES.c}>C</option>
          <option value={RANKING_VALUES.d}>D</option>
        </select>
      )}
    </div>
  )
}
