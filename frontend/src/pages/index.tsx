import HeroSection from '../components/HeroSection'
import Announcements from '../components/Announcements'
import AboutNaclo from '../components/AboutNaclo'
import SponsorsCarousel from '../components/SponsorsCarousel'
import DonateContact from '../components/DonateContact'
import dynamic from 'next/dynamic'

const CompetitionMap = dynamic(() => import('../components/CompetitionMap'), {
  ssr: false,
})
// ... inside your page/component JSX:
;<CompetitionMap />

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutNaclo />
      <Announcements />
      <DonateContact />

      <CompetitionMap />
      <SponsorsCarousel />
    </div>
  )
}
