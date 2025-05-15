// src/controllers/auth.controller.ts
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import crypto from 'crypto'
import { Resend } from 'resend'

dotenv.config()
const prisma = new PrismaClient()

// 🔹 Register User (with optional Student profile)
export const registerUser = async (req, res) => {
  console.log('📦 Incoming registration data:', req.body)

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      roleId = 3, // Default = student
      birthdate,
      grade,
      countryOfIOL,
      city,
      state,
      school,
      languages,
      siteId,
    } = req.body

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Missing required fields.' })
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return res.status(400).json({
        message:
          'This email is already registered. Please use "Forgot Password" if needed.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        roleId: Number(roleId),
        emailConfirmed: false,
      },
    })

    // Optional: create student profile if student
    if (Number(roleId) === 3) {
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
          city,
          birthdate: new Date(birthdate),
          grade: Number(grade),
          school,
          siteId: siteId ? Number(siteId) : null,
          languages: languages?.join(',') || '',
        },
      })
    }

    // Confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY)
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5001'
    const confirmationUrl = `${baseUrl.replace(/\/+$|\/$/, '')}/api/auth/confirm?token=${token}`

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Confirm your NACLO account',
      html: `
        <p>Hello ${firstName},</p>
        <p>Please confirm your email address:</p>
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

export const resendConfirmationEmail = async (req, res) => {
  try {
    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found.' })
    if (user.emailConfirmed)
      return res.status(400).json({ message: 'Email already confirmed.' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
    const confirmUrl = `${process.env.BACKEND_URL.replace(/\/+$|\/$/, '')}/api/auth/confirm?token=${token}`
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Resend confirmation',
      html: `<p>Click <a href="${confirmUrl}">here</a> to confirm your account.</p>`,
    })
    res.json({ message: 'Confirmation email resent.' })
  } catch (error) {
    console.error('❌ Resend confirmation error:', error)
    res.status(500).json({ message: 'Error while resending confirmation.' })
  }
}

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.query
    if (!token) return res.status(400).send('<h2>❌ Missing token.</h2>')

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(400).send('<h2>❌ Invalid or expired token.</h2>')
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user) return res.status(404).send('<h2>❌ User not found.</h2>')
    if (user.emailConfirmed) return res.send('<h2>✅ Already confirmed.</h2>')

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailConfirmed: true },
    })
    res.send('<h2>✅ Email confirmed! You can now log in.</h2>')
  } catch (error) {
    console.error('❌ Email confirmation error:', error)
    res.status(500).send('<h2>❌ Server error.</h2>')
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password.' })
    }
    if (!user.emailConfirmed) {
      return res.status(403).json({ message: 'Email not confirmed.' })
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
    res.status(500).json({ message: 'Login failed.' })
  }
}

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return res.status(404).json({ message: 'User not found.' })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetExpires = new Date(Date.now() + 3600000)

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetExpires },
    })

    const resetUrl = `${process.env.FRONTEND_URL.replace(/\/+$|\/$/, '')}/reset-password?token=${resetToken}`
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset your NACLO password',
      html: `
        <p>We received a request to reset your password.</p>
        <p><a href="${resetUrl}">Click here to reset your password</a></p>
        <p>This link expires in 1 hour.</p>
      `,
    })

    res.json({ message: 'Reset link sent.' })
  } catch (error) {
    console.error('❌ Reset error:', error)
    res.status(500).json({ message: 'Failed to send reset link.' })
  }
}

export const confirmPasswordReset = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetExpires: { gte: new Date() },
      },
    })

    if (!user)
      return res.status(400).json({ message: 'Invalid or expired token.' })

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetExpires: null,
      },
    })

    res.json({ message: 'Password reset successful.' })
  } catch (error) {
    console.error('❌ Confirm reset error:', error)
    res.status(500).json({ message: 'Error resetting password.' })
  }
}
