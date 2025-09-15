import Image from 'next/legacy/image'
import { type ReactNode } from 'react'
import type { TIER_LIST_VALUES } from 'types'
import { type Team as TeamInterface } from 'types'

import { Select } from './Select'

interface TeamProps extends TeamInterface {
  onUpdate?: (value: TIER_LIST_VALUES, playerId?: number) => void
  disabled: boolean
  teamValue: TIER_LIST_VALUES | ''
}

export const Team = ({
  logo,
  name,
  players,
  onUpdate,
  disabled,
  teamValue
}: TeamProps): ReactNode => {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex-1">
        <div className="flex items-center border border-b-0 border-brightGray bg-gunmetal p-2 text-white">
          <Image
            src={logo}
            alt={`${name} team logo`}
            height={60}
            width={60}
            id={name}
          />
          <p className="m-2 font-bold">{name}</p>
        </div>
        <div className="flex flex-col">
          {players.map(({ name: playerName, role, id: playerId, value }) => (
            <Select
              disabled={disabled}
              value={value as TIER_LIST_VALUES}
              name={playerName}
              role={role}
              key={playerId}
              onUpdate={(value) => {
                onUpdate?.(value, playerId)
              }}
            />
          ))}
        </div>
      </div>
      <Select
        disabled={disabled}
        value={teamValue}
        onUpdate={(value) => {
          onUpdate?.(value)
        }}
      />
    </div>
  )
}
