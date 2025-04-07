import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api } from '../../utils/api'
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
} from '@mui/material'

export default function StudentProfile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    api
      .get('/users/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!user) return null

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.firstName}!
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6">Your Info:</Typography>
        <Box>
          <Typography>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </Typography>
          <Typography>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography>
            <strong>Registered Site:</strong> {user.site || 'Not assigned'}
          </Typography>
          <Typography>
            <strong>Contests Attended:</strong> {user.pastComp || 0}
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button variant="contained" color="primary">
          Register for Contest
        </Button>
        <Button variant="outlined" color="secondary">
          View Scores
        </Button>
      </Box>
    </Container>
  )
}
