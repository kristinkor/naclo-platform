// src/pages/register.tsx
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  InputAdornment,
  IconButton,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

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

type Site = {
  id: number
  name: string
}

type FormData = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  siteId: string
  country: string
  city: string
  state: string
  zip: string
  birthdate: string
  grade: string
  languages: string[]
}

export default function Register() {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    siteId: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    birthdate: '',
    grade: '',
    languages: [],
  })

  const [sites, setSites] = useState<Site[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
        const url = `${baseUrl.replace(/\/+/g, '')}/api/sites`
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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

  const handleResendConfirmation = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-confirmation`,
        { email: form.email }
      )
      setSuccess(res.data.message || 'Confirmation email resent.')
    } catch (err) {
      console.error('❌ Resend error:', err)
      setErrors({ global: 'Failed to resend confirmation email.' })
    }
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
      newErrors.password = 'Minimum 8 characters required.'

    if (!form.confirmPassword)
      newErrors.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.'

    if (sites.length > 0 && !form.siteId) {
      newErrors.siteId = 'Please select a site.'
    }
    if (!form.country) newErrors.country = 'Country is required.'
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
    setErrors({})
    setLoading(true)
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

      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
      const url = `${baseUrl.replace(/\/+/g, '')}/api/auth/register`

      const res = await axios.post(url, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      })

      setSuccess(res.data.message || 'Registration successful! Check email.')
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverMsg = err.response?.data?.message
        if (serverMsg?.toLowerCase().includes('already')) {
          setErrors({
            email: serverMsg,
            global: 'Already registered. Try to log in or resend confirmation.',
          })
        } else {
          setErrors({
            global: serverMsg || 'Registration failed. Try again later.',
          })
        }
      } else {
        setErrors({ global: 'Registration failed. Try again later.' })
      }
      console.error('Registration error:', err)
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

      {errors.email && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResendConfirmation}
          sx={{ mt: 2 }}
        >
          Resend Confirmation Email
        </Button>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        {errors.email && (
          <Typography variant="caption" color="error">
            {errors.email} <a href="/forgot-password">Forgot Password?</a>
          </Typography>
        )}
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal" error={!!errors.siteId}>
          <InputLabel>Site</InputLabel>
          <Select
            name="siteId"
            value={form.siteId}
            onChange={handleSelectChange}
          >
            {sites.length > 0 ? (
              sites.map((site) => (
                <MenuItem key={site.id} value={site.id.toString()}>
                  {site.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Sites are currently unavailable</MenuItem>
            )}
          </Select>
          {sites.length === 0 && (
            <Typography variant="caption" color="warning.main" sx={{ mt: 1 }}>
              Site list couldn’t be loaded. You can still register and assign a
              site later.
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.country}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={form.country}
            onChange={handleSelectChange}
          >
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
          </Select>
          {errors.country && (
            <Typography variant="caption" color="error">
              {errors.country}
            </Typography>
          )}
        </FormControl>
        <TextField
          label="City"
          name="city"
          value={form.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.city}
          helperText={errors.city}
        />
        <TextField
          label="State"
          name="state"
          value={form.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.state}
          helperText={errors.state}
        />
        <TextField
          label="ZIP"
          name="zip"
          value={form.zip}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.zip}
          helperText={errors.zip}
        />
        <TextField
          label="Birthdate"
          name="birthdate"
          type="date"
          value={form.birthdate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          error={!!errors.birthdate}
          helperText={errors.birthdate}
        />
        <TextField
          label="Grade"
          name="grade"
          type="number"
          value={form.grade}
          onChange={handleChange}
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
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={form.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
          sx={{ mt: 3 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Register'}
        </Button>
      </form>
    </Container>
  )
}
