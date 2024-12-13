import Image from 'next/legacy/image'
import type { ReactNode } from 'react'
import type { Team as TeamInterface, TIER_LIST_VALUES } from 'types'

import { Select } from './Select'

interface TeamProps extends TeamInterface {
  onUpdate: (value: TIER_LIST_VALUES, playerId?: number) => void
  disabled: boolean
  teamValue?: TIER_LIST_VALUES
}

export const Team = ({
  logo,
  name,
  players,
  onUpdate,
  disabled,
  teamValue,
  id
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
        {players.map(({ name: playerName, role, id: playerId, value }) => (
          <Select
            disabled={disabled}
            value={value as TIER_LIST_VALUES}
            name={playerName}
            role={role}
            key={playerId}
            id={playerId}
            onUpdate={(value) => {
              onUpdate(value, playerId)
            }}
          />
        ))}
      </div>
      <Select
        disabled={disabled}
        id={id}
        value={teamValue}
        onUpdate={(value) => {
          onUpdate(value)
        }}
      />
    </div>
  )
}
