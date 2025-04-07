// pages/profile.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getUserProfile } from '../utils/auth'

export default function RedirectProfile() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login?redirect=profile')
      return
    }

    const redirect = async () => {
      const user = await getUserProfile()

      if (!user) {
        router.push('/login?redirect=profile')
        return
      }

      const roleMap = {
        1: '/profile/webmaster',
        2: '/profile/organizer',
        3: '/profile/student',
        4: '/profile/host',
      }

      const path = roleMap[user.roleId] || '/login'
      router.replace(path)
    }

    redirect()
  }, [router])

  return null // no UI; only redirecting
}
