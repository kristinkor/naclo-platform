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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

const languagesList = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Arabic',
  'Russian',
  'Japanese',
  'Portuguese',
  'Italian',
  'Other',
]

type StudentFormData = {
  firstName: string
  lastName: string
  birthdate: string
  grade: string
  state: string
  school: string
  siteId: string
  languages: string[]
}

export default function StudentProfile() {
  const [form, setForm] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    birthdate: '',
    grade: '',
    state: '',
    school: '',
    siteId: '',
    languages: [],
  })
  const [editMode, setEditMode] = useState(false)
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
      .then((res) => {
        const student = res.data.student || {}
        setForm({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          birthdate: student.birthdate?.slice(0, 10) || '',
          grade: student.grade?.toString() || '',
          state: student.state || '',
          school: student.school || '',
          siteId: student.siteId?.toString() || '',
          languages: student.languages?.split(',') || [],
        })
      })
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLanguagesChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value
    setForm((prev) => ({
      ...prev,
      languages: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const handleSubmit = async () => {
    try {
      await api.put('/users/me', {
        ...form,
        grade: parseInt(form.grade),
        siteId: parseInt(form.siteId),
      })
      setEditMode(false)
    } catch (error) {
      console.error('❌ Update error:', error)
    }
  }

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Student Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        {!editMode ? (
          <>
            <Typography>
              <strong>Name:</strong> {form.firstName} {form.lastName}
            </Typography>
            <Typography>
              <strong>Birthdate:</strong> {form.birthdate}
            </Typography>
            <Typography>
              <strong>Grade:</strong> {form.grade}
            </Typography>
            <Typography>
              <strong>State:</strong> {form.state}
            </Typography>
            <Typography>
              <strong>School:</strong> {form.school}
            </Typography>
            <Typography>
              <strong>Languages:</strong> {form.languages.join(', ')}
            </Typography>
            <Typography>
              <strong>Site ID:</strong> {form.siteId}
            </Typography>
          </>
        ) : (
          <Box
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              name="firstName"
              label="First Name"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="lastName"
              label="Last Name"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="birthdate"
              label="Birthdate"
              type="date"
              value={form.birthdate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="grade"
              label="Grade"
              type="number"
              value={form.grade}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="state"
              label="State"
              value={form.state}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="school"
              label="School"
              value={form.school}
              onChange={handleChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Languages</InputLabel>
              <Select
                multiple
                value={form.languages}
                onChange={handleLanguagesChange}
                renderValue={(selected) => selected.join(', ')}
              >
                {languagesList.map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    <Checkbox checked={form.languages.includes(lang)} />
                    <ListItemText primary={lang} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="siteId"
              label="Site ID"
              value={form.siteId}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        )}
      </Paper>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        {editMode ? (
          <>
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Save Changes
            </Button>
            <Button variant="outlined" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
      </Box>
    </Container>
  )
}
