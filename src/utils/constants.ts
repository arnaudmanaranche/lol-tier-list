export const ROUTES = {
  HOME: '/',
  TOURNAMENTS: '/tournaments',
  MY_ACCOUNT: '/my-account',
  PRIVACY: '/privacy'
}

export const SUPPORTED_REGIONS = ['lec', 'lcs', 'lck', 'lpl', 'lfl']

export const DEFAULT_TITLE = 'LoLTierList'
export const DEFAULT_DESCRIPTION =
  'Create and share tier lists for your favorite LoL tournaments. Compare rankings and get insights from the community'

export const WEBSITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://lol-tier-list.com'
    : 'http://localhost:3000'
