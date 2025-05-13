// pages/related-events.tsx

import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Typography,
  Box,
  Link,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const relatedEvents = [
  {
    category: 'Mathematics & Informatics',
    events: [
      { name: 'MATHCOUNTS', url: 'http://www.mathcounts.org/' },
      { name: 'USA Computing Olympiad', url: 'http://www.uwp.edu/sws/usaco' },
      {
        name: 'International Olympiad in Informatics',
        url: 'http://www.ioinformatics.org/index.shtml',
      },
      {
        name: 'International Mathematics Olympiad',
        url: 'http://www.imo-official.org/',
      },
    ],
  },
  {
    category: 'Natural Sciences',
    events: [
      {
        name: 'International Physics Olympiad',
        url: 'https://www.jyu.fi/ipho/',
      },
      {
        name: 'International Chemistry Olympiad',
        url: 'http://icho2015.msu.az',
      },
      {
        name: 'International Biology Olympiad',
        url: 'http://www.ibo-info.org/',
      },
      {
        name: 'International Olympiad in Astronomy and Astrophysics',
        url: 'http://ioaa2015.org/',
      },
    ],
  },
  {
    category: 'Linguistics & Humanities',
    events: [
      { name: 'FIRE', url: 'http://www.education.rec.ri.cmu.edu/fire/naclo/' },
      { name: 'MIT INSPIRE', url: 'http://getinspired.mit.edu' },
      {
        name: 'High School Computational Linguistics Challenge',
        url: 'http://hsc.lc/',
      },
    ],
  },
]

export default function RelatedEvents() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom>
        Related Events
      </Typography>
      {relatedEvents.map((section, index) => (
        <Accordion key={index} defaultExpanded={index === 0} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Typography variant="h6">{section.category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ pl: 2, mb: 0 }}>
              {section.events.map((event, idx) => (
                <li key={idx}>
                  <Link
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  )
}
