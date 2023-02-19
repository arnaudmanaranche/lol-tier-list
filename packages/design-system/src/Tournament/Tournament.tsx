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
        'relative flex min-w-[200px] flex-col items-center overflow-hidden rounded-sm border border-brightGray bg-gunmetal p-2 transition-colors',
        !active ? 'cursor-not-allowed' : 'hover:border-white/20'
      )}
    >
      {!active ? (
        <div className="absolute top-0 right-0 mt-4 -mr-5 w-24 rotate-[45deg] bg-brightGray pl-6 text-xs text-white">
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
      <p className="font-bold capitalize text-white">{`${region} ${event} - ${year}`}</p>
    </div>
  )
}
