import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// Middleware to verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  if (!authHeader)
    return res.status(401).json({ message: 'Access Denied: No token provided' })

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.substring(7)
    : authHeader

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' })
    }
    res.status(401).json({ message: 'Invalid Token' })
  }
}
