import { CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { TIER_LIST_VALUES } from 'types'

import { roleNameToIcon } from '@/utils/roleNameToIcon'

interface SelectProps {
  value: TIER_LIST_VALUES | ''
  disabled: boolean
  name?: string
  role?: string
  onUpdate: (value: TIER_LIST_VALUES) => void
}

export const Select = ({
  value,
  onUpdate,
  disabled,
  name,
  role
}: SelectProps): ReactNode => {
  const [currentValue, setValue] = useState(value)

  let currentClassname = ''

  switch (currentValue) {
    case TIER_LIST_VALUES.gTier:
      currentClassname = 'bg-gTier'
      break
    case TIER_LIST_VALUES.sTier:
      currentClassname = 'bg-sTier'
      break
    case TIER_LIST_VALUES.sPlusTier:
      currentClassname = 'bg-sPlusTier'
      break
    case TIER_LIST_VALUES.sMinusTier:
      currentClassname = 'bg-sMinusTier'
      break
    case TIER_LIST_VALUES.aTier:
      currentClassname = 'bg-aTier'
      break
    case TIER_LIST_VALUES.aPlusTier:
      currentClassname = 'bg-aPlusTier'
      break
    case TIER_LIST_VALUES.aMinusTier:
      currentClassname = 'bg-aMinusTier'
      break
    case TIER_LIST_VALUES.bTier:
      currentClassname = 'bg-bTier'
      break
    case TIER_LIST_VALUES.bPlusTier:
      currentClassname = 'bg-bPlusTier'
      break
    case TIER_LIST_VALUES.bMinusTier:
      currentClassname = 'bg-bMinusTier'
      break
    case TIER_LIST_VALUES.cTier:
      currentClassname = 'bg-cTier'
      break
    case TIER_LIST_VALUES.cPlusTier:
      currentClassname = 'bg-cPlusTier'
      break
    case TIER_LIST_VALUES.cMinusTier:
      currentClassname = 'bg-cMinusTier'
      break
    case TIER_LIST_VALUES.dTier:
      currentClassname = 'bg-dTier'
      break
    case TIER_LIST_VALUES.dPlusTier:
      currentClassname = 'bg-dPlusTier'
      break
    case TIER_LIST_VALUES.dMinusTier:
      currentClassname = 'bg-dMinusTier'
      break
    default:
      break
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          aria-disabled={disabled}
          className={clsx(
            'flex cursor-pointer items-center data-[state=open]:bg-gray-200',
            !role && !name && 'border-t-[1px]'
          )}
        >
          {name && role ? (
            <>
              <span className="pl-3 capitalize">{roleNameToIcon(role)}</span>
              <span className="grow text-center">{name}</span>
            </>
          ) : (
            <div className="flex-1  text-center">Team rank</div>
          )}
          <span
            className={clsx(
              'flex h-[40px] min-w-[60px] items-center justify-center py-2 uppercase',
              currentClassname ?? 'bg-white'
            )}
          >
            {currentValue === '' ? 'n/a' : currentValue}
          </span>
        </div>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-[260px] rounded bg-white p-3 shadow-2xl will-change-[transform,opacity] data-[state=open]:data-[side=right]:animate-slideLeftAndFade"
          sideOffset={5}
        >
          <div className="grid grid-cols-4 gap-1">
            {Object.entries(TIER_LIST_VALUES).map(([key, value]) => (
              <Popover.Close key={key}>
                <div
                  onClick={() => {
                    onUpdate?.(value)
                    setValue(value)
                  }}
                  className={`flex h-[40px] min-w-[60px] bg-${key} items-center justify-center py-2 uppercase`}
                >
                  {value}
                </div>
              </Popover.Close>
            ))}
          </div>
          <Popover.Close
            className="size-[25px] text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[5px] top-[5px] inline-flex cursor-default items-center justify-center rounded-full outline-none focus:shadow-[0_0_0_2px]"
            aria-label="Close"
          >
            <CursorArrowRaysIcon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
