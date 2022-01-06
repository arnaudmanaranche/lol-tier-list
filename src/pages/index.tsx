import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'

import Button from 'Components/Button'
import { useUser } from 'Contexts/user'
import { login } from 'Utils/auth'
import { REGIONS, ROUTES } from 'Utils/constants'

const { TOURNAMENTS } = ROUTES

const parent = {
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const stat = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

const Home = (): ReactElement => {
  const user = useUser()
  const router = useRouter()

  const createYoursCTA = () => {
    if (user) {
      router.push(TOURNAMENTS)
    } else {
      login()
    }
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="m-auto mb-10">
        <h1 className="text-5xl font-bold dark:text-white">
          Share easily your League of Legends power rankings
        </h1>
      </div>
      <Button onClick={createYoursCTA}>CREATE YOURS</Button>
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-primary">Regions & Events</h2>
        <motion.div
          variants={parent}
          initial="hidden"
          animate="show"
          className="flex mt-10 space-x-5"
        >
          {REGIONS.map((region) => (
            <motion.div variants={stat} key={region}>
              <Image
                src={`https://${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.in/storage/v1/object/public/${region}/logo.png`}
                alt={`${region} logo`}
                className="grayscale"
                height={80}
                width={80}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home
