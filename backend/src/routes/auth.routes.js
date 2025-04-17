import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.controller.js'
import {
  requestPasswordReset,
  confirmPasswordReset,
  resendConfirmationEmail,
} from '../controllers/auth.controller.js'
import { confirmEmail } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/forgot-password', requestPasswordReset) // Request password reset
router.post('/reset-confirm', confirmPasswordReset) // Confirm new password
router.get('/confirm', confirmEmail)
router.post('/resend-confirmation', resendConfirmationEmail)

export default router
