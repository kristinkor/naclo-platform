import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  withCredentials: true,
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}` // ✅ critical
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}
