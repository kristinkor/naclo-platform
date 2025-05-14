import HeroSection from '../components/HeroSection'
import Announcements from '../components/Announcements'
import AboutNaclo from '../components/AboutNaclo'
import SponsorsCarousel from '../components/SponsorsCarousel'
import DonateContact from '../components/DonateContact'
import dynamic from 'next/dynamic'
const MapWithSites = dynamic(() => import('../components/MapWithSites'), {
  ssr: false,
})

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutNaclo />
      <Announcements />
      <DonateContact />

      <MapWithSites />
      <SponsorsCarousel />
    </div>
  )
}
