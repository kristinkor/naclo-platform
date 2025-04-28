// src/pages/university-sites.tsx

import { Container, Typography, Link, Alert } from '@mui/material'

export default function UniversitySitesPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        University Contest Sites
      </Typography>

      <Typography sx={{ fontSize: 18, mt: 2, mb: 2 }}>
        University sites are{' '}
        <b>open to all students until capacity is reached</b>. Register early to
        secure your spot!
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        For site-specific instructions, please contact the university hosts
        directly. <br />
        If you need help, email{' '}
        <Link href="mailto:nacloinquiries@googlegroups.com" underline="always">
          nacloinquiries@googlegroups.com
        </Link>
        .
      </Alert>

      <Alert severity="warning" sx={{ mb: 2 }}>
        <b>*</b> Sites marked with an asterisk are either not yet confirmed,
        full, or not accepting contestants this year.
      </Alert>

      <Typography sx={{ fontSize: 15, color: 'text.secondary', mb: 6 }}>
        If you need assistance with a closed site, please contact us at{' '}
        <Link href="mailto:nacloinquiries@googlegroups.com" underline="always">
          nacloinquiries@googlegroups.com
        </Link>
        .
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ mt: 8 }}
      >
        The list of university contest sites will appear here soon.
      </Typography>
    </Container>
  )
}
