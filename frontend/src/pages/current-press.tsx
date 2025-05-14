// src/pages/press.tsx
import { Container, Typography, Link, Box, List, ListItem } from '@mui/material'

const pressData = [
  {
    year: 2024,
    releases: [
      {
        date: 'August 15, 2024',
        title:
          'Press Release about the performance of the NACLO teams at the 2024 IOL',
        file: '2024-NACLO-post-IOL-Press-Release.pdf',
      },
    ],
  },
  {
    year: 2023,
    releases: [
      {
        date: 'August 17, 2023',
        title:
          'Press Release about the performance of the NACLO teams at the 2023 IOL',
        file: '2023NACLOIOLPressRelease.pdf',
      },
    ],
  },
  {
    year: 2022,
    releases: [
      {
        date: 'August 13, 2022',
        title:
          'Press Release about the performance of the NACLO teams at the 2022 IOL',
        file: 'NACLO2022PRESSRELEASE-IOL.pdf',
      },
    ],
  },
  {
    year: 2021,
    releases: [
      {
        date: 'August 31, 2021',
        title:
          'Press Release about the performance of the NACLO teams at the 2021 IOL',
        file: 'NACLO2021PRESSRELEASE-IOL.pdf',
      },
      {
        date: 'July 19, 2021',
        title: 'Press Release for the NACLO 2021 contest',
        file: 'NACLO2021PRESSRELEASE.pdf',
      },
    ],
  },
  {
    year: 2020,
    releases: [
      {
        date: 'October 1, 2020',
        title: 'NACLO 2020 Press Release',
        file: 'NACLO2020PRESSRELEASE.pdf',
      },
    ],
  },
]

export default function PressPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Press Releases
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
                  <Link
                    href={`https://naclo.org/${yearBlock.year}/${release.file}`}
                    target="_blank"
                    rel="noopener"
                  >
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
