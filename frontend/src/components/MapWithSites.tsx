// src/components/MapWithSites.tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Типизация с расширением прототипа
interface IconWithGetIconUrl extends L.IconDefault {
  _getIconUrl?: () => string
}

// Удаление устаревшего метода и установка корректных иконок
delete (L.Icon.Default.prototype as IconWithGetIconUrl)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
})

const sites = [
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
  {
    id: 4,
    name: 'College of William and Mary',
    city: 'Williamsburg',
    state: 'VA',
    latitude: 37.2707,
    longitude: -76.7075,
    website: 'http://www.wm.edu/as/linguistics/naclo/index.php',
  },
  {
    id: 5,
    name: 'Columbia University',
    city: 'New York',
    state: 'NY',
    latitude: 40.8075,
    longitude: -73.9626,
    website: 'http://www.cs.columbia.edu/~bauer/NACLO2023/',
  },
  {
    id: 6,
    name: 'Cornell University',
    city: 'Ithaca',
    state: 'NY',
    latitude: 42.4534,
    longitude: -76.4735,
    website: 'https://blogs.cornell.edu/linguisticsoutreach/',
  },
  {
    id: 7,
    name: 'Dalhousie University',
    city: 'Halifax',
    state: 'NS',
    latitude: 44.6366,
    longitude: -63.5918,
    website: 'http://naclo.ca',
  },
  {
    id: 8,
    name: 'Dartmouth College',
    city: 'Hanover',
    state: 'NH',
    latitude: 43.7044,
    longitude: -72.2887,
    website: 'http://www.cs.dartmouth.edu/~naclo/',
  },
  {
    id: 9,
    name: 'Georgetown University',
    city: 'Washington',
    state: 'DC',
    latitude: 38.9076,
    longitude: -77.0723,
    website: 'http://gucl.georgetown.edu/naclo.html',
  },
  {
    id: 10,
    name: 'Johns Hopkins University',
    city: 'Baltimore',
    state: 'MD',
    latitude: 39.3289,
    longitude: -76.6205,
    website: 'http://naclo.clsp.jhu.edu',
  },
]

export default function MapWithSites() {
  return (
    <MapContainer
      center={[39.8283, -98.5795]} // Центр карты — середина США
      zoom={4}
      scrollWheelZoom={false} // Отключен зум на скролл
      style={{ height: '500px', width: '100%' }}
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
