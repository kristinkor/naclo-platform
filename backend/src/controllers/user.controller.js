import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Optional utility for better error logging
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    console.error('❌ Error fetching users:', error)
    res.status(500).json({ message: 'Failed to fetch users.' })
  }
}

export const updateStudentProfile = async (req, res) => {
  const userId = req.user.id
  const {
    firstName,
    lastName,
    birthdate,
    city,
    state,
    countryOfIOL,
    school,
    grade,
    languages,
    siteId,
  } = req.body

  try {
    // 🔹 Update basic User info
    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
      },
    })

    // 🔹 Update extended Student profile
    await prisma.student.update({
      where: { userId },
      data: {
        birthdate: birthdate ? new Date(birthdate) : undefined,
        city,
        state,
        countryOfIOL,
        school,
        grade: grade ? Number(grade) : undefined,
        languages: languages?.join(',') || '',
        siteId: siteId ? Number(siteId) : null,
      },
    })

    res.json({ message: '✅ Profile updated successfully.' })
  } catch (error) {
    console.error('❌ Error updating student profile:', error)
    res.status(500).json({ message: 'Failed to update profile.' })
  }
}
