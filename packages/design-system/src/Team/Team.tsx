import Image from 'next/image'
import type { ReactElement } from 'react'

import type { RANKING_VALUES, TEAM } from '@lpr/types'

import { Player } from '../Player'

export interface TeamProps extends TEAM {
  onUpdate: (value: RANKING_VALUES, playerId: number) => void
  disabled: boolean
}

export const Team = ({
  base64,
  logo,
  name,
  players,
  onUpdate,
  disabled
}: TeamProps): ReactElement => {
  return (
    <div className="h-full bg-white border-b-2 border-solid rounded-t border-primary">
      <div className="flex flex-row items-center p-2 rounded-t bg-primary">
        <Image
          src={logo}
          alt={`${name} logo`}
          height={60}
          width={60}
          id={name}
          placeholder="blur"
          blurDataURL={base64}
        />
        <p className="m-2 font-bold text-black dark:text-black">{name}</p>
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
