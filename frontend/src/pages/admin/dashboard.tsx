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

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([])
  const [contests, setContests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [editContest, setEditContest] = useState<any | null>(null)
  const [open, setOpen] = useState(false)
  const [newContest, setNewContest] = useState({
    name: '',
    year: '',
    round: '',
    status: '',
  })
  const [errors, setErrors] = useState<any>({})
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
          router.push('/dashboard') // Redirect if not admin
        }
      })
      .catch(() => {
        localStorage.removeItem('token')
        setAuthToken(null)
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (user && user.roleId === 1) {
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

  const handleEdit = (contest: any) => {
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
    let tempErrors: any = {}
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
      const formattedContest = {
        name: newContest.name,
        year: parseInt(newContest.year),
        round: parseInt(newContest.round),
        status: newContest.status,
      }

      const res = await api.post('/contests', formattedContest)
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
    <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Typography variant="h6" sx={{ marginTop: '20px' }}>
        Users
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: '30px' }}>
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

      <Typography variant="h6">Contests</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: '20px' }}
        onClick={() => setOpen(true)}
      >
        Add Contest
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Contest</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            value={newContest.name}
            onChange={(e) =>
              setNewContest({ ...newContest, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Year"
            type="number"
            value={newContest.year}
            onChange={(e) =>
              setNewContest({ ...newContest, year: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Round"
            type="number"
            value={newContest.round}
            onChange={(e) =>
              setNewContest({ ...newContest, round: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Status"
            value={newContest.status}
            onChange={(e) =>
              setNewContest({ ...newContest, status: e.target.value })
            }
            margin="normal"
          />
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
                  {editContest && editContest.id === contest.id ? (
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
                  {editContest && editContest.id === contest.id ? (
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
      <Button
        variant="contained"
        color="secondary"
        sx={{ marginTop: '20px' }}
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
