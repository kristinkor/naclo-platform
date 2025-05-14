// src/components/CompetitionMap.tsx
'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import L from 'leaflet'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
})

// Fix leaflet marker icons on client side only
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  })
}

interface Site {
  id: number
  name: string
  city: string
  state: string
  latitude: number
  longitude: number
  website: string
}

const sites: Site[] = [
  {
    id: 1,
    name: 'Brandeis University',
    city: 'Waltham',
    state: 'MA',
    latitude: 42.3655,
    longitude: -71.2619,
    website: 'http://boston-olympiad.org',
  },
  // ... другие сайты можно сюда добавить
]

export default function CompetitionMap() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <MapContainer
      center={[39.8283, -98.5795]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.latitude, site.longitude] as [number, number]}
        >
          <Popup>
            <strong>{site.name}</strong>
            <br />
            {site.city}, {site.state}
            <br />
            <a href={site.website} target="_blank" rel="noopener noreferrer">
              Visit Site
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
