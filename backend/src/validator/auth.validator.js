// validators/auth.validator.js
import { body, validationResult } from 'express-validator'

export const registerValidator = [
  // Basic validation rules
  body('firstName').trim().notEmpty().withMessage('First name is required'),

  body('lastName').trim().notEmpty().withMessage('Last name is required'),

  body('email').isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match')
    }
    return true
  }),

  body('state').notEmpty().withMessage('State is required'),

  body('countryOfIOL').notEmpty().withMessage('Country is required'),

  body('grade').isInt().withMessage('Grade must be a number'),

  // Validate function to check results
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array(),
      })
    }
    next()
  },
]
