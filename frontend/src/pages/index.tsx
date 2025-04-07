import { Container, Typography, Button } from '@mui/material'
import HeroSection from '../components/HeroSection'
import Announcements from '../components/Announcements'
import AboutNaclo from '../components/AboutNaclo'
import DonateContact from '../components/DonateContact'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutNaclo />
      <Announcements />
      <DonateContact />
    </div>
  )
}
