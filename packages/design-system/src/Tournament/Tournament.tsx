import clsx from 'clsx'
import Image from 'next/image'
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
        'flex flex-col items-center p-2 text-center radius-md relative min-w-[200px] overflow-hidden text-dark bg-white rounded-lg shadow border-[1px] border-transparent transition-colors',
        !active && 'cursor-not-allowed',
        active && 'hover:border-primary'
      )}
    >
      {!active ? (
        <div className="absolute top-0 right-0 w-24 mt-4 -mr-5 text-sm font-bold bg-primary rotate-[45deg]">
          <span>Soon</span>
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
      <p className="capitalize">{`${region} ${event} - ${year}`}</p>
    </div>
  )
}
