import { Container, Typography, Box } from '@mui/material'
import Head from 'next/head'
import Announcements from '../components/Announcements'

export default function UpcomingCompetitionPage() {
  return (
    <>
      <Head>
        <title>Upcoming Competition 2025 | NACLO</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Upcoming Competition 2025
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            The NACLO 2025 competition is coming soon! Details about dates,
            registration deadlines, and competition locations will be announced
            on this page.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Please check back regularly or sign up for our newsletter to stay
            updated.
          </Typography>
        </Box>
        <Announcements />
      </Container>
    </>
  )
}
