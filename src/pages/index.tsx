import type { ReactElement } from 'react'

import Button from 'Components/Button'
import { ROUTES } from 'Utils/constants'

const { TOURNAMENTS } = ROUTES

const Home = (): ReactElement => (
  <div className="flex flex-col items-center text-center">
    <div className="m-auto mb-10 prose lg:prose-xl">
      <h1 className="dark:text-white">Share easily your League of Legends power rankings</h1>
    </div>
    <Button href={TOURNAMENTS}>Create yours</Button>
  </div>
)

export default Home
