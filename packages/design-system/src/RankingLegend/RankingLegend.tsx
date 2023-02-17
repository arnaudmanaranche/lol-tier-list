import { Popover } from '@headlessui/react'
import { LightBulbIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'

import { legend } from './RankingLegend.helper'

// This component is hidden on small device. Need to think how we can improve mobile rendering.
export const RankingLegend = () => {
  return (
    <div className="fixed bottom-10 right-10 bg-charcoal rounded-full p-2 z-10 hidden md:flex">
      <Popover className="relative z-50">
        <Popover.Button as={Fragment}>
          <LightBulbIcon
            className="h-8 w-8 cursor-pointer stroke-white"
            title="Open ranking legend"
          />
        </Popover.Button>
        <Popover.Overlay className="fixed inset-0 bg-dark opacity-50" />
        <Popover.Panel className="absolute bottom-20 right-0 bg-white min-w-[400px] rounded-md">
          <div className="flex flex-col p-4">
            {legend.map(({ value, bgColor, description }) => (
              <div className="flex items-center" key={value}>
                <span className={clsx('p-2 min-w-[50px] text-center', bgColor)}>{value}</span>
                <p className="grow ml-2">{description}</p>
              </div>
            ))}
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  )
}
