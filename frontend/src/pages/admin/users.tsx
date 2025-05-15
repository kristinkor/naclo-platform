// src/pages/admin/users.tsx
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
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

export type NewUser = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword?: string
  roleId: number
  birthdate?: string
  grade?: string
  countryOfIOL?: string
  state?: string
  city?: string
  school?: string
  languages?: string
}

interface StudentProfile {
  grade: string
  city: string
  state: string
  school?: string
  countryOfIOL: string
  birthdate: string
  languages?: string
  siteId?: number
}

interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  roleId: number
  emailConfirmed: boolean
  role: { name: string }
  student?: StudentProfile
}

function ensureStudentFields(student?: StudentProfile): StudentProfile {
  return {
    grade: student?.grade || '',
    city: student?.city || '',
    state: student?.state || '',
    school: student?.school || '',
    countryOfIOL: student?.countryOfIOL || '',
    birthdate: student?.birthdate || '',
    languages: student?.languages || '',
    siteId: student?.siteId ?? undefined,
  }
}

export default function UsersAdminPage() {
  const { user, loading: authLoading } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [editUser, setEditUser] = useState<User | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null)
  const [openAdd, setOpenAdd] = useState(false)

  const [newUser, setNewUser] = useState<NewUser>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 3,
    birthdate: '',
    grade: '',
    countryOfIOL: '',
    state: '',
    city: '',
    school: '',
    languages: '',
  })

  useEffect(() => {
    if (!authLoading && (!user || user.roleId !== 1)) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    setAuthToken(token)
    fetchUsers()
  }, [])

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

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!newUser.firstName.trim()) errors.firstName = 'First name is required'
    if (!newUser.lastName.trim()) errors.lastName = 'Last name is required'
    if (!/\S+@\S+\.\S+/.test(newUser.email))
      errors.email = 'Invalid email format'
    if (newUser.password.length < 6)
      errors.password = 'Password must be at least 6 characters'
    if (newUser.roleId === 3) {
      if (!newUser.birthdate) errors.birthdate = 'Birthdate is required'
      if (!newUser.grade) errors.grade = 'Grade is required'
      if (!newUser.countryOfIOL) errors.countryOfIOL = 'Country is required'
      if (!newUser.state) errors.state = 'State is required'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleAdd = async () => {
    if (!validateForm()) return
    try {
      const payload = { ...newUser, confirmPassword: newUser.password }
      const res = await api.post('/auth/register', payload)
      setUsers((prev) => [...prev, res.data.user])
      setOpenAdd(false)
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: 3,
        birthdate: '',
        grade: '',
        countryOfIOL: '',
        state: '',
        city: '',
        school: '',
        languages: '',
      })
      setFormErrors({})
    } catch (error: any) {
      console.error('Error adding user:', error.response?.data || error.message)
      alert(
        error.response?.data?.message || 'Failed to add user. Try again later.'
      )
    }
  }

  const handleDelete = async () => {
    if (!deleteUserId) return
    const token = localStorage.getItem('token')
    setAuthToken(token)
    try {
      await api.delete(`/users/${deleteUserId}`)
      setUsers((prev) => prev.filter((u) => u.id !== deleteUserId))
      setDeleteUserId(null)
    } catch (err) {
      console.error('Error deleting user:', err)
      alert('Failed to delete user.')
    }
  }

  const handleEdit = (user: User) => {
    setEditUser({
      ...user,
      student: ensureStudentFields(user.student),
    })
  }

  const updateEditUserField = (field: keyof StudentProfile, value: string) => {
    setEditUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        student: {
          ...ensureStudentFields(prev.student),
          [field]: value,
        },
      }
    })
  }

  const handleSave = async () => {
    if (!editUser) return
    try {
      await api.put(`/users/${editUser.id}`, {
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        student: {
          grade: editUser.student?.grade,
          city: editUser.student?.city,
        },
      })
      await fetchUsers()
      setEditUser(null)
    } catch (err) {
      console.error('Error updating user:', err)
      alert('Failed to update user.')
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

  if (loading || authLoading) return <Typography>Loading...</Typography>

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 1,
            width: 400,
          }}
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
              setEditUser((prev) => {
                if (!prev) return null

                return {
                  ...prev,
                  student: {
                    ...ensureStudentFields(prev.student),
                    grade: e.target.value, // or Number(e.target.value) if grade is number
                  },
                }
              })
            }
          />

          <TextField
            label="City"
            value={editUser?.student?.city || ''}
            onChange={(e) => updateEditUserField('city', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!deleteUserId} onClose={() => setDeleteUserId(null)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteUserId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Button
        variant="contained"
        sx={{ my: 2 }}
        onClick={() => setOpenAdd(true)}
      >
        Add User
      </Button>
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 400,
          }}
        >
          <TextField
            label="First Name"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
            error={!!formErrors.firstName}
            helperText={formErrors.firstName}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
            error={!!formErrors.lastName}
            helperText={formErrors.lastName}
            fullWidth
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            error={!!formErrors.email}
            helperText={formErrors.email}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            error={!!formErrors.password}
            helperText={formErrors.password}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.roleId}
              label="Role"
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  roleId: parseInt(e.target.value as string),
                })
              }
            >
              <MenuItem value={1}>Webmaster</MenuItem>
              <MenuItem value={2}>Organizer</MenuItem>
              <MenuItem value={3}>Student</MenuItem>
              <MenuItem value={4}>Host</MenuItem>
            </Select>
          </FormControl>

          {newUser.roleId === 3 && (
            <>
              <TextField
                label="Birthdate"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newUser.birthdate}
                onChange={(e) =>
                  setNewUser({ ...newUser, birthdate: e.target.value })
                }
                error={!!formErrors.birthdate}
                helperText={formErrors.birthdate}
              />
              <TextField
                label="Grade"
                value={newUser.grade}
                onChange={(e) =>
                  setNewUser({ ...newUser, grade: e.target.value })
                }
                error={!!formErrors.grade}
                helperText={formErrors.grade}
              />
              <TextField
                label="Country of IOL"
                value={newUser.countryOfIOL}
                onChange={(e) =>
                  setNewUser({ ...newUser, countryOfIOL: e.target.value })
                }
                error={!!formErrors.countryOfIOL}
                helperText={formErrors.countryOfIOL}
              />
              <TextField
                label="State"
                value={newUser.state}
                onChange={(e) =>
                  setNewUser({ ...newUser, state: e.target.value })
                }
                error={!!formErrors.state}
                helperText={formErrors.state}
              />
              <TextField
                label="City"
                value={newUser.city}
                onChange={(e) =>
                  setNewUser({ ...newUser, city: e.target.value })
                }
              />
              <TextField
                label="School"
                value={newUser.school}
                onChange={(e) =>
                  setNewUser({ ...newUser, school: e.target.value })
                }
              />
              <TextField
                label="Languages"
                value={newUser.languages}
                onChange={(e) =>
                  setNewUser({ ...newUser, languages: e.target.value })
                }
              />
            </>
          )}
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
