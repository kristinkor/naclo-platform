// admin/sites.tsx
import {
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
  Tabs,
  Tab,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface Host {
  id: number
  email: string
}

interface Site {
  id: number
  name: string
  city: string
  state: string
  website?: string
}

interface FullSite extends FormFields {
  id: number
  hosts?: Host[]
}

type FormFields = {
  name: string
  country: string
  city: string
  state: string
  zip: string
  address: string
  capacity: string
  type: string
  eligibility: string
  openness: string
  timezone: string
  website: string
  latitude: string
  longitude: string
  hostIds: number[]
}

const enumOptions = {
  type: ['UNIVERSITY', 'HIGH_SCHOOL'],
  eligibility: ['OPEN_TO_ALL', 'ENROLLED_ONLY'],
  openness: ['OPEN', 'CLOSED', 'APPROVAL_REQUIRED'],
  timezone: ['EST', 'CST', 'MST', 'PST'],
}

export default function AdminSitesPage() {
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState<FormFields>(emptyForm())
  const [hosts, setHosts] = useState<Host[]>([])
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [message, setMessage] = useState('')

  function emptyForm(): FormFields {
    return {
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
    }
  }

  useEffect(() => {
    fetchHosts()
    fetchSites()
  }, [])

  const fetchHosts = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users?role=HOST`)
      .then((res) => setHosts(res.data))
      .catch(() => setHosts([]))
  }

  const fetchSites = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sites`)
      .then((res) => setSites(res.data.data || []))
      .catch(() => setSites([]))
  }

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    if (!name) return
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleMultiSelect = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[]
    setForm((prev) => ({ ...prev, hostIds: value.map(Number) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const payload = {
        ...form,
        capacity: parseInt(form.capacity),
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
      }

      if (editingId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sites/${editingId}`,
          payload
        )
        setMessage('✅ Site updated successfully!')
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sites`,
          payload
        )
        setMessage('✅ Site added successfully!')
      }

      fetchSites()
      setForm(emptyForm())
      setEditingId(null)
      setTab(1)
    } catch {
      setMessage('❌ Failed to save site.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (site: FullSite) => {
    setEditingId(site.id)
    setForm({
      ...site,
      capacity: String(site.capacity),
      latitude: String(site.latitude),
      longitude: String(site.longitude),
      hostIds: site.hosts?.map((h: Host) => h.id) || [],
    })
    setTab(0)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this site?')) return
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/sites/${id}`)
      fetchSites()
    } catch {
      alert('Failed to delete site.')
    }
  }

  return (
    <Container sx={{ mt: 6, mb: 6 }}>
      <Tabs value={tab} onChange={(_, val) => setTab(val)} centered>
        <Tab label={editingId ? 'Edit Site' : 'Add Site'} />
        <Tab label="Site List" />
      </Tabs>

      {tab === 0 && (
        <Paper sx={{ p: 4, mt: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="Site Name"
                  value={form.name}
                  onChange={handleTextChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="website"
                  label="Website"
                  value={form.website}
                  onChange={handleTextChange}
                />
              </Grid>
              {['country', 'city', 'state', 'zip', 'address'].map((field) => (
                <Grid key={field} item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    name={field}
                    label={field[0].toUpperCase() + field.slice(1)}
                    value={form[field as keyof FormFields]}
                    onChange={handleTextChange}
                    required
                  />
                </Grid>
              ))}
              {['capacity', 'latitude', 'longitude'].map((field) => (
                <Grid key={field} item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    name={field}
                    label={field[0].toUpperCase() + field.slice(1)}
                    value={form[field as keyof FormFields]}
                    onChange={handleTextChange}
                    required
                    type="number"
                  />
                </Grid>
              ))}
              {(Object.keys(enumOptions) as (keyof typeof enumOptions)[]).map(
                (field) => (
                  <Grid key={field} item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel>{field}</InputLabel>
                      <Select
                        name={field}
                        value={form[field as keyof FormFields] as string}
                        label={field}
                        onChange={handleSelectChange}
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
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Hosts</InputLabel>
                  <Select<string[]>
                    multiple
                    name="hostIds"
                    value={form.hostIds.map(String)}
                    onChange={handleMultiSelect}
                    input={<OutlinedInput label="Hosts" />}
                    renderValue={(selected) =>
                      selected
                        .map(
                          (id) =>
                            hosts.find((h) => h.id === Number(id))?.email ||
                            `User ${id}`
                        )
                        .join(', ')
                    }
                  >
                    {hosts.map((host) => (
                      <MenuItem key={host.id} value={String(host.id)}>
                        <Checkbox checked={form.hostIds.includes(host.id)} />
                        <ListItemText primary={host.email} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : editingId ? (
                    'Update Site'
                  ) : (
                    'Create Site'
                  )}
                </Button>
                {message && (
                  <Typography textAlign="center" sx={{ mt: 2 }} color="primary">
                    {message}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}

      {tab === 1 && (
        <Box sx={{ mt: 4 }}>
          {sites.map((site) => (
            <Paper key={site.id} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">{site.name}</Typography>
              <Typography>
                {site.city}, {site.state}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <IconButton onClick={() => handleEdit(site as FullSite)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(site.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  )
}
