export const ROUTES = {
  HOME: '/',
  TOURNAMENTS: '/tournaments',
  MY_ACCOUNT: '/my-account',
  DAILY_GUESS: '/daily-guess'
}

export const SUPPORTED_REGIONS = ['lec', 'lcs', 'lck', 'lpl', 'lfl']

export const DEFAULT_TITLE = 'LeagueTierList'
export const DEFAULT_DESCRIPTION =
  'Create and share tier lists for your favorite LoL tournaments. Compare rankings and get insights from the community'

export const WEBSITE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://www.lol-tier-list.com'
    : 'http://localhost:3000'
