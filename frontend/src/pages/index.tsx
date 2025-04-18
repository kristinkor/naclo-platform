import HeroSection from '../components/HeroSection'
import Announcements from '../components/Announcements'
import AboutNaclo from '../components/AboutNaclo'
import DonateContact from '../components/DonateContact'

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
