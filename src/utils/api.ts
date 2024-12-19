import axios from 'axios'

export const API_ENDPOINT = {
  test: 'http://localhost:3000/api',
  development: 'http://localhost:3000/api',
  production: 'https://www.lol-tier-list.com/api'
}[process.env.NODE_ENV]

export const apiInstance = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: true
})
