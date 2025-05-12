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
      latitude: 42.3655,
      longitude: -71.2586,
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
      latitude: 40.2518,
      longitude: -111.6493,
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
      latitude: 40.4444,
      longitude: -79.9436,
    },
    {
      name: 'Georgetown University',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: '37th and O Streets NW, Washington, DC 20057',
      country: 'US',
      city: 'Washington',
      state: 'DC',
      zip: '20057',
      capacity: 75,
      timezone: Timezone.EST,
      openness: OpennessType.OPEN,
      website: 'http://linguistics.georgetown.edu/naclo',
      latitude: 38.9076,
      longitude: -77.0723,
    },
    {
      name: 'University of Illinois Urbana-Champaign',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: '1407 W. Gregory Dr., Urbana, IL 61801',
      country: 'US',
      city: 'Urbana',
      state: 'IL',
      zip: '61801',
      capacity: 150,
      timezone: Timezone.CST,
      openness: OpennessType.OPEN,
      website: 'https://linguistics.illinois.edu/resources/naclo',
      latitude: 40.104,
      longitude: -88.2272,
    },
    {
      name: 'University of Maryland',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: 'College Park, MD 20742',
      country: 'US',
      city: 'College Park',
      state: 'MD',
      zip: '20742',
      capacity: 130,
      timezone: Timezone.EST,
      openness: OpennessType.OPEN,
      website: 'https://linguistics.umd.edu/naclo',
      latitude: 38.9869,
      longitude: -76.9426,
    },
    {
      name: 'University of Michigan',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: '500 S State St, Ann Arbor, MI 48109',
      country: 'US',
      city: 'Ann Arbor',
      state: 'MI',
      zip: '48109',
      capacity: 140,
      timezone: Timezone.EST,
      openness: OpennessType.OPEN,
      website: 'https://lsa.umich.edu/linguistics/naclo',
      latitude: 42.278,
      longitude: -83.7382,
    },
    {
      name: 'University of North Texas',
      type: InstitutionType.UNIVERSITY,
      eligibility: EligibilityType.ALL_STUDENTS,
      address: '1155 Union Cir, Denton, TX 76203',
      country: 'US',
      city: 'Denton',
      state: 'TX',
      zip: '76203',
      capacity: 90,
      timezone: Timezone.CST,
      openness: OpennessType.OPEN,
      website: 'https://naclo.unt.edu',
      latitude: 33.2106,
      longitude: -97.1503,
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
