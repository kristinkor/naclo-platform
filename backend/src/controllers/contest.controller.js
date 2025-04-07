import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createContest = async (req, res) => {
  try {
    const { name, year, round, status } = req.body
    const contest = await prisma.contest.create({
      data: { name, year, round, status: status || 'initialized' },
    })
    res.status(201).json({ message: 'Contest created successfully', contest })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const editContest = async (req, res) => {
  try {
    const { id } = req.params
    const { name, year, round, status } = req.body

    // Check if contest exists
    const contest = await prisma.contest.findUnique({
      where: { id: parseInt(id) },
    })
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' })
    }

    // Update contest
    const updatedContest = await prisma.contest.update({
      where: { id: parseInt(id) },
      data: { name, year, round, status },
    })

    res.status(200).json({
      message: 'Contest updated successfully',
      contest: updatedContest,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteContest = async (req, res) => {
  try {
    const { id } = req.params

    // Check if contest exists
    const contest = await prisma.contest.findUnique({
      where: { id: parseInt(id) },
    })
    if (!contest) {
      return res.status(404).json({ message: 'Contest not found' })
    }

    // Delete contest
    await prisma.contest.delete({ where: { id: parseInt(id) } })

    res.status(200).json({ message: 'Contest deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllContests = async (req, res) => {
  try {
    const contests = await prisma.contest.findMany({
      orderBy: { createdAt: 'desc' },
    })

    res.status(200).json(contests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
