// backend/src/app.js

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

// Load environment variables
dotenv.config()

// Initialize Express and Prisma
const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(
  cors({
    origin: 'https://naclo-platform.onrender.com',
    credentials: true,
  })
)
app.use(express.json())

// Simple health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// JWT helper (can be moved to separate file if needed)
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// Routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import contestRoutes from './routes/contest.routes.js'
import problemRoutes from './routes/problem.routes.js'
import announcementRoutes from './routes/announcement.routes.js'
import siteRoutes from './routes/site.routes.js'

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/contests', contestRoutes)
app.use('/api/sites', siteRoutes)
app.use('/api/problems', problemRoutes)
app.use('/api/announcements', announcementRoutes)

// Start the server with Prisma DB connection check
const startServer = async () => {
  try {
    await prisma.$connect()
    console.log('✅ Connected to the database')

    const PORT = process.env.PORT || 5001
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect to database:', error.message)
    process.exit(1)
  }
}

startServer()
