// pages/index.tsx
// import dynamic from 'next/dynamic'
import HeroSection from '../components/HeroSection'
import Announcements from '../components/Announcements'
import AboutNaclo from '../components/AboutNaclo'
import DonateContact from '../components/DonateContact'
// import SiteMapWrapper from '@/components/SiteMapWrapper'

// // Dynamically import SiteMap for client-side rendering only
// const DynamicSiteMap = dynamic(() => import('../components/SiteMap'), {
//   ssr: false,
//   loading: () => <p>Loading map...</p>,
// })

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutNaclo />
      <Announcements />
      <DonateContact />
      {/* <SiteMapWrapper /> */}
    </div>
  )
}
