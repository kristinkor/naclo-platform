import { AppBar, Menu, MenuItem, Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { setAuthToken } from '../utils/api'

export default function Navbar() {
  const { user, setUser } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [currentMenu, setCurrentMenu] = useState<string | null>(null)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    menu: string
  ) => {
    setAnchorEl(event.currentTarget)
    setCurrentMenu(menu)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCurrentMenu(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthToken(null)
    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AppBar
      position="fixed"
      className="navbar"
      sx={{
        color: '#2a2a2a',
        background: '#ffffff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <div className="header wrapper">
        <Link href="/">
          <Image
            className="logo"
            src="/naclo_orange.png"
            alt="NACLO Logo"
            width={240}
            height={180}
            priority
            style={{ height: 'auto' }}
          />
        </Link>

        <Button color="inherit" onClick={(e) => handleClick(e, 'about')}>
          About
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'about'}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: '0px',
              boxShadow: 3,
              top: '64px !important',
            },
          }}
        >
          <MenuItem component={Link} href="/about-naclo">
            About NACLO
          </MenuItem>
          <MenuItem component={Link} href="/program-committee">
            Program Committee
          </MenuItem>
          <MenuItem component={Link} href="/organizing-committee">
            Organizing Committee
          </MenuItem>
          <MenuItem component={Link} href="/donate">
            Donate
          </MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => handleClick(e, 'sites')}>
          NACLO Sites
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'sites'}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: '0px',
              boxShadow: 3,
              top: '64px !important',
            },
          }}
        >
          <MenuItem component={Link} href="/university-sites">
            University Sites
          </MenuItem>
          <MenuItem component={Link} href="/high-school-sites">
            High School Sites
          </MenuItem>
          <MenuItem component={Link} href="/site-coordinators">
            Site Coordinators
          </MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => handleClick(e, 'competitions')}>
          Competitions
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'competitions'}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: '0px',
              boxShadow: 3,
              top: '64px !important',
            },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem component={Link} href="/upcoming-competition">
            Upcoming Competition 2025
          </MenuItem>
          <MenuItem component={Link} href="/past-competitions">
            Past Competitions 2007–2024
          </MenuItem>
          <MenuItem component={Link} href="/related-events">
            Related Events
          </MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => handleClick(e, 'sponsors')}>
          Press & Sponsors
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'sponsors'}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: '0px',
              boxShadow: 3,
              top: '64px !important',
            },
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <MenuItem component={Link} href="/current-press">
            Current Press
          </MenuItem>
          <MenuItem component={Link} href="/past-press">
            Past Press
          </MenuItem>
          <MenuItem component={Link} href="/current-sponsors">
            Current Sponsors
          </MenuItem>
          <MenuItem component={Link} href="/past-sponsors">
            Past Sponsors
          </MenuItem>
          <MenuItem component={Link} href="/become-sponsor">
            Become a Sponsor
          </MenuItem>
        </Menu>

        <Button color="inherit" onClick={(e) => handleClick(e, 'resources')}>
          Resources
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'resources'}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: '0px',
              boxShadow: 3,
              top: '64px !important',
            },
          }}
        >
          <MenuItem component={Link} href="/register">
            Student Registration
          </MenuItem>
          <MenuItem component={Link} href="/practice">
            Practice Problems
          </MenuItem>
          <MenuItem component={Link} href="/student-handbook">
            Student Handbook
          </MenuItem>
          <MenuItem component={Link} href="/coordinator-handbook">
            Coordinator Handbook
          </MenuItem>
          <MenuItem component={Link} href="/naclo-resources">
            NACLO Resources
          </MenuItem>
        </Menu>

        {/* Admin only link */}
        {user?.roleId === 1 && (
          <Button
            component={Link}
            href="/admin/dashboard"
            sx={{ color: '#7125ce', fontWeight: 'bold', ml: 'auto' }}
          >
            Admin Panel
          </Button>
        )}

        {/* Auth buttons */}
        <div style={{ marginLeft: 'auto' }}>
          {user ? (
            <>
              <Button
                component={Link}
                href="/profile"
                sx={{ fontWeight: 'bold' }}
              >
                Profile
              </Button>
              <Button onClick={handleLogout} sx={{ fontWeight: 'bold' }}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={Link} href="/login" sx={{ fontWeight: 'bold' }}>
              Login
            </Button>
          )}
        </div>
      </div>
    </AppBar>
  )
}
