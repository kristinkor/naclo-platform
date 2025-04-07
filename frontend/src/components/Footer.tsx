import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import {
  faTwitter,
  faLinkedin,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons'

const socialLinks = [
  { href: 'https://twitter.com/theJRMF', icon: faTwitter },
  { href: 'https://www.linkedin.com/company/thejrmf/', icon: faLinkedin },
  { href: 'https://www.instagram.com/thejrmf/?hl=en', icon: faInstagram },
  { href: 'https://www.facebook.com/theJRMF/', icon: faFacebook },
]

export default function Footer() {
  return (
    <Box
      className="footer"
      sx={{
        textAlign: 'center',
        marginTop: 'auto',
      }}
    >
      <div className="wrapper">
        <div className="bottombar">
          <div className="bottom-logo">
            <div className="bottom-logo_image mb-20">
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
            </div>
            <div>
              <p>
                NACLO North American Computational Linguistics Open Competition
                is a contest in which high-school students solve linguistic
                problems.{' '}
              </p>
            </div>
          </div>
          <div className="bottom-nav">
            <ul id="menu-footer">
              <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3868">
                <Link href="/help">Help</Link>{' '}
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <Link href="/privacy-policy">Privacy Policy</Link>{' '}
              </li>
              <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                <Link href="/site-map">Site Map</Link>{' '}
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page ">
                <Link href="/credits">Credits</Link>{' '}
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page ">
                <Link href="/contact">Contact Us</Link>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page">
                <Link href="/about">History of NACLO</Link>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page ">
                <a href="/">Shop</a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page ">
                <Link href="/donate">Donate</Link>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page ">
                <Link href="/donate">Login</Link>
              </li>
            </ul>{' '}
          </div>
          <div className="bottom-info">
            <div className="mb-20 mmb-10 f-large m-center">Follow us:</div>
            <div className="mb-50 mmb-30">
              <div className="social">
                {socialLinks.map(({ href, icon }) => (
                  <div className="social-item" key={href}>
                    <Link target="_blank" rel="noopener noreferrer" href={href}>
                      <FontAwesomeIcon icon={icon} size="2x" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Link href="/register">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#00aaee',
                    color: 'white',
                    fontSize: '18px',
                    px: 4,
                    py: 1.5,
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#e68900' },
                  }}
                >
                  SUPPORT US
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            ©&nbsp;2007–2025 North American Computational Linguistics Open
            Competition
          </p>
          <div>
            <p>All rights reserved.</p>
            {/* <p>
              Built with ❤ by{' '}
              <a href="/" target="_blank" rel="noopener noreferrer">
                KK
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </Box>
  )
}
