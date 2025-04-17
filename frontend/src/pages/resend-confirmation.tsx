import { useState } from 'react'
import axios from 'axios'
import { Container, TextField, Button, Typography } from '@mui/material'

export default function ResendConfirmation() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleResend = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-confirmation`,
        { email }
      )
      setMessage(res.data.message || 'Confirmation email resent.')
    } catch {
      setMessage('Something went wrong.')
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5">Resend Confirmation Email</Typography>
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleResend}>
        Resend Email
      </Button>
      {message && (
        <Typography sx={{ mt: 2 }} color="primary">
          {message}
        </Typography>
      )}
    </Container>
  )
}
