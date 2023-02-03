import axios from 'axios'

console.log(process.env.NEXT_PUBLIC_VERCEL_URL)
console.log(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`)

const API_ENDPOINT = {
  development: 'http://localhost:3000/api',
  preview: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`,
  production: 'https://lol-power-ranking.app/api'
}[process.env.NEXT_PUBLIC_APP_ENV]

export const apiInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true
})
