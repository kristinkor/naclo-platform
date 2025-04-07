import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get all sites with pagination
export const getAllSites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page - 1) * limit

    const [sites, total] = await Promise.all([
      prisma.site.findMany({
        skip: offset,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.site.count(),
    ])

    res.json({
      total,
      pages: Math.ceil(total / limit),
      data: sites,
    })
  } catch (error) {
    console.error('Error fetching sites:', error.message)
    res
      .status(500)
      .json({ error: 'Failed to fetch sites', message: error.message })
  }
}

// Get a specific site by ID
export const getSiteById = async (req, res) => {
  const { id } = req.params
  const siteId = parseInt(id)

  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    })

    if (!site) {
      return res.status(404).json({ error: 'Site not found' })
    }

    res.json(site)
  } catch (error) {
    console.error('Error fetching site:', error.message)
    res
      .status(500)
      .json({ error: 'Failed to fetch site', message: error.message })
  }
}

// Create a new site (Admin only)
export const createSite = async (req, res) => {
  try {
    const {
      name,
      type,
      country,
      city,
      state,
      zip,
      address,
      capacity,
      timezone,
      website,
      openness,
      eligibility,
      hostIds,
    } = req.body

    if (!hostIds || !Array.isArray(hostIds) || hostIds.length === 0) {
      return res
        .status(400)
        .json({ message: 'At least one host must be specified' })
    }

    // Rule: universities can be only OPEN_TO_ALL
    if (type === 'UNIVERSITY' && eligibility !== 'OPEN_TO_ALL') {
      return res.status(400).json({
        message: 'University sites must have eligibility set to OPEN_TO_ALL',
      })
    }

    const site = await prisma.site.create({
      data: {
        name,
        type,
        country,
        city,
        state,
        zip,
        address,
        capacity,
        timezone,
        website,
        openness,
        eligibility,
        hosts: {
          connect: hostIds.map((id) => ({ id })),
        },
      },
      include: {
        hosts: true,
        students: true,
      },
    })

    res.status(201).json({ message: 'Site created successfully', site })
  } catch (error) {
    console.error('Error creating site:', error.message)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

// Update a site (Admin or Site Host)
export const updateSite = async (req, res) => {
  const { id } = req.params
  const user = req.user
  const siteId = parseInt(id)

  try {
    const existingSite = await prisma.site.findUnique({ where: { id: siteId } })

    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' })
    }

    const { name, type, country, city, state, zip, capacity, timezone } =
      req.body

    if (user.roleId === 1) {
      // Admin: full access
      const updatedSite = await prisma.site.update({
        where: { id: siteId },
        data: { name, type, country, city, state, zip, capacity, timezone },
      })
      return res.json({ message: 'Site updated successfully', updatedSite })
    }

    if (user.roleId === 4) {
      // Site Host: only their own site
      if (user.siteId !== siteId) {
        return res.status(403).json({ message: 'Access denied: not your site' })
      }

      const updatedSite = await prisma.site.update({
        where: { id: siteId },
        data: { name, capacity, timezone }, // Limited fields
      })
      return res.json({ message: 'Site updated successfully', updatedSite })
    }

    return res.status(403).json({ message: 'Access denied' })
  } catch (error) {
    console.error('Error updating site:', error.message)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}

// Delete a site (Admin only)
export const deleteSite = async (req, res) => {
  const { id } = req.params
  const siteId = parseInt(id)

  try {
    const existingSite = await prisma.site.findUnique({ where: { id: siteId } })
    if (!existingSite) {
      return res.status(404).json({ message: 'Site not found' })
    }

    await prisma.site.delete({ where: { id: siteId } })
    res.json({ message: 'Site deleted successfully' })
  } catch (error) {
    console.error('Error deleting site:', error.message)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
