import { WEBSITE_URL } from './constants'

interface ShareableLinkProps {
  event: string
  year: number
  region: string
}

export const getShareableFacebookLink = ({
  event,
  year,
  region
}: ShareableLinkProps): string =>
  `https://www.facebook.com/sharer/sharer.php?u=${WEBSITE_URL}/tier-list/${region}/${year}/${event}`

export const getShareableTwitterLink = ({
  event,
  year,
  region
}: ShareableLinkProps): string =>
  `https://twitter.com/intent/tweet?url=${WEBSITE_URL}/tier-list/${region}/${year}/${event}`
