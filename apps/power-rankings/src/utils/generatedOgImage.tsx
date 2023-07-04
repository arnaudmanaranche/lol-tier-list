/* eslint-disable @next/next/no-img-element */

import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter'

export const generatedOgImage = (
  entity: string,
  region: string,
  logo: string,
  event: string,
  year: string
) => {
  const string = entity === 'tournaments' ? ' Create your' : 'Check my'

  return (
    <div tw="flex w-full h-full items-center bg-[#292E41] px-12">
      <div tw="flex items-center">
        <div tw="flex">
          <img alt={`${region} logo`} height={300} src={logo} width={300} />
        </div>
        <span tw="flex flex-col text-white">
          <span tw="text-4xl">{string}</span>
          <div tw="flex items-center mt-5">
            <span tw="text-6xl">
              {region} {capitalizeFirstLetter(event)} {year}
            </span>
            <span tw="ml-3 text-white text-4xl">power ranking</span>
          </div>
        </span>
      </div>
    </div>
  )
}
