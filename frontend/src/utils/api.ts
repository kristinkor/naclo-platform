import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://your-backend.onrender.com',
  withCredentials: true,
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}` // ✅ critical
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}
