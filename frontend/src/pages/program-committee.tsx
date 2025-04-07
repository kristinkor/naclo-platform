import React from 'react'
import committeeData from './data/committee.json' // Import the JSON file
import { Typography, Card, CardContent, Grid, Container } from '@mui/material'

interface CommitteeMember {
  name: string
  affiliation: string
}

// Explicitly cast the imported JSON data to an array of CommitteeMember
const committee = committeeData as CommitteeMember[]

export default function ProgramCommitteePage() {
  return (
    <Container
      sx={{
        padding: '2rem',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          padding: '4rem 0',
          textAlign: 'center',
          color: '#ff9a04', // Apply the same orange color as your earlier design
        }}
      >
        Program Committee
      </Typography>

      <Grid container spacing={4}>
        {committee.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: 3, // Add shadow for better visibility
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    color: '#2a2a2a', // Dark color for text
                  }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ marginTop: '0.5rem' }}
                >
                  {member.affiliation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
