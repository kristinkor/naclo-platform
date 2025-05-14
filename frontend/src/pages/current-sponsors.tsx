// src/pages/current-sponsors.tsx
import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Link,
} from '@mui/material'

const sponsors = [
  {
    name: 'Linguistic Society of America',
    url: 'http://www.linguisticsociety.org/',
    logo: './images/sponsor_logos/LSA.png',
  },
  {
    name: 'The North American Chapter of the Association for Computational Linguistics',
    url: 'http://www.aclweb.org/',
    logo: './images/sponsor_logos/acl.png',
  },
  {
    name: 'The National Science Foundation',
    url: 'http://nsf.gov',
    logo: '/images/sponsor_logos/nsf.png',
  },
  {
    name: 'Carnegie Mellon University',
    url: 'http://www.cmu.edu',
    logo: '/images/sponsor_logos/cmu.gif',
  },
  {
    name: 'Yale University',
    url: 'https://www.yale.edu/',
    logo: '/images/sponsor_logos/yaleblue.png',
  },
]

const CurrentSponsorsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Current Sponsors of NACLO
      </Typography>

      <Typography variant="body1" paragraph>
        Here are those organizations that have been kind enough to sponsor
        NACLO. If your organization would like to sponsor, please read our{' '}
        <Link href="/donate" color="primary">
          information on donation
        </Link>
        .
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        We would like to thank the NACLO sponsors:
      </Typography>

      <Grid container spacing={4}>
        {sponsors.map((sponsor, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardActionArea href={sponsor.url} target="_blank" rel="noopener">
                <CardMedia
                  component="img"
                  image={sponsor.logo}
                  alt={sponsor.name}
                  sx={{ objectFit: 'contain', maxHeight: 160, p: 2 }}
                />
                <CardContent>
                  <Typography variant="body2" align="center">
                    {sponsor.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default CurrentSponsorsPage
