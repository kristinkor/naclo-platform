import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '../utils/api'
import axios, { AxiosError } from 'axios'
import { SelectChangeEvent } from '@mui/material/Select'

import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

type Site = {
  id: number
  name: string
}

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
]

type FormType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  siteId: string
  gender: string
  pastComp: string
  languages: string[]
  grade: string
  city: string
  state: string
  zip: string
  country: string
  birthdate: string
}

export default function Register() {
  const [form, setForm] = useState<FormType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    siteId: '',
    gender: '',
    pastComp: '',
    languages: [],
    grade: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    birthdate: '',
  })

  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + '/api/sites'
        )
        setSites(res.data.data)
      } catch (error) {
        console.error('❌ Site fetch failed', error)
        setSites([])
      }
    }
    fetchSites()
  }, [])

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLanguagesChange = (e: SelectChangeEvent<string[]>) => {
    const { value } = e.target
    setForm((prev) => ({
      ...prev,
      languages: typeof value === 'string' ? value.split(',') : value,
    }))
  }

  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email) {
      setError('Please fill in all required fields.')
      return false
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Invalid email format.')
      return false
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!validateForm()) {
      setLoading(false)
      return
    }

    try {
      const payload = {
        ...form,
        siteId: form.siteId ? parseInt(form.siteId) : null,
        countryOfIOL: form.country,
        roleId: 3,
      }

      await api.post('/api/auth/register', payload, { withCredentials: true })

      router.push('/login')
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || 'Registration failed')
      } else {
        setError('Unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Register for NACLO
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Site</InputLabel>
          <Select
            name="siteId"
            value={form.siteId}
            onChange={handleSelectChange}
            label="Site"
          >
            {sites.length > 0 ? (
              sites.map((site) => (
                <MenuItem key={site.id} value={site.id.toString()}>
                  {site.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Sites loading or unavailable</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={form.country}
            onChange={handleSelectChange}
            label="Country"
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="city"
          label="City"
          value={form.city}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="state"
          label="State"
          value={form.state}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="zip"
          label="ZIP"
          value={form.zip}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="birthdate"
          label="Birthdate"
          type="date"
          value={form.birthdate}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          name="grade"
          label="Grade"
          type="number"
          value={form.grade}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Languages</InputLabel>
          <Select
            multiple
            name="languages"
            value={form.languages}
            onChange={handleLanguagesChange}
            renderValue={(selected) => (selected as string[]).join(', ')}
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
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Register'}
        </Button>
      </form>
    </Container>
  )
}
