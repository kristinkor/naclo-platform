import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material'

export default function ConfirmEmailPage() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [message, setMessage] = useState('Confirming your email...')

  useEffect(() => {
    const confirmEmail = async () => {
      const token = router.query.token
      if (!token || typeof token !== 'string') return

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
        const url = `${baseUrl.replace(
          /\/+$/,
          ''
        )}/api/auth/confirm?token=${token}`

        const res = await axios.get(url)
        setStatus('success')
        setMessage(res.data.message || '✅ Email confirmed successfully!')
      } catch (err) {
        console.error('❌ Confirmation failed:', err)
        setStatus('error')
        setMessage(
          '❌ Email confirmation failed. The link may be invalid or expired.'
        )
      }
    }

    if (router.isReady) {
      confirmEmail()
    }
  }, [router.isReady, router.query.token])

  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Email Confirmation
      </Typography>

      {status === 'loading' ? (
        <CircularProgress sx={{ mt: 5 }} />
      ) : (
        <Box mt={4}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {message}
          </Typography>
          <Button variant="contained" onClick={() => router.push('/login')}>
            Go to Login
          </Button>
        </Box>
      )}
    </Container>
  )
}
