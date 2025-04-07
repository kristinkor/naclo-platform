import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createProblem = async (req, res) => {
  try {
    const { year, name, author, file, status } = req.body

    const problem = await prisma.problem.create({
      data: { year, name, author, file, status: status || 'active' },
    })

    res.status(201).json({ message: 'Problem created successfully', problem })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export const editProblem = async (req, res) => {
  try {
    const { id } = req.params
    const { year, name, author, file, status } = req.body

    const problem = await prisma.problem.findUnique({
      where: { id: parseInt(id) },
    })
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' })
    }

    const updatedProblem = await prisma.problem.update({
      where: { id: parseInt(id) },
      data: { year, name, author, file, status },
    })

    res.status(200).json({
      message: 'Problem updated successfully',
      problem: updatedProblem,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProblem = async (req, res) => {
  try {
    const { id } = req.params

    const problem = await prisma.problem.findUnique({
      where: { id: parseInt(id) },
    })
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' })
    }

    await prisma.problem.delete({ where: { id: parseInt(id) } })

    res.status(200).json({ message: 'Problem deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getProblemsForContest = async (req, res) => {
  try {
    const { contestId } = req.params

    const problems = await prisma.problem.findMany({
      where: { year: parseInt(contestId) },
      orderBy: { name: 'asc' },
    })

    res.status(200).json(problems)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
