import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { api, setAuthToken } from '../../utils/api'
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  roleId: number
}

type Contest = {
  id: number
  name: string
  year: number
  round: number
  status: string
}

type NewContest = {
  name: string
  year: string
  round: string
  status: string
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [contests, setContests] = useState<Contest[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [editContest, setEditContest] = useState<Contest | null>(null)
  const [open, setOpen] = useState(false)
  const [newContest, setNewContest] = useState<NewContest>({
    name: '',
    year: '',
    round: '',
    status: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    setAuthToken(token)

    api
      .get('/users/me')
      .then((res) => {
        setUser(res.data)
        if (res.data.roleId !== 1) {
          router.push('/dashboard')
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        setAuthToken(null)
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  useEffect(() => {
    if (user?.roleId === 1) {
      api
        .get('/users')
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('Error fetching users:', err))

      api
        .get('/contests')
        .then((res) => setContests(res.data))
        .catch((err) => console.error('Error fetching contests:', err))
    }
  }, [user])

  const handleEdit = (contest: Contest) => {
    setEditContest(contest)
  }

  const handleSave = async () => {
    if (!editContest) return
    try {
      await api.put(`/contests/${editContest.id}`, editContest)
      setContests(
        contests.map((c) => (c.id === editContest.id ? editContest : c))
      )
      setEditContest(null)
    } catch (error) {
      console.error('Error updating contest:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/contests/${id}`)
      setContests(contests.filter((contest) => contest.id !== id))
    } catch (error) {
      console.error('Error deleting contest:', error)
    }
  }

  const validateForm = () => {
    const tempErrors: Record<string, string> = {}
    if (!newContest.name) tempErrors.name = 'Contest name is required'
    if (!newContest.year || isNaN(Number(newContest.year)))
      tempErrors.year = 'Valid year is required'
    if (!newContest.round || isNaN(Number(newContest.round)))
      tempErrors.round = 'Valid round is required'
    if (!newContest.status) tempErrors.status = 'Status is required'
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleAddContest = async () => {
    if (!validateForm()) return

    try {
      const formatted = {
        name: newContest.name,
        year: parseInt(newContest.year),
        round: parseInt(newContest.round),
        status: newContest.status,
      }

      const res = await api.post('/contests', formatted)
      setContests([...contests, res.data.contest])
      setOpen(false)
      setNewContest({ name: '', year: '', round: '', status: '' })
      setErrors({})
    } catch (error) {
      console.error('Error adding contest:', error)
    }
  }

  if (loading) return <Typography>Loading...</Typography>
  if (!user || user.roleId !== 1) return null

  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Users Table */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roleId === 1 ? 'Admin' : 'User'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Contest Button */}
      <Typography variant="h6">Contests</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Contest
      </Button>

      {/* Add Contest Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Contest</DialogTitle>
        <DialogContent>
          {['name', 'year', 'round', 'status'].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field[0].toUpperCase() + field.slice(1)}
              value={newContest[field as keyof NewContest]}
              onChange={(e) =>
                setNewContest((prev) => ({
                  ...prev,
                  [field]: e.target.value,
                }))
              }
              margin="normal"
              type={field === 'year' || field === 'round' ? 'number' : 'text'}
              error={!!errors[field]}
              helperText={errors[field]}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddContest}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Contest Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Round</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contests.map((contest) => (
              <TableRow key={contest.id}>
                <TableCell>{contest.id}</TableCell>
                <TableCell>
                  {editContest?.id === contest.id ? (
                    <TextField
                      value={editContest.name}
                      onChange={(e) =>
                        setEditContest({ ...editContest, name: e.target.value })
                      }
                    />
                  ) : (
                    contest.name
                  )}
                </TableCell>
                <TableCell>{contest.year}</TableCell>
                <TableCell>{contest.round}</TableCell>
                <TableCell>{contest.status}</TableCell>
                <TableCell>
                  {editContest?.id === contest.id ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={() => handleEdit(contest)}
                    >
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(contest.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Logout */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 4 }}
        onClick={() => {
          localStorage.removeItem('token')
          setAuthToken(null)
          router.push('/login')
        }}
      >
        Logout
      </Button>
    </Container>
  )
}
