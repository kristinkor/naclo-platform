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

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const apiUrl = 'https://naclo-platform.onrender.com' // Access the API URL from environment variable
        console.log('API URL:', apiUrl) // Ensure this logs the correct URL
        if (!apiUrl) {
          console.error('API URL is not defined')
          return
        }

        const response = await axios.get(`${apiUrl}/api/announcements`)
        setAnnouncements(response.data)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      }
    }

    fetchAnnouncements()

    // Check user role (assuming role is stored in localStorage)
    const userRole = localStorage.getItem('role')
    setIsWebmaster(userRole === '1') // Webmaster role is "1"
  }, []) // Empty array ensures the effect runs once when the component mounts

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
      setAnnouncements([res.data, ...announcements]) // Add new announcement to state
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
      setAnnouncements(announcements.filter((_, i) => i !== index)) // Remove deleted announcement
    } catch (error) {
      console.error('Error deleting announcement:', error)
    }
  }

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ mt: 5, mb: 3 }} // Increased margin-top and margin-bottom for more separation
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
          <Button variant="contained" color="primary" onClick={addAnnouncement}>
            Add
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          mt: 5, // Adding more margin-top for separation before the announcements list
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
              borderBottom: '1px solid #ddd', // Light border between items
              marginBottom: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: 'purple', // Purple color for the date
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
