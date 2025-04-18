import axios from 'axios'
import { api } from './api'
import { NextRouter } from 'next/router'
import { UserType } from '../types/user'

// Sets the auth token in Axios headers for future requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// Unified submit handler for login and registration
export const handleSubmit = async (
  e: React.FormEvent,
  form: {
    email: string
    password: string
    firstName?: string
    lastName?: string
    confirmPassword?: string
    phone?: string
    state?: string
    city?: string
    zip?: string
    country?: string
    birthdate?: string
    grade?: number
    roleId?: number
  },
  setError: (error: string) => void,
  isRegister: boolean,
  router: NextRouter
): Promise<UserType | null | void> => {
  e.preventDefault()
  setError('')

  try {
    if (isRegister) {
      const roleId = form.roleId ?? 3
      await api.post('/auth/register', { ...form, roleId })
      router.push('/login')
      return
    }

    const res = await api.post('/auth/login', {
      email: form.email,
      password: form.password,
    })

    const { token, user }: { token: string; user: UserType } = res.data
    localStorage.setItem('token', token)
    setAuthToken(token)

    return user
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      const serverMsg = err.response?.data?.message

      if (status === 403) {
        setError(serverMsg || 'Please confirm your email before logging in.')
      } else if (status === 400) {
        setError(serverMsg || 'Invalid email or password.')
      } else {
        setError(serverMsg || 'Something went wrong. Try again later.')
      }
    } else if (err instanceof Error) {
      setError(err.message)
    } else {
      setError('An unexpected error occurred.')
    }

    return null
  }
}

// Fetch the currently authenticated user
export const getUserProfile = async () => {
  try {
    const res = await api.get('/users/me')
    return res.data
  } catch {
    return null
  }
}
