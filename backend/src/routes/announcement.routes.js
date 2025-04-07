import express from 'express'
import {
  getAnnouncements,
  addAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcement.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js' // Named import

const router = express.Router()

// Route to get all announcements
router.get('/', getAnnouncements)

// Route to add an announcement, requiring authentication
router.post('/', authenticateToken, addAnnouncement) // Corrected here

// Route to delete an announcement by index, requiring authentication
router.delete('/:index', authenticateToken, deleteAnnouncement) // Corrected here

export default router
