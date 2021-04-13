import Image from 'next/image'

import { TOURNAMENT } from 'Utils/types'

const Tournament: React.FC<TOURNAMENT> = ({ name, logo }) => (
  <div className="flex flex-col items-center text-center radius-md ">
    <Image src={logo} alt="" height={60} width={60} />
    <p className="capitalize text-dark">{name}</p>
  </div>
)

export default Tournament
