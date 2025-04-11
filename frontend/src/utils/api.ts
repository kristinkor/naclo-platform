import axios from 'axios'

const rawBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || ''
const baseURL = `${rawBase}/api`

export const api = axios.create({
  baseURL,
  withCredentials: true,
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}
