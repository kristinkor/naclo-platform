// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Menu,
//   MenuItem,
//   Button,
// } from '@mui/material'
// import Image from 'next/image'
// import Link from 'next/link'
// import { useEffect, useState } from 'react'
// import { api, setAuthToken } from '../utils/api'

// export default function Navbar() {
//   const [user, setUser] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
//   const [currentMenu, setCurrentMenu] = useState<string | null>(null)

//   const handleClick = (
//     event: React.MouseEvent<HTMLButtonElement>,
//     menu: string
//   ) => {
//     setAnchorEl(event.currentTarget)
//     setCurrentMenu(menu)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//     setCurrentMenu(null)
//   }

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       setLoading(false)
//       return
//     }

//     setAuthToken(token)

//     api
//       .get('/users/me')
//       .then((res) => {
//         console.log('User Data:', res.data) // ✅ Debugging
//         setUser(res.data)
//       })
//       .catch(() => {
//         localStorage.removeItem('token')
//         setAuthToken(null)
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   if (loading) return null // Prevents rendering before authentication check completes

//   return (
//     <AppBar
//       position="fixed"
//       className="navbar"
//       sx={{
//         color: '#2a2a2a',
//         background: '#ffffff',
//         zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure AppBar has a higher z-index than the menu
//       }}
//     >
//       <Toolbar>
//         <Link href="/">
//           <Image
//             className="logo"
//             src="/naclo_orange.png"
//             alt="NACLO Logo"
//             width={180}
//             height={150}
//             layout="responsive"
//           />
//         </Link>

//         <Button color="inherit" onClick={(e) => handleClick(e, 'about')}>
//           About
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && currentMenu === 'about'}
//           onClose={handleClose}
//           sx={{ marginTop: '64px', borderRadius: '0' }} // Ensure the menu is positioned below the navbar
//         >
//           <MenuItem component={Link} href="/about-naclo">
//             About NACLO
//           </MenuItem>
//           <MenuItem component={Link} href="/program-committee">
//             Program Committee
//           </MenuItem>
//           <MenuItem component={Link} href="/organizing-committee">
//             Organizing Committee
//           </MenuItem>
//           <MenuItem component={Link} href="/donate">
//             Donate
//           </MenuItem>
//         </Menu>

//         <Button color="inherit" onClick={(e) => handleClick(e, 'sites')}>
//           NACLO Sites
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && currentMenu === 'sites'}
//           onClose={handleClose}
//         >
//           <MenuItem component={Link} href="/university-sites">
//             University Sites
//           </MenuItem>
//           <MenuItem component={Link} href="/high-school-sites">
//             High School Sites
//           </MenuItem>
//           <MenuItem component={Link} href="/site-coordinators">
//             Site Coordinators
//           </MenuItem>
//         </Menu>

//         <Button color="inherit" onClick={(e) => handleClick(e, 'competitions')}>
//           Competitions
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && currentMenu === 'competitions'}
//           onClose={handleClose}
//         >
//           <MenuItem component={Link} href="/upcoming-competition">
//             Upcoming Competition 2025
//           </MenuItem>
//           <MenuItem component={Link} href="/past-competitions">
//             Past Competitions 2007-2024
//           </MenuItem>
//           <MenuItem component={Link} href="/related-events">
//             Related Events
//           </MenuItem>
//         </Menu>

//         <Button color="inherit" onClick={(e) => handleClick(e, 'sponsors')}>
//           Press & Sponsors
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && currentMenu === 'sponsors'}
//           onClose={handleClose}
//         >
//           <MenuItem component={Link} href="/current-press">
//             Current Press
//           </MenuItem>
//           <MenuItem component={Link} href="/past-press">
//             Past Press
//           </MenuItem>
//           <MenuItem component={Link} href="/current-sponsors">
//             Current Sponsors
//           </MenuItem>
//           <MenuItem component={Link} href="/past-sponsors">
//             Past Sponsors
//           </MenuItem>
//           <MenuItem component={Link} href="/become-sponsor">
//             Become a Sponsor
//           </MenuItem>
//         </Menu>
//         <Button color="inherit" onClick={(e) => handleClick(e, 'sites')}>
//           Resources
//         </Button>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl) && currentMenu === 'resources'}
//           onClose={handleClose}
//         >
//           <MenuItem component={Link} href="/register">
//             Student Registration
//           </MenuItem>
//           <MenuItem component={Link} href="/practice">
//             Practice Problems
//           </MenuItem>
//           <MenuItem component={Link} href="/student-handbook">
//             Student Handbook
//           </MenuItem>
//           <MenuItem component={Link} href="/coordinator-handbook">
//             Coordinator Handbook
//           </MenuItem>
//           <MenuItem component={Link} href="/naclo-resources">
//             NACLO Resources
//           </MenuItem>
//         </Menu>

//         {user && user.roleId === 1 && (
//           <Button
//             component={Link}
//             href="/admin/dashboard"
//             sx={{ color: '#7125ce', fontWeight: 'bold', marginRight: '20px' }}
//           >
//             Admin Panel
//           </Button>
//         )}

//         <Button
//           onClick={() => {
//             if (user) {
//               localStorage.removeItem('token')
//               setAuthToken(null)
//               window.location.href = '/login'
//             } else {
//               window.location.href = '/login'
//             }
//           }}
//           sx={{ color: '#' }}
//         >
//           {user ? 'Logout' : 'Login'}
//         </Button>
//       </Toolbar>
//     </AppBar>
//   )
// }
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Button,
} from '@mui/material'
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
      <Toolbar>
        <Link href="/">
          <Image
            className="logo"
            src="/naclo_orange.png"
            alt="NACLO Logo"
            width={180}
            height={150}
            layout="responsive"
          />
        </Link>

        <Button color="inherit" onClick={(e) => handleClick(e, 'about')}>
          About
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl) && currentMenu === 'about'}
          onClose={handleClose}
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
      </Toolbar>
    </AppBar>
  )
}
