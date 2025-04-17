// src/pages/profile/webmaster.tsx
import { Container, Grid, Typography, Paper, Box, Button } from '@mui/material'
import { useRouter } from 'next/router'
import {
  UserCog,
  Users,
  School,
  BookOpen,
  Settings,
  Megaphone,
} from 'lucide-react'

const sections = [
  {
    title: 'Users',
    description: 'View and manage all user accounts.',
    link: '/admin/users',
    icon: <Users size={28} />,
  },
  {
    title: 'Sites',
    description: 'Create, update, and manage sites.',
    link: '/admin/sites',
    icon: <School size={28} />,
  },
  {
    title: 'Announcements',
    description: 'Add or remove homepage announcements.',
    link: '/admin/announcements',
    icon: <Megaphone size={28} />,
  },
  {
    title: 'Student Data',
    description: 'Edit student profiles and contest participation.',
    link: '/admin/students',
    icon: <BookOpen size={28} />,
  },
  {
    title: 'Committees',
    description: 'Manage organizing and program committee pages.',
    link: '/admin/committees',
    icon: <UserCog size={28} />,
  },
  {
    title: 'Permissions',
    description: 'Toggle which fields are editable for each role.',
    link: '/admin/settings',
    icon: <Settings size={28} />,
  },
]

export default function WebmasterProfile() {
  const router = useRouter()

  return (
    <Container sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Webmaster Dashboard
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.title}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-3px)',
                },
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={2}
              >
                {section.icon}
              </Box>
              <Typography variant="h6" textAlign="center" gutterBottom>
                {section.title}
              </Typography>
              <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {section.description}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                onClick={() => router.push(section.link)}
                sx={{
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                Go
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
