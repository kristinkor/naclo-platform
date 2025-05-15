'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'

// Fix Leaflet marker icons for SSR-compatible environments
Object.assign(L.Icon.Default.prototype, {
  _getIconUrl: () => '',
})

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

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
  {
    id: 2,
    name: 'Carnegie Mellon University',
    city: 'Pittsburgh',
    state: 'PA',
    latitude: 40.4433,
    longitude: -79.9436,
    website: 'https://www.lti.cs.cmu.edu/naclo-cmu',
  },
]

export default function CompetitionMap() {
  const center: LatLngExpression = [39.8283, -98.5795]

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {sites.map((site) => (
        <Marker key={site.id} position={[site.latitude, site.longitude]}>
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
