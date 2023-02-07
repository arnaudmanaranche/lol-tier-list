import axios from 'axios'

// TODO[>0]: temporary
const API_ENDPOINT = {
  development: 'http://localhost:3000/api',
  preview: `https://lol-power-ranking.vercel.app/api`,
  production: 'https://lol-power-ranking.vercel.app/api'
}[process.env.NEXT_PUBLIC_APP_ENV]

export const apiInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true
})
