import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Button, TextField, Link } from '@mui/material'

interface Announcement {
  date: string
  text: string
  link?: string
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [newLink, setNewLink] = useState('')
  const [isWebmaster, setIsWebmaster] = useState(false)

  const fetchAnnouncements = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
      const apiUrl = `${baseUrl.replace(/\/+$/, '')}/api/announcements`
      const response = await axios.get(apiUrl)
      setAnnouncements(response.data)
    } catch (error) {
      console.error('❌ Error fetching announcements:', error)
    }
  }

  useEffect(() => {
    fetchAnnouncements()
    const userRole = localStorage.getItem('role')
    setIsWebmaster(userRole === '1')
  }, [])

  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) return
    try {
      const res = await axios.post(
        '/api/announcements',
        { text: newAnnouncement, link: newLink },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      setAnnouncements([res.data, ...announcements])
      setNewAnnouncement('')
      setNewLink('')
    } catch (error) {
      console.error('Error adding announcement:', error)
    }
  }

  const deleteAnnouncement = async (index: number) => {
    try {
      await axios.delete(`/api/announcements/${index}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setAnnouncements(announcements.filter((_, i) => i !== index))
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  const reloadAnnouncements = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
      const reloadUrl = `${baseUrl.replace(
        /\/+$/,
        ''
      )}/api/announcements/reload`
      const res = await axios.post(
        reloadUrl,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      console.log(res.data.message)
      fetchAnnouncements() // 🔁 обновить UI
    } catch (error) {
      console.error('❌ Failed to reload announcements:', error)
      alert('Failed to reload announcements.')
    }
  }

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ mt: 5, mb: 3 }}
      >
        Announcements
      </Typography>

      {isWebmaster && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            label="New Announcement"
            variant="outlined"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
          />
          <TextField
            fullWidth
            label="Link (Optional)"
            variant="outlined"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={addAnnouncement}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={reloadAnnouncements}
            >
              🔄 Reload Announcements
            </Button>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: 5,
          padding: 3,
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: 'transparent',
        }}
      >
        {announcements.map((announcement, index) => (
          <Box
            key={index}
            sx={{
              padding: 2,
              borderBottom: '1px solid #ddd',
              marginBottom: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: 'purple',
                marginBottom: 1,
              }}
            >
              {announcement.date}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              {announcement.text}
            </Typography>
            {announcement.link && (
              <Link
                href={announcement.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  color: '#0077cc',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Read more
              </Link>
            )}
            {isWebmaster && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteAnnouncement(index)}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            )}
          </Box>
        ))}
      </Box>
    </div>
  )
}

export default Announcements
