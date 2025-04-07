import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import crypto from 'crypto'
import { Resend } from 'resend'
dotenv.config()
const prisma = new PrismaClient()

// 🔹 Register New User
export const registerUser = async (req, res) => {
  console.log('📦 Incoming registration data:', req.body)

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      roleId, // 3 = student
      birthdate,
      grade,
      countryOfIOL,
      state,
      school,
      languages,
      siteId,
    } = req.body

    // 🔐 Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Missing required fields.' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({ message: 'Email is already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Create base user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: Number(roleId) || 3,
        emailConfirmed: false,
      },
    })

    // ✅ Create student profile if role is STUDENT
    if ((roleId ?? 3) === 3) {
      if (!birthdate || !grade || !countryOfIOL || !state) {
        return res
          .status(400)
          .json({ message: 'Missing required student fields.' })
      }

      await prisma.student.create({
        data: {
          userId: user.id,
          state,
          countryOfIOL,
          birthdate: new Date(birthdate),
          grade: Number(grade),
          school,
          siteId: siteId ? Number(siteId) : null, // ✅ optional if null
          languages: languages?.join(',') || '',
        },
      })
    }
    const resend = new Resend(process.env.RESEND_API_KEY)

    // 🧪 Generate email confirmation token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    const confirmationUrl = `https://naclo-platform.onrender.com/api/auth/confirm?token=${token}`

    // 📬 Send confirmation email
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Confirm your NACLO account',
      html: `
    <p>Hello ${firstName},</p>
    <p>Thank you for registering. Please confirm your email address:</p>
    <a href="${confirmationUrl}">Click here to confirm</a>
    <p>This link will expire in 24 hours.</p>
  `,
    })
    console.log('📧 Email sent')

    return res.status(201).json({
      message: 'Registration successful. Please confirm your email to log in.',
    })
  } catch (error) {
    console.error('❌ Registration error:', error)
    return res
      .status(500)
      .json({ message: 'Server error during registration.' })
  }
}
export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.query
    if (!token) {
      return res.status(400).send(`<h2>❌ Missing confirmation token.</h2>`)
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      console.error('❌ Invalid or expired token:', error.message)
      return res
        .status(400)
        .send(`<h2>❌ Invalid or expired confirmation link.</h2>`)
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })

    if (!user) {
      return res.status(404).send(`<h2>❌ User not found.</h2>`)
    }

    if (user.emailConfirmed) {
      return res
        .status(200)
        .send(`<h2>✅ Email already confirmed. You can log in.</h2>`)
    }

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailConfirmed: true },
    })

    res.send(`<h2>✅ Your email has been confirmed! You may now log in.</h2>`)
  } catch (error) {
    console.error('Unexpected error:', error)
    res.status(500).send(`<h2>❌ Server error during email confirmation.</h2>`)
  }
}

// 🔹 Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    // ✅ Email must be confirmed
    if (!user.emailConfirmed) {
      return res
        .status(403)
        .json({ message: 'Please confirm your email before logging in.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, roleId: user.roleId },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found' })

    // Generate secure token & expiration (1 hour)
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 3600000) // 1 hour from now

    // Save token in database
    await prisma.user.update({
      where: { email },
      data: { resetToken, resetExpires },
    })

    // (TODO: Send Email) - For now, return token as a response
    res.json({ message: 'Reset link sent', resetToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const confirmPasswordReset = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    // Find user with the token
    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetExpires: { gte: new Date() } },
    })

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token' })

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password & clear reset token
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetToken: null, resetExpires: null },
    })

    res.json({ message: 'Password reset successful' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
