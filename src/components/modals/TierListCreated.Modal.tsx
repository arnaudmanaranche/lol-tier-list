import type { ReactNode } from 'react'

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { WEBSITE_URL } from '@/utils/constants'
import {
  getShareableRedditLink,
  getShareableTwitterLink
} from '@/utils/getShareabaleLinks'

import RedditIcon from '../../svgs/reddit.svg'
import XIcon from '../../svgs/x.svg'
import { Button } from '../Button'

interface TierListCreatedModalProps {
  region: string
  event: string
  year: number
  username: string
}

export function TierListCreatedModal({
  region,
  event,
  username,
  year
}: TierListCreatedModalProps): ReactNode {
  const handleOnShareNative = () => {
    navigator.share({
      title: `${region.toUpperCase()} ${year} ${capitalizeFirstLetter(event)}`,
      text: `Check out my tier list for the ${region.toUpperCase()} ${year} ${capitalizeFirstLetter(event)} tournament!`,
      url: `${WEBSITE_URL}/tier-list/${region}/${event}/${year}/${username}`
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {navigator.canShare() ? (
        <div onClick={handleOnShareNative}>
          <span>Share</span>
        </div>
      ) : (
        <>
          <Button
            href={getShareableTwitterLink({
              event,
              region,
              year,
              username
            })}
          >
            Share on <XIcon className="mx-2 h-5 w-5 fill-white" /> (formerly
            Twitter)
          </Button>
          <Button
            href={getShareableRedditLink({
              event,
              region,
              year,
              username
            })}
          >
            Share on <RedditIcon className="mx-2 h-5 w-5 fill-white" />
            Reddit
          </Button>
        </>
      )}
    </div>
  )
}
