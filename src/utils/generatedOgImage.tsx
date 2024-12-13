/* eslint-disable @next/next/no-img-element */
import type { ReactElement } from 'react'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'

export const generatedOgImage = (
  isTierlist: boolean,
  region: string,
  logo: string,
  event: string,
  year: number
): ReactElement => {
  const string = isTierlist ? 'Check my' : ' Create your'

  return (
    <div
      tw="flex w-full h-full items-center justify-center bg-[#292E41] px-12"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, #292E41, #1E2231)'
      }}
    >
      <div tw="flex items-center max-w-5xl w-full">
        <div tw="flex">
          <img alt={`${region} logo`} height={300} src={logo} width={300} />
        </div>
        <div tw="flex flex-col text-white">
          <span tw="text-3xl font-semibold mb-2">{string}</span>
          <div tw="flex flex-col">
            <span tw="text-6xl font-bold tracking-tight">
              {region.toUpperCase()} {capitalizeFirstLetter(event)}
            </span>
            <span tw="text-5xl font-bold text-[#FFD700]">{year}</span>
            <span tw="mt-2 text-3xl font-medium">Tier List</span>
          </div>
        </div>
      </div>
    </div>
  )
}
