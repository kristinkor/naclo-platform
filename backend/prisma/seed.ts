// prisma/seed.ts
import {
  PrismaClient,
  UserRole,
  Timezone,
  InstitutionType,
  EligibilityType,
  OpennessType,
} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding roles...')

  // 🔹 Create roles using enum name, no manual ID needed
  for (const roleName of Object.values(UserRole)) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName },
    })
  }

  console.log('🌱 Seeding sites...')
  const sites = [
    {
      name: 'Brandeis University',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ENROLLED_ONLY,
      address: '415 South St, Waltham, MA',
      country: 'US',
      city: 'Waltham',
      state: 'MA',
      zip: '02453',
      capacity: 100,
      timezone: Timezone.EST,
      openness: OpennessType.OPEN,
      website: 'http://boston-olympiad.org',
    },
    {
      name: 'Brigham Young University',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: 'Provo, UT Campus',
      country: 'US',
      city: 'Provo',
      state: 'UT',
      zip: '84602',
      capacity: 80,
      timezone: Timezone.MST,
      openness: OpennessType.OPEN,
      website: 'http://linguistics.byu.edu/naclo',
    },
    {
      name: 'Carnegie Mellon University',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ENROLLED_ONLY,
      address: '5000 Forbes Ave, Pittsburgh, PA',
      country: 'US',
      city: 'Pittsburgh',
      state: 'PA',
      zip: '15213',
      capacity: 120,
      timezone: Timezone.EST,
      openness: OpennessType.OPEN,
      website: 'https://www.lti.cs.cmu.edu/naclo-cmu',
    },
  ]

  for (const site of sites) {
    await prisma.site.upsert({
      where: { name: site.name },
      update: {},
      create: site,
    })
  }

  console.log('✅ Seed complete.')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    prisma.$disconnect()
    process.exit(1)
  })
