import Redis from 'ioredis'

export const ONE_YEAR_IN_SECONDS = 15778476

const initRedis = (isPreview) => {
  if (isPreview) return null

  new Redis(process.env.REDIS_URL)
}

export default initRedis
