// src/pages/reset-password.tsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'

export default function ResetPasswordPage() {
  const router = useRouter()
  const { token } = router.query

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-confirm`,
        { token, newPassword: password }
      )
      setMessage(res.data.message || 'Password reset successful')
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setMessage('Reset failed. The link may be invalid or expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Reset Password'}
        </Button>
      </form>
      {message && (
        <Typography sx={{ mt: 2 }} color="secondary">
          {message}
        </Typography>
      )}
    </Container>
  )
}
