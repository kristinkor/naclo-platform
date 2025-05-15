import express from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { PrismaClient } from '@prisma/client'
import { updateStudentProfile } from '../controllers/user.controller.js'

const router = express.Router()
const prisma = new PrismaClient()

// ✅ Update current user's student profile
router.put('/me', authenticateToken, updateStudentProfile)

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

// ✅ Webmaster: Get all users
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

// ✅ Webmaster: Update any user
router.put('/:id', authenticateToken, async (req, res) => {
  const userId = parseInt(req.params.id)
  const { firstName, lastName, email, roleId, student } = req.body

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, email, roleId },
    })

    if (student) {
      await prisma.student.upsert({
        where: { userId },
        update: {
          city: student.city,
          state: student.state,
          countryOfIOL: student.countryOfIOL,
          birthdate: student.birthdate
            ? new Date(student.birthdate)
            : undefined,
          school: student.school,
          grade: student.grade ? parseInt(student.grade) : undefined,
          languages: Array.isArray(student.languages)
            ? student.languages.join(',')
            : student.languages || '',
          siteId: student.siteId ? parseInt(student.siteId) : null,
        },
        create: {
          userId,
          city: student.city || '',
          state: student.state || '',
          countryOfIOL: student.countryOfIOL || '',
          birthdate: student.birthdate
            ? new Date(student.birthdate)
            : new Date(),
          school: student.school || '',
          grade: student.grade ? parseInt(student.grade) : 0,
          languages: Array.isArray(student.languages)
            ? student.languages.join(',')
            : student.languages || '',
          siteId: student.siteId ? parseInt(student.siteId) : null,
        },
      })
    }

    res.json({ message: 'User updated successfully' })
  } catch (error) {
    console.error('❌ Update user error:', error)
    res.status(500).json({ message: 'Failed to update user' })
  }
})

// ✅ Webmaster: Delete user by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id)
  console.log('📥 Received DELETE /users/:id with ID =', id)

  try {
    if (req.user.roleId !== 1) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    // 🔍 Check and delete related Student record first
    const existingStudent = await prisma.student.findUnique({
      where: { userId: id },
    })

    if (existingStudent) {
      await prisma.student.delete({ where: { userId: id } })
    }

    // 🔥 Now delete the user
    await prisma.user.delete({ where: { id } })

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting user:', error)
    res.status(500).json({ message: 'Failed to delete user' })
  }
})

// ✅ Host Dashboard (keep at the end!)
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

export default router
