import express from 'express'
import {
  createProblem,
  editProblem,
  deleteProblem,
  getProblemsForContest,
} from '../controllers/problem.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import { authorizeRoles } from '../middlewares/role.middleware.js'

const router = express.Router()

router.post('/', authenticateToken, authorizeRoles([1]), createProblem)
router.put('/:id', authenticateToken, authorizeRoles([1]), editProblem)
router.delete('/:id', authenticateToken, authorizeRoles([1]), deleteProblem)
router.get('/contest/:contestId', authenticateToken, getProblemsForContest)

export default router
