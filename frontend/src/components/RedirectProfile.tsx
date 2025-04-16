import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function RedirectProfile() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) return

    const roleMap = {
      1: '/profile/webmaster',
      2: '/profile/organizer',
      3: '/profile/student',
      4: '/profile/host',
    }

    const destination = roleMap[user.roleId]
    if (destination) {
      router.replace(destination)
    }
  }, [user, router])

  return null
}
