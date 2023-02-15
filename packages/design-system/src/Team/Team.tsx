import Image from 'next/image'
import type { ReactElement } from 'react'

import type { RANKING_VALUES, TEAM } from '@lpr/types'

import { Player } from '../Player'

export interface TeamProps extends TEAM {
  onUpdate: (value: RANKING_VALUES, playerId: number) => void
  disabled: boolean
}

export const Team = ({
  logo_base64,
  logo,
  name,
  players,
  onUpdate,
  disabled
}: TeamProps): ReactElement => {
  return (
    <div className="bg-white">
      <div className="flex items-center text-white p-2 bg-gunmetal border border-b-0 border-brightGray">
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
        <Player
          disabled={disabled}
          name={playerName}
          role={role}
          value={value}
          key={playerId}
          id={playerId}
          onUpdate={(value) => {
            onUpdate(value, playerId)
          }}
        />
      ))}
    </div>
  )
}
