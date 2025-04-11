import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// 🔥 Host Dashboard: Fetch site and students for a host
// IMPORTANT: Place this BEFORE any /:id or dynamic routes to avoid conflicts
router.get('/:id/host', authenticateToken, async (req, res) => {
  const hostId = parseInt(req.params.id)

  try {
    const site = await prisma.site.findFirst({
      where: {
        hosts: {
          some: { id: hostId },
        },
      },
      include: {
        students: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!site) {
      return res.status(404).json({ message: 'Site not found for this host.' })
    }

    const formattedStudents = site.students.map((student) => ({
      firstName: student.user.firstName,
      lastName: student.user.lastName,
      email: student.user.email,
      grade: student.grade,
    }))

    res.json({
      site: {
        name: site.name,
        city: site.city,
        state: site.state,
        capacity: site.capacity,
      },
      students: formattedStudents,
    })
  } catch (error) {
    console.error('❌ Error in host-dashboard route:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// ✅ Get current authenticated user profile
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleId: true,
        role: { select: { name: true } },
        student: {
          select: {
            countryOfIOL: true,
            state: true,
            city: true,
            school: true,
            grade: true,
            birthdate: true,
            languages: true,
          },
        },
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('❌ Error fetching user:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// ✅ Admin Only: Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Access Denied' })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        roleId: true,
        role: { select: { name: true } },
        student: {
          select: {
            city: true,
            state: true,
            zip: true,
            countryOfIOL: true,
            birthdate: true,
            grade: true,
            languages: true,
            school: true,
          },
        },
      },
    })

    res.json(users)
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router
