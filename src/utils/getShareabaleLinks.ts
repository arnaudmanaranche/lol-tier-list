import { capitalizeFirstLetter } from './capitalizeFirstLetter'
import { WEBSITE_URL } from './constants'

interface ShareableLinkProps {
  event: string
  year: number
  region: string
  username: string
}

const getShareableLinkContent = ({
  event,
  year,
  region,
  username
}: ShareableLinkProps): { url: string; text: string } => {
  const url = `${WEBSITE_URL}/tier-list/${region}/${year}/${event}/${username}`
  const text = `Discover my League of Legends tier list for the ${region.toUpperCase()} ${capitalizeFirstLetter(event)} ${year} tournament. Create your own tier list and share it with your friends`
  return { url, text }
}

export const getShareableTwitterLink = (props: ShareableLinkProps): string => {
  const { url, text } = getShareableLinkContent(props)
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`
}

export const getShareableRedditLink = (props: ShareableLinkProps): string => {
  const { url, text } = getShareableLinkContent(props)
  return `https://www.reddit.com/submit?url=${url}&title=${text}`
}
