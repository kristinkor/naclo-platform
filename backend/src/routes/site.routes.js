import express from 'express'
import {
  getAllSites,
  getSiteById,
  createSite,
  updateSite,
  deleteSite,
} from '../controllers/site.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const router = express.Router()

// Accessible to all authenticated users
router.get('/', getAllSites)
router.get('/:id', getSiteById)

// Admin (1), Site Host (4) role protection
router.post('/', authenticateToken, authorizeRoles([1]), createSite)
router.put('/:id', authenticateToken, authorizeRoles([1, 4]), updateSite)
router.delete('/:id', authenticateToken, authorizeRoles([1]), deleteSite)

export default router
