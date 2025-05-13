import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
  Box,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import competitionsData from './data/competitions.json'

const CompetitionsAccordion = () => {
  return (
    <Box sx={{ maxWidth: '1000px', margin: '0 auto', padding: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        textAlign="center"
        sx={{ mt: 5, mb: 3 }}
      >
        NACLO Competitions
      </Typography>
      {competitionsData.map((competition) => (
        <Accordion key={competition.year} sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${competition.year}-content`}
            id={`panel-${competition.year}-header`}
          >
            <Typography variant="h6">NACLO {competition.year}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box component="ul" sx={{ pl: 2 }}>
              {competition.updates.map((update, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    <strong>{update.date}:</strong>{' '}
                    {update.text.replace(/'/g, '&apos;')}
                  </Typography>
                </li>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Please Donate
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          You can help support NACLO by making a donation. For more information,
          please visit our{' '}
          <Link
            href="https://www.cmu.edu/engage/give/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            donations page
          </Link>
          .
        </Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Contact
        </Typography>
        <Typography variant="body1">
          We&apos;re looking for new sites and problem contributors. Please
          contact us at{' '}
          <Link href="mailto:naclo22org@googlegroups.com">
            naclo22org@googlegroups.com
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  )
}

export default CompetitionsAccordion
