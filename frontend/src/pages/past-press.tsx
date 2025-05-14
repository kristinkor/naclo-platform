// src/pages/past-press.tsx
import React from 'react'
import { Container, Typography, Link, Box, List, ListItem } from '@mui/material'

const pressData = [
  {
    year: 2019,
    releases: [
      {
        date: 'August 12, 2019',
        title:
          'Excellent performance by the US and Canadian teams at the IOL in South Korea',
        url: 'https://naclo.org/2019/NACLO2019PRESSRELEASE_IOL.pdf',
      },
      {
        date: 'April 5, 2019',
        title: 'The official press release for the 2019 contest',
        url: 'https://naclo.org/2019/NACLO2019PRESSRELEASE.pdf',
      },
    ],
  },
  {
    year: 2018,
    releases: [
      {
        date: 'August 7, 2018',
        title: 'Teams selected by NACLO for the 2018 IOL in Prague',
        url: 'http://tangra.cs.yale.edu/nacloweb/2018/NACLO2018PRESSRELEASE_IOL.pdf',
      },
      {
        date: 'June 16, 2018',
        title: '2018 Invitational Round Press Release',
        url: 'http://tangra.cs.yale.edu/nacloweb/2018/NACLO2018PRESSRELEASE.pdf',
      },
    ],
  },
  {
    year: 2017,
    releases: [
      {
        date: 'Feb 20, 2018',
        title: "Article on hosting NACLO at St. Mark's School",
        url: 'https://smleo.com/2018/02/20/hosting-the-naclo-national-linguistics-competition/',
      },
      {
        date: 'July 7, 2017',
        title: '2017 IOL Press Release',
        url: 'http://www.cs.yale.edu/~radev/naclo/NACLO-PRESSRELEASE-2017-IOL1.pdf',
      },
      {
        date: 'April 11, 2017',
        title: '2017 Invitational Round Press Release',
        url: 'https://naclo.org/NACLOPRESSRELEASE-2017Invitational.pdf',
      },
    ],
  },
]

const PastPressPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Past Press Releases
      </Typography>
      {pressData.map((yearBlock) => (
        <Box key={yearBlock.year} sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {yearBlock.year} Press Releases
          </Typography>
          <List>
            {yearBlock.releases.map((release, idx) => (
              <ListItem
                key={idx}
                disableGutters
                sx={{ display: 'list-item', pl: 2 }}
              >
                <Typography variant="body1">
                  <strong>{release.date}</strong>{' '}
                  <Link href={release.url} target="_blank" rel="noopener">
                    {release.title}
                  </Link>
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Container>
  )
}

export default PastPressPage
