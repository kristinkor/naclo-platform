import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Host {
  id: number
  email: string
}

const enumOptions = {
  type: ['UNIVERSITY', 'HIGH_SCHOOL'],
  eligibility: ['OPEN_TO_ALL', 'ENROLLED_ONLY'],
  openness: ['OPEN', 'CLOSED', 'APPROVAL_REQUIRED'],
  timezone: ['EST', 'CST', 'MST', 'PST'],
}

export default function AdminSitesPage() {
  const [form, setForm] = useState({
    name: '',
    country: '',
    city: '',
    state: '',
    zip: '',
    address: '',
    capacity: '',
    type: '',
    eligibility: '',
    openness: '',
    timezone: '',
    website: '',
    latitude: '',
    longitude: '',
    hostIds: [] as number[],
  })

  const [hosts, setHosts] = useState<Host[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users?role=HOST`)
      .then((res) => setHosts(res.data))
      .catch(() => setHosts([]))
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelect = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event

    setForm((prev) => ({
      ...prev,
      hostIds:
        typeof value === 'string'
          ? value.split(',').map(Number)
          : value.map(Number),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const payload = {
        ...form,
        capacity: parseInt(form.capacity),
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        hostIds: form.hostIds,
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sites`,
        payload
      )

      setMessage('✅ Site added successfully!')
      setForm({
        name: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        address: '',
        capacity: '',
        type: '',
        eligibility: '',
        openness: '',
        timezone: '',
        website: '',
        latitude: '',
        longitude: '',
        hostIds: [],
      })
    } catch (err) {
      setMessage('❌ Failed to add site.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Add New Contest Site
      </Typography>
      <Paper sx={{ p: 4, maxWidth: 900, mx: 'auto' }} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Basic Info */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Site Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="website"
                label="Website (optional)"
                value={form.website}
                onChange={handleChange}
              />
            </Grid>

            {/* Location Fields */}
            {['country', 'city', 'state', 'zip', 'address'].map((field) => (
              <Grid key={field} item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name={field}
                  label={field[0].toUpperCase() + field.slice(1)}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  required
                />
              </Grid>
            ))}

            {/* Capacity + Lat/Lng */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="capacity"
                label="Capacity"
                type="number"
                value={form.capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="latitude"
                label="Latitude"
                type="number"
                value={form.latitude}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name="longitude"
                label="Longitude"
                type="number"
                value={form.longitude}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Enums */}
            {(Object.keys(enumOptions) as (keyof typeof enumOptions)[]).map(
              (field) => (
                <Grid key={field} item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>
                      {field[0].toUpperCase() + field.slice(1)}
                    </InputLabel>
                    <Select
                      name={field}
                      value={(form as any)[field]}
                      label={field}
                      onChange={handleChange}
                    >
                      {enumOptions[field].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option.replace(/_/g, ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )
            )}

            {/* Hosts */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Hosts</InputLabel>
                <Select
                  multiple
                  value={form.hostIds}
                  onChange={handleMultiSelect}
                  input={<OutlinedInput label="Hosts" />}
                  renderValue={(selected) =>
                    (selected as number[])
                      .map(
                        (id) =>
                          hosts.find((host) => host.id === id)?.email ||
                          `User ${id}`
                      )
                      .join(', ')
                  }
                >
                  {hosts.map((host) => (
                    <MenuItem key={host.id} value={host.id}>
                      <Checkbox checked={form.hostIds.includes(host.id)} />
                      <ListItemText primary={host.email} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Submit */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Create Site'}
              </Button>
              {message && (
                <Typography sx={{ mt: 2 }} textAlign="center" color="primary">
                  {message}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
