import Image from 'next/image'

import { TOURNAMENT } from 'Utils/types'

const Tournament: React.FC<TOURNAMENT> = ({ name, logo }) => (
  <div className="flex flex-col items-center p-2 text-center transition-shadow rounded-md radius-md hover:shadow-lg">
    <Image src={logo} alt="" height={60} width={60} />
    <p className="capitalize text-dark">{name}</p>
  </div>
)

export default Tournament
