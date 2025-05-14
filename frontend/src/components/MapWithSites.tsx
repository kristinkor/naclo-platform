// src/components/MapWithSites.tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconProto = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: () => string
}
if ('_getIconUrl' in iconProto) {
  delete iconProto._getIconUrl
}

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

type Site = {
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
  {
    id: 2,
    name: 'Brigham Young University',
    city: 'Provo',
    state: 'UT',
    latitude: 40.2518,
    longitude: -111.6493,
    website: 'http://linguistics.byu.edu/naclo',
  },
  {
    id: 3,
    name: 'Carnegie Mellon University',
    city: 'Pittsburgh',
    state: 'PA',
    latitude: 40.4433,
    longitude: -79.9436,
    website: 'https://www.lti.cs.cmu.edu/naclo-cmu',
  },
]

export default function MapWithSites() {
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
