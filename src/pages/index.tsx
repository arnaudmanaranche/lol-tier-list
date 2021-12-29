import Image from 'next/image'
import type { ReactElement } from 'react'

import Button from 'Components/Button'
import { REGIONS, ROUTES } from 'Utils/constants'

const { TOURNAMENTS } = ROUTES

const Home = (): ReactElement => (
  <div className="flex flex-col items-center text-center">
    <div className="m-auto mb-10">
      <h1 className="text-5xl font-bold dark:text-white">
        Share easily your League of Legends power rankings
      </h1>
    </div>
    <Button href={TOURNAMENTS}>CREATE YOURS</Button>
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-primary">Regions & Events</h2>
      <ul className="flex mt-10 space-x-5 list-none">
        {REGIONS.map((region) => (
          <li key={region}>
            <Image
              src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.in/storage/v1/object/public/${region}/logo.png`}
              alt={`${region} logo`}
              className="grayscale"
              height={80}
              width={80}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Home
