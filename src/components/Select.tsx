import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { TIER_LIST_VALUES } from 'types'

interface SelectProps {
  id: number
  value?: TIER_LIST_VALUES
  disabled: boolean
  name?: string
  role?: string
  onUpdate: (value: TIER_LIST_VALUES) => void
}

export const Select = ({
  value,
  onUpdate,
  disabled,
  id,
  name,
  role
}: SelectProps): ReactNode => {
  const [currentValue, setValue] = useState(value)

  let currentClassname = ''

  switch (currentValue) {
    case TIER_LIST_VALUES.g:
      currentClassname = 'bg-gTier'
      break
    case TIER_LIST_VALUES.s:
      currentClassname = 'bg-sTier'
      break
    case TIER_LIST_VALUES.a:
      currentClassname = 'bg-aTier'
      break
    case TIER_LIST_VALUES.b:
      currentClassname = 'bg-bTier'
      break
    case TIER_LIST_VALUES.c:
      currentClassname = 'bg-cTier'
      break
    case TIER_LIST_VALUES.d:
      currentClassname = 'bg-dTier'
      break
    default:
      break
  }

  return (
    <div
      className={clsx('flex items-center', !role && !name && 'border-t-[1px]')}
    >
      {name && role ? (
        <>
          <span className="pl-3 capitalize">{role}</span>
          <span className="grow text-center">{name}</span>
        </>
      ) : (
        <div className="flex-1 pl-3 text-center">Team rank</div>
      )}
      {disabled ? (
        <span
          className={clsx(
            'flex h-[40px] min-w-[60px] items-center justify-center py-2 uppercase',
            currentClassname ?? 'bg-white'
          )}
        >
          {currentValue ?? 'n/a'}
        </span>
      ) : (
        <Listbox
          value={currentValue}
          onChange={(e: TIER_LIST_VALUES) => {
            onUpdate(e)
            setValue(e)
          }}
          defaultValue=""
          data-testid={`${id}_value`}
        >
          <div className="relative">
            <ListboxButton
              className={`sm:text-sm/6 h-[40px] min-w-[60px] cursor-default py-1.5 pl-3 pr-2 text-left text-gray-900 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 ${currentClassname} flex items-center justify-between`}
            >
              <span className="col-start-1 row-start-1 flex items-center gap-3">
                {!currentValue ? (
                  <span className="text-gray-700">n/a</span>
                ) : (
                  <span className="block truncate uppercase">
                    {currentValue}
                  </span>
                )}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-black/60" />
            </ListboxButton>
            <ListboxOptions
              transition
              className="absolute z-10 max-h-56 w-full overflow-auto bg-white shadow-lg  focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {(
                Object.keys(TIER_LIST_VALUES) as Array<
                  keyof typeof TIER_LIST_VALUES
                >
              ).map((value) => (
                <ListboxOption
                  key={value}
                  value={value}
                  className={`cursor-pointer select-none py-2 hover:bg-slate-200`}
                >
                  <div className="text-center uppercase">{value}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      )}
    </div>
  )
}
