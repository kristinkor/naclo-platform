import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '../../data/announcements.json')

// cashing
let cachedAnnouncements = []

const loadAnnouncements = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    cachedAnnouncements = JSON.parse(data)
  } catch (err) {
    console.error('❌ Error loading announcements:', err)
    cachedAnnouncements = []
  }
}
loadAnnouncements()

// get all announcements
export const getAnnouncements = (req, res) => {
  res.json(cachedAnnouncements)
}

// add new only webmaster
export const addAnnouncement = (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { text, link } = req.body
  const newAnnouncement = {
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    text,
    link,
  }

  cachedAnnouncements.unshift(newAnnouncement)
  fs.writeFileSync(filePath, JSON.stringify(cachedAnnouncements, null, 2))
  res.json(newAnnouncement)
}

// only webmaster can delete
export const deleteAnnouncement = (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const index = parseInt(req.params.index, 10)
  if (index >= 0 && index < cachedAnnouncements.length) {
    cachedAnnouncements.splice(index, 1)
    fs.writeFileSync(filePath, JSON.stringify(cachedAnnouncements, null, 2))
    res.json({ message: 'Deleted successfully' })
  } else {
    res.status(400).json({ message: 'Invalid index' })
  }
}

// webmaster only - reload announcements
export const reloadAnnouncements = (req, res) => {
  if (req.user.role !== 1) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    cachedAnnouncements = JSON.parse(data)
    res.json({ message: 'Announcements reloaded successfully.' })
  } catch (err) {
    console.error('❌ Failed to reload announcements:', err)
    res.status(500).json({ message: 'Failed to reload announcements.' })
  }
}
