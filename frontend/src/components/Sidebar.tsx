import { Drawer, List, ListItem, ListItemText } from '@mui/material'
import Link from 'next/link'

const quickLinks = [
  { name: 'Student Registration', href: '/register' },
  { name: 'Practice Problems', href: '/practice' },
  { name: 'Student Handbook', href: '/handbook' },
  { name: 'Coordinator Handbook', href: '/coordinator' },
  { name: 'NACLO Resources', href: '/resources' },
]

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        flexShrink: 0,
        marginTop: '64px', // Push it down below the navbar
        '& .MuiDrawer-paper': {
          width: 250,
          backgroundColor: '#ff9a04',
          color: '#ffffff',
          marginTop: '64px',
        },
      }}
    >
      <List>
        {quickLinks.map((link) => (
          <ListItem key={link.name} component={Link} href={link.href}>
            <ListItemText primary={link.name} sx={{ color: '#ffffff' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
