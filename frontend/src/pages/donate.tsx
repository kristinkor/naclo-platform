import React from 'react'
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import { Star, CheckCircle, AttachMoney, Favorite } from '@mui/icons-material'

export default function SupportNACLOPage() {
  return (
    <Container sx={{ padding: '3rem', maxWidth: '900px' }}>
      {/* Title Section */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          background: 'linear-gradient(45deg, #ff9a04, #ff4e00)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        How to Support NACLO
      </Typography>

      {/* Giving Online Section */}
      <Card sx={{ mb: 4, p: 2, borderLeft: '6px solid #ff9a04' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            Giving Online
          </Typography>
          <Typography variant="body1">
            Please follow this link to{' '}
            <a
              href="https://www.cmu.edu/engage/give/index.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff9a04', fontWeight: 'bold' }}
            >
              NACLO&rsquo;s giving page
            </a>{' '}
            at Carnegie Mellon University, which is connected to the NACLO
            account.
          </Typography>

          <Button
            variant="contained"
            color="warning"
            sx={{ mt: 2 }}
            href="https://www.cmu.edu/engage/give/index.html"
            target="_blank"
          >
            Donate Now
          </Button>
        </CardContent>
      </Card>

      {/* What Donations Support Section */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        What Your Donations Help Support
      </Typography>

      <Card sx={{ mb: 4, p: 2, backgroundColor: '#fffbe6' }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          >
            <AttachMoney sx={{ color: '#ff9a04', mr: 1 }} /> Small Expenses:
          </Typography>
          <List>
            {[
              'Copying handouts and flyers for training sessions at high schools.',
              'Transportation from local universities to training sessions at high schools.',
              'Rental of conference facilities for the contest in some cities.',
              'Snacks during the contest for students, teachers, and accompanying parents.',
              'Scanning and mailing answers for grading.',
            ].map((item, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <CheckCircle sx={{ color: '#ff9a04', mr: 1 }} />
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, p: 2, backgroundColor: '#fff3e0' }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          >
            <AttachMoney sx={{ color: '#ff6f00', mr: 1 }} /> Large Expenses:
          </Typography>
          <List>
            {[
              'Travel to the international contest - $30,000 per year for two teams.',
              'Summer training program for the international team - $2,000.',
              'Annual NACLO planning meeting - $15,000.',
            ].map((item, index) => (
              <ListItem key={index} sx={{ pl: 0 }}>
                <Star sx={{ color: '#ff6f00', mr: 1 }} />
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* NACLO Information Section */}
      <Card sx={{ mb: 4, p: 2, borderLeft: '6px solid #ff4e00' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            What is NACLO?
          </Typography>
          <Typography variant="body1">
            NACLO was started in 2006 and has organized an annual linguistics
            competition every year since. Hundreds of students throughout the
            United States and Canada compete every year.
          </Typography>
        </CardContent>
      </Card>

      {/* NACLO Impact Section */}
      <Card sx={{ mb: 4, p: 2, backgroundColor: '#e3f2fd' }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
          >
            <Favorite sx={{ color: '#d81b60', mr: 1 }} /> The Impact of NACLO
          </Typography>
          <Typography variant="body1">
            NACLO helps increase diversity in linguistics, computational
            linguistics, and language technologies. It also helps improve
            education and prepares students for academic and professional
            careers.
          </Typography>
        </CardContent>
      </Card>

      {/* Intellectual Merit Section */}
      <Card sx={{ mb: 4, p: 2, borderLeft: '6px solid #ff3d00' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            The Intellectual Merit of NACLO
          </Typography>
          <Typography variant="body1">
            NACLO identifies foundational skills and works them into a
            curriculum of training exercises and contest problems to prepare
            students for college and beyond.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
