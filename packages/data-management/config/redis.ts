import Redis from 'ioredis'

export const ONE_YEAR_IN_SECONDS = 15778476

export const redis = new Redis(`${process.env.REDIS_URL}`)
