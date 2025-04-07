import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, '../../data/announcements.json')

// Load announcements
export const getAnnouncements = (req, res) => {
  const data = fs.readFileSync(filePath)
  res.json(JSON.parse(data))
}

// Add new announcement (Webmasters only)
export const addAnnouncement = (req, res) => {
  if (req.user.role !== 1) return res.status(403).json({ message: 'Forbidden' })

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

  const data = JSON.parse(fs.readFileSync(filePath))
  data.unshift(newAnnouncement)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  res.json(newAnnouncement)
}

// Delete an announcement (Webmasters only)
export const deleteAnnouncement = (req, res) => {
  if (req.user.role !== 1) return res.status(403).json({ message: 'Forbidden' })

  const index = parseInt(req.params.index, 10)
  let data = JSON.parse(fs.readFileSync(filePath))
  if (index >= 0 && index < data.length) {
    data.splice(index, 1)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    res.json({ message: 'Deleted successfully' })
  } else {
    res.status(400).json({ message: 'Invalid index' })
  }
}
