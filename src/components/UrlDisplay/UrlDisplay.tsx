import {
  ArrowPathIcon,
  LockClosedIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { AnimatePresence, m } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

const names = ['Caedrel', 'TraYt0N', 'IbaiLlanos', 'LEC_Wooloo']

export function UrlDisplay(): ReactNode {
  const [currentName, setCurrentName] = useState(names[0])

  const cycleNames = () => {
    const currentIndex = names.indexOf(currentName)
    const nextIndex = (currentIndex + 1) % names.length
    setCurrentName(names[nextIndex])
  }

  useEffect(() => {
    const interval = setInterval(cycleNames, 3000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentName])

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-[#35363A] shadow-lg">
      <div className="flex items-center space-x-2 bg-[#292A2D] px-3 py-2">
        <div className="h-3 w-3 rounded-full bg-[#ED6A5E]"></div>
        <div className="h-3 w-3 rounded-full bg-[#F4BF4F]"></div>
        <div className="h-3 w-3 rounded-full bg-[#61C554]"></div>
      </div>
      <div className="flex items-center gap-2 bg-[#202124] px-4 py-2">
        <div className="flex flex-1 items-center rounded bg-[#35363A] px-3 py-1.5">
          <LockClosedIcon className="mr-2 h-4 w-4 text-green-500" />
          <div className="flex items-center text-[#9AA0A6]">
            <span>https://lol-tier-list.com</span>
            <span className="text-[#E8EAED]">/tier-list/lec/2025/winter/</span>
            <AnimatePresence mode="wait">
              <m.span
                key={currentName}
                className="text-[#E8EAED]"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {currentName}
              </m.span>
            </AnimatePresence>
          </div>
        </div>
        <StarIcon className="h-5 w-5 text-[#9AA0A6]" />
        <ArrowPathIcon
          className="h-5 w-5 cursor-pointer text-[#9AA0A6] transition-colors hover:text-white"
          onClick={cycleNames}
        />
      </div>
    </div>
  )
}
