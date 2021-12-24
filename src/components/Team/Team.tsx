import Image from 'next/image'
import type { ReactElement } from 'react'

import Player from 'Components/Player'
import type { RANKING_VALUES, TEAM } from 'Utils/types'

interface Props extends TEAM {
  onUpdate: (value: RANKING_VALUES, playerId: number) => void
  onFocus: (name: string) => void
  onBlur: () => void
  disabled: boolean
}

const Team = ({
  base64,
  logo,
  name,
  players,
  onUpdate,
  disabled,
  onFocus,
  onBlur
}: Props): ReactElement => {
  return (
    <div className="h-full bg-white border-b-2 border-solid dark:bg-white header-shadow border-primary">
      <div className="flex items-center p-2 bg-primary">
        <Image
          src={logo}
          alt={`${name} logo`}
          height={60}
          width={60}
          id={name}
          onLoadingComplete={() => {
            const img = document.getElementById(name)

            img.classList.add('imageIsLoaded')
          }}
          placeholder="blur"
          blurDataURL={base64}
          className="image"
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
          onFocus={(name) => {
            onFocus(name)
          }}
          onBlur={onBlur}
        />
      ))}
    </div>
  )
}

export default Team
