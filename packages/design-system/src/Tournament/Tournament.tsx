import clsx from 'clsx'
import Image from 'next/legacy/image'
import type { ReactElement } from 'react'

import type { TournamentWithoutTeams } from '@lpr/data'

export const Tournament = ({
  region,
  event,
  year,
  logo,
  active,
  logo_base64
}: TournamentWithoutTeams): ReactElement => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center p-2 relative min-w-[200px] overflow-hidden bg-gunmetal rounded-sm border border-brightGray transition-colors',
        !active ? 'cursor-not-allowed' : 'hover:border-white/20'
      )}
    >
      {!active ? (
        <div className="absolute top-0 right-0 w-24 mt-4 -mr-5 pl-6 text-xs bg-brightGray text-white rotate-[45deg]">
          <span>Disabled</span>
        </div>
      ) : null}
      <Image
        src={logo}
        alt={`${region} logo`}
        height={60}
        width={60}
        id={`${region}_${event}_${year}`}
        placeholder="blur"
        blurDataURL={logo_base64}
      />
      <p className="capitalize text-white font-bold">{`${region} ${event} - ${year}`}</p>
    </div>
  )
}
