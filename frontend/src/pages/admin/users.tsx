// src/pages/admin/users.tsx
import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import { useRouter } from 'next/router'
import { api, setAuthToken } from '../../utils/api'

type StudentData = {
  grade?: number
  city?: string
  state?: string
  school?: string
}

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  emailConfirmed: boolean
  roleId: number
  role: { name: string }
  student?: StudentData
}

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: 3,
  })

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
        if (res.data.roleId !== 1) router.push('/')
        else fetchUsers()
      })
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [router])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditUser(user)
  }

  const handleSave = async () => {
    if (!editUser) return
    try {
      await api.put(`/users/${editUser.id}`, editUser, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      fetchUsers()
      setEditUser(null)
    } catch (err) {
      console.error('Error updating user:', err)
    }
  }

  const handleAdd = async () => {
    try {
      const payload = {
        ...newUser,
        confirmPassword: newUser.password,
      }
      const res = await api.post('/auth/register', payload)
      setUsers((prev) => [...prev, res.data.user])
      setOpenAdd(false)
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 3,
      })
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleResendConfirmation = async (email: string) => {
    try {
      await api.post('/auth/resend-confirmation', { email })
      alert(`Confirmation email sent to ${email}`)
    } catch (err) {
      console.error('Error resending confirmation:', err)
      alert('Failed to resend confirmation email.')
    }
  }

  if (loading) return <Typography>Loading...</Typography>

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Button
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => setOpenAdd(true)}
      >
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Confirmation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => setDeleteUserId(user.id)}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  {user.emailConfirmed ? (
                    <Typography color="success.main">Confirmed</Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      color="warning.main"
                      sx={{ display: 'block' }}
                    >
                      Not confirmed
                      <Button
                        size="small"
                        onClick={() => handleResendConfirmation(user.email)}
                        sx={{ ml: 1 }}
                      >
                        Resend
                      </Button>
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit dialog */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label="First Name"
            value={editUser?.firstName || ''}
            onChange={(e) =>
              setEditUser(
                (prev) => prev && { ...prev, firstName: e.target.value }
              )
            }
          />
          <TextField
            label="Last Name"
            value={editUser?.lastName || ''}
            onChange={(e) =>
              setEditUser(
                (prev) => prev && { ...prev, lastName: e.target.value }
              )
            }
          />
          <TextField
            label="Grade"
            type="number"
            value={editUser?.student?.grade || ''}
            onChange={(e) =>
              setEditUser((prev) =>
                prev
                  ? {
                      ...prev,
                      student: {
                        ...prev.student,
                        grade: Number(e.target.value),
                      },
                    }
                  : null
              )
            }
          />
          <TextField
            label="City"
            value={editUser?.student?.city || ''}
            onChange={(e) =>
              setEditUser((prev) =>
                prev
                  ? {
                      ...prev,
                      student: { ...prev.student, city: e.target.value },
                    }
                  : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={deleteUserId !== null}
        onClose={() => setDeleteUserId(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Do you really want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)}>Cancel</Button>
          <Button
            onClick={async () => {
              try {
                await api.delete(`/users/${deleteUserId}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                })
                setUsers((prev) => prev.filter((u) => u.id !== deleteUserId))
              } catch (err) {
                console.error('Error deleting user:', err)
              } finally {
                setDeleteUserId(null)
              }
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="First Name"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Last Name"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.roleId}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  roleId: parseInt(e.target.value as string),
                })
              }
              label="Role"
            >
              <MenuItem value={1}>Webmaster</MenuItem>
              <MenuItem value={2}>Organizer</MenuItem>
              <MenuItem value={3}>Student</MenuItem>
              <MenuItem value={4}>Host</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
