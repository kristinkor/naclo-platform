// src/components/SponsorsCarousel.tsx
'use client'

import { Box, Typography, Link } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'

const sponsors = [
  {
    name: 'Linguistic Society of America',
    url: 'http://www.linguisticsociety.org/',
    logo: '/images/sponsor_logos/LSA.png',
  },
  {
    name: 'Association for Computational Linguistics',
    url: 'http://www.aclweb.org/',
    logo: '/images/sponsor_logos/acl.png',
  },
  {
    name: 'National Science Foundation',
    url: 'http://nsf.gov',
    logo: '/images/sponsor_logos/nsf.png',
  },
  {
    name: 'Carnegie Mellon University',
    url: 'http://www.cmu.edu',
    logo: '/images/sponsor_logos/cmu.gif',
  },
  {
    name: 'Yale University',
    url: 'https://www.yale.edu/',
    logo: '/images/sponsor_logos/yaleblue.png',
  },
]

const SponsorsCarousel: React.FC = () => {
  return (
    <Box sx={{ py: 6, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Our Sponsors
      </Typography>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          600: { slidesPerView: 3 },
          960: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        style={{ padding: '1rem 0' }}
      >
        {sponsors.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <Link
              href={sponsor.url}
              target="_blank"
              rel="noopener"
              sx={{ display: 'inline-block' }}
            >
              <Box
                component="img"
                src={sponsor.logo}
                alt={sponsor.name}
                sx={{ height: 80, objectFit: 'contain', mx: 'auto', px: 2 }}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default SponsorsCarousel
