import Link from 'next/link'
import { type ReactNode, useMemo } from 'react'

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
  const shareData = useMemo(
    () => ({
      title: `${region.toUpperCase()} ${year} ${capitalizeFirstLetter(event)}`,
      text: `Check out my tier list for the ${region.toUpperCase()} ${year} ${capitalizeFirstLetter(event)} tournament!`,
      url: `${WEBSITE_URL}/tier-list/${region}/${event}/${year}/${username}`
    }),
    [event, region, username, year]
  )

  const handleOnShareNative = () => {
    navigator.share(shareData)
  }

  return (
    <div className="flex flex-col gap-6">
      {navigator.canShare(shareData) ? (
        <Button onClick={handleOnShareNative}>Share your tier list</Button>
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
      <div className="text-center text-lg text-white">
        You like the project?{' '}
        <Link
          href="https://buymeacoffee.com/arnaudmanaranche"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Support us
        </Link>
      </div>
    </div>
  )
}
