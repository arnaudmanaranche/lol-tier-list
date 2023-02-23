import { Redis } from '@upstash/redis'

export const ONE_YEAR_IN_SECONDS = 15778476

export const redisClient = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})
