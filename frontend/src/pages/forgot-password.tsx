// src/pages/forgot-password.tsx
import { useState } from 'react'
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        { email }
      )
      setMessage(res.data.message || 'Reset link sent if email exists.')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress size={20} /> : 'Send Reset Link'}
        </Button>
      </form>
      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Container>
  )
}
