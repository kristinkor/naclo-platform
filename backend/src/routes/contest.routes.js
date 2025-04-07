import express from 'express'
import {
  createContest,
  editContest,
  deleteContest,
  getAllContests,
} from '../controllers/contest.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const router = express.Router()

// Contest Routes
router.post('/', authenticateToken, authorizeRoles([1]), createContest) // Admins Only
router.put('/:id', authenticateToken, authorizeRoles([1]), editContest) // Admins Only
router.delete('/:id', authenticateToken, authorizeRoles([1]), deleteContest) // Admins Only
router.get('/', authenticateToken, getAllContests) // All Users Can View Contests

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// Fetch all contests (already implemented)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching all contests...') // ✅ Debugging

    const contests = await prisma.contest.findMany({
      select: { id: true, name: true, year: true, round: true, status: true },
    })

    res.json(contests)
  } catch (error) {
    console.error('Error fetching contests:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Create a new contest (Admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const { name, year, round, status } = req.body

    const newContest = await prisma.contest.create({
      data: { name, year, round, status },
    })

    res
      .status(201)
      .json({ message: 'Contest created successfully', contest: newContest })
  } catch (error) {
    console.error('Error creating contest:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Edit a contest (Admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const { id } = req.params
    const { name, year, round, status } = req.body

    const updatedContest = await prisma.contest.update({
      where: { id: parseInt(id) },
      data: { name, year, round, status },
    })

    res.json({
      message: 'Contest updated successfully',
      contest: updatedContest,
    })
  } catch (error) {
    console.error('Error updating contest:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// Delete a contest (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const { id } = req.params

    await prisma.contest.delete({ where: { id: parseInt(id) } })

    res.json({ message: 'Contest deleted successfully' })
  } catch (error) {
    console.error('Error deleting contest:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
export default router
