import { Typography, Container, Box } from '@mui/material'
import Head from 'next/head'

export default function HighSchoolSitesPage() {
  return (
    <>
      <Head>
        <title>High School Sites | NACLO</title>
      </Head>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            Current High School Sites
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            High school sites host only their own students unless{' '}
            <strong>&quot;open to all students&quot;</strong> is specified.
          </Typography>
        </Box>
      </Container>
    </>
  )
}
