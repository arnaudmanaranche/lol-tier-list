import Image from 'next/legacy/image'
import type { ReactElement } from 'react'

import type { RANKING_VALUES, TEAM } from '@lpr/types'

import { Select } from './Select'

export interface TeamProps extends TEAM {
  onUpdate: (value: RANKING_VALUES, playerId?: number) => void
  disabled: boolean
  teamValue?: RANKING_VALUES
}

export const Team = ({
  logo_base64,
  logo,
  name,
  players,
  onUpdate,
  disabled,
  teamValue,
  id
}: TeamProps): ReactElement => {
  return (
    <div className="bg-white">
      <div className="flex items-center border border-b-0 border-brightGray bg-gunmetal p-2 text-white">
        <Image
          src={logo}
          alt={`${name} team logo`}
          height={60}
          width={60}
          id={name}
          placeholder="blur"
          blurDataURL={logo_base64}
        />
        <p className="m-2 font-bold">{name}</p>
      </div>
      {players.map(({ name: playerName, role, id: playerId, value }) => (
        <Select
          disabled={disabled}
          value={value}
          name={playerName}
          role={role}
          key={playerId}
          id={playerId}
          onUpdate={(value) => {
            onUpdate(value, playerId)
          }}
        />
      ))}
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
