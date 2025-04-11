import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
        const url = `${baseUrl.replace(/\/+$/, '')}/api/sites`
        const res = await axios.get(url, { withCredentials: true })
        const sitesData = res.data?.data
        setSites(Array.isArray(sitesData) ? sitesData : [])
      } catch (error) {
        console.error('❌ Site fetch failed:', error)
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
    const newErrors: { [key: string]: string } = {}

    if (!form.firstName) newErrors.firstName = 'First name is required.'
    if (!form.lastName) newErrors.lastName = 'Last name is required.'
    if (!form.email) newErrors.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Invalid email format.'

    if (!form.password) newErrors.password = 'Password is required.'
    else if (form.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters.'

    if (!form.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.'

    if (!form.siteId) newErrors.siteId = 'Please select a site.'
    if (!form.country) newErrors.country = 'Please select a country.'
    if (!form.city) newErrors.city = 'City is required.'
    if (!form.state) newErrors.state = 'State is required.'
    if (!form.zip) newErrors.zip = 'ZIP is required.'
    if (!form.birthdate) newErrors.birthdate = 'Birthdate is required.'
    if (!form.grade) newErrors.grade = 'Grade is required.'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})
    setSuccess('')

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

      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || '').replace(
        /\/+$/,
        ''
      )
      const endpoint = '/api/auth/register'
      const url = `${baseUrl}${endpoint}`
      const res = await axios.post(url, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('🌐 API URL:', baseUrl)
      console.log('🧭 Final URL:', url)
      console.log('📦 Payload:', payload)
      setSuccess(
        res.data.message ||
          '✅ Registration successful! Please check your email.'
      )

      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      console.error('❌ Registration error:', err)
      setErrors({ global: 'Registration failed. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom>
        Register for NACLO
      </Typography>

      {errors.global && <Typography color="error">{errors.global}</Typography>}
      {success && (
        <Typography color="primary" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          name="firstName"
          label="First Name"
          value={form.firstName}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={form.lastName}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal" error={!!errors.siteId}>
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
          {errors.siteId && (
            <Typography color="error" variant="caption">
              {errors.siteId}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal" error={!!errors.country}>
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
          {errors.country && (
            <Typography color="error" variant="caption">
              {errors.country}
            </Typography>
          )}
        </FormControl>

        <TextField
          name="city"
          label="City"
          value={form.city}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.city}
          helperText={errors.city}
        />
        <TextField
          name="state"
          label="State"
          value={form.state}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.state}
          helperText={errors.state}
        />
        <TextField
          name="zip"
          label="ZIP"
          value={form.zip}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.zip}
          helperText={errors.zip}
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
          error={!!errors.birthdate}
          helperText={errors.birthdate}
        />
        <TextField
          name="grade"
          label="Grade"
          type="number"
          value={form.grade}
          onChange={handleTextChange}
          fullWidth
          margin="normal"
          error={!!errors.grade}
          helperText={errors.grade}
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
          error={!!errors.password}
          helperText={errors.password}
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
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
