import { useState } from 'react'
import { useRouter } from 'next/router'
import { handleSubmit } from '../utils/auth'
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from '@mui/material'
import { useAuth } from '@/context/AuthContext' // ✅ make sure this is correct

// inside your component

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const user = await handleSubmit(e, form, setError, false, router)

      if (!user) return

      setUser(user) // ✅ Save user in global context

      // ✅ Redirect based on role
      const roleMap = {
        1: '/profile/webmaster',
        2: '/profile/organizer',
        3: '/profile/student',
        4: '/profile/host',
      }

      const target = roleMap[user.roleId] || '/login'
      router.push(target)
    } catch (err) {
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Login to NACLO
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </form>
      <Typography sx={{ marginTop: '10px', textAlign: 'center' }}>
        <Link href="/forgot-password" underline="hover">
          Forgot Password?
        </Link>
      </Typography>
      <Typography sx={{ marginTop: '10px', textAlign: 'center' }}>
        Don't have an account?{' '}
        <Link href="/register" underline="hover">
          Create one
        </Link>
      </Typography>
    </Container>
  )
}
