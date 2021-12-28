import clsx from 'clsx'
import Image from 'next/image'
import type { ReactElement } from 'react'

import type { TOURNAMENT } from 'Utils/types'

const Tournament = ({ name, logo, status, base64 }: TOURNAMENT): ReactElement => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center p-2 text-center transition-shadow rounded-md radius-md relative min-w-[200px] overflow-hidden text-dark dark:text-white',
        status && 'hover:shadow-lg hover:bg-white dark:hover:bg-[#2b2d2e]'
      )}
    >
      {!status ? (
        <div className="absolute top-0 right-0 w-24 mt-4 -mr-5 text-sm font-bold bg-primary rotate-[45deg]">
          <span>Soon</span>
        </div>
      ) : null}
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
      <p className="capitalize">{name}</p>
    </div>
  )
}

export default Tournament
