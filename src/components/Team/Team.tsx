import Image from 'next/image'

import Player from 'Components/Player'
import { TEAM } from 'Utils/types'

interface Props extends TEAM {
  onUpdate: (value: string, playerId: number) => void
  disabled: boolean
}

const Team: React.FC<Props> = ({ logo, name, players, onUpdate, disabled }) => {
  return (
    <div className="h-full bg-white header-shadow border-primary min-w-[300] border-solid border-b-2">
      <div className="flex items-center p-2 bg-primary">
        <Image src={logo} height={60} width={60} />
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

export default Team
