import clsx from 'clsx'
import Image from 'next/image'

import { TOURNAMENT } from 'Utils/types'

const Tournament: React.FC<TOURNAMENT> = ({ name, logo, status }) => (
  <div
    className={clsx(
      `flex flex-col items-center p-2 text-center transition-shadow rounded-md radius-md relative min-w-[200px] overflow-hidden ${
        status ? 'hover:shadow-lg' : ''
      }`
    )}
  >
    {!status && (
      <div className="absolute top-0 right-0 w-24 mt-4 -mr-5 text-sm font-bold bg-primary transform rotate-[45deg]">
        <p>Soon</p>
      </div>
    )}
    <Image src={logo} alt={`${name} logo`} height={60} width={60} />
    <p className="capitalize text-dark dark:text-white">{name}</p>
  </div>
)

export default Tournament
