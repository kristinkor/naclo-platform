import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/utils/api'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'

type Student = {
  firstName: string
  lastName: string
  email: string
  grade: number
}

type Site = {
  name: string
  city: string
  state: string
  capacity: number
}

export default function HostProfile() {
  const { user } = useAuth()
  const [site, setSite] = useState<Site | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    if (!user || !token) return

    const fetchHostData = async () => {
      try {
        const res = await api.get(`/users/${user.id}/host`)
        setSite(res.data.site)
        setStudents(res.data.students)
      } catch (err) {
        console.error('❌ Failed to load host data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHostData()
  }, [user])

  if (!user) return <Typography>Please log in</Typography>
  if (loading) return <CircularProgress />

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Host Dashboard
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6">Your Assigned Site</Typography>
          <Typography>Name: {site?.name}</Typography>
          <Typography>
            Location: {site?.city}, {site?.state}
          </Typography>
          <Typography>Capacity: {site?.capacity}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Registered Students
          </Typography>

          {students.length === 0 ? (
            <Typography>No students registered yet.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Grade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {student.firstName} {student.lastName}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}
