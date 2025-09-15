import { toPng } from 'html-to-image'
import Link from 'next/link'
import { type ReactNode, useMemo } from 'react'
import { toast } from 'sonner'

import useIsMobile from '@/hooks/useIsMobile'
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter'
import { WEBSITE_URL } from '@/utils/constants'
import {
  getShareableRedditLink,
  getShareableTwitterLink
} from '@/utils/getShareabaleLinks'

import DownloadIcon from '../../svgs/download.svg'
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
  const isMobile = useIsMobile()
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

  const handleTierListToImage = async () => {
    const node = document.getElementById('tier-list')

    if (!node) return

    toPng(node)
      .then(function (dataUrl) {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `${region}_${event}_${year}_${username}_tier_list.png`
        document.body.appendChild(link)

        link.click()
      })
      .catch(function () {
        toast.error('An error occured during the image creation.')
      })
  }

  return (
    <div className="flex flex-col gap-6">
      {isMobile && navigator.canShare(shareData) ? (
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
          <Button
            onClick={handleTierListToImage}
            className="min-w-[200px] shadow-lg transition-shadow hover:shadow-xl"
          >
            <DownloadIcon className="mx-2 h-5 w-5 fill-white" />
            Download as an image
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
