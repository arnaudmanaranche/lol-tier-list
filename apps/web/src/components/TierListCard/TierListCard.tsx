import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { TierListWithTournamentAndUsername } from 'types'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { tournamentEventModifier } from '@/utils/tournamentEventModifier'

export const TierListCard = ({
  tierList
}: {
  tierList: TierListWithTournamentAndUsername
}): ReactNode => {
  const { tournament, user } = tierList
  const { region, year, event, logo } = tournament

  return (
    <Link
      href={`/tier-list/${region}/${year}/${event}/${user.username}`}
      className="group flex flex-col items-center rounded-lg bg-gray-900/50 p-6 shadow-lg transition-all hover:bg-gray-900/70 hover:shadow-xl"
    >
      <Image
        src={logo}
        alt={`${region} logo`}
        height={80}
        width={80}
        className="mb-4 rounded-lg shadow-md transition-transform group-hover:scale-105"
      />
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white">
          {`${region.toUpperCase()} ${year}`}
        </h3>
        <p className="text-gray-300">
          {capitalizeFirstLetter(tournamentEventModifier(event))}
        </p>
        <p className="mt-2 text-sm text-gray-400">by @{user.username}</p>
      </div>
    </Link>
  )
}
