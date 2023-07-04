import clsx from 'clsx'
import type { ReactElement } from 'react'
import { useState } from 'react'

import { RANKING_VALUES } from '@prodigy/types'

export interface Props {
  id: number
  value?: RANKING_VALUES
  disabled: boolean
  name?: string
  role?: string
  onUpdate: (value: RANKING_VALUES) => void
}

export const Select = ({ value, onUpdate, disabled, id, name, role }: Props): ReactElement => {
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
    <div className={clsx('flex items-center', !role && !name && 'border-t-[1px]')}>
      {name && role ? (
        <>
          <span className="pl-3 capitalize">{role}</span>
          <span className="grow text-center">{name}</span>
        </>
      ) : (
        <div className="flex-1 pl-3 text-center">Team rank</div>
      )}
      {disabled ? (
        <span
          className={clsx(
            'flex h-full min-w-[60px] items-center justify-center py-2 uppercase',
            currentClassname ?? 'bg-white'
          )}
        >
          {currentValue ?? 'N/A'}
        </span>
      ) : (
        <select
          data-testid={`${id}_value`}
          disabled={disabled}
          className={clsx(
            'h-[40px] min-w-[60px] text-center outline-none',
            currentClassname ?? 'bg-white/5'
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
