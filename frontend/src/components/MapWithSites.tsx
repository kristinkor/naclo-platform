// src/components/MapWithSites.tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix default icon issue in Leaflet
delete (L.Icon.Default.prototype as unknown)._getIconUrl
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
  website?: string
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
  {
    id: 11,
    name: 'Massachusetts Institute of Technology',
    city: 'Cambridge',
    state: 'MA',
    latitude: 42.3601,
    longitude: -71.0942,
    website: 'http://naclo.mit.edu',
  },
  {
    id: 12,
    name: 'Middle Tennessee State University',
    city: 'Murfreesboro',
    state: 'TN',
    latitude: 35.8456,
    longitude: -86.3903,
    website: 'http://www.mtsu.edu/lo/naclo.php',
  },
  {
    id: 13,
    name: 'Minnesota State University Mankato',
    city: 'Mankato',
    state: 'MN',
    latitude: 44.1468,
    longitude: -94.0001,
    website: 'https://cset.mnsu.edu/naclo',
  },
  {
    id: 14,
    name: 'Ohio State University',
    city: 'Columbus',
    state: 'OH',
    latitude: 40.0076,
    longitude: -83.0309,
    website: 'https://linguistics.osu.edu/naclo',
  },
  {
    id: 15,
    name: 'Princeton University',
    city: 'Princeton',
    state: 'NJ',
    latitude: 40.3431,
    longitude: -74.6551,
    website: 'https://sites.google.com/princeton.edu/nacloprinceton/home',
  },
  {
    id: 16,
    name: 'Simon Fraser University',
    city: 'Burnaby',
    state: 'BC',
    latitude: 49.2781,
    longitude: -122.9199,
    website: 'http://www.sfu.ca/linguistics/undergraduate/naclo-at-sfu.html',
  },
  {
    id: 17,
    name: 'Stanford University',
    city: 'Stanford',
    state: 'CA',
    latitude: 37.4275,
    longitude: -122.1697,
    website: 'https://linguistics.stanford.edu/news-events/naclo',
  },
  {
    id: 18,
    name: 'Stony Brook University',
    city: 'Stony Brook',
    state: 'NY',
    latitude: 40.9124,
    longitude: -73.1232,
    website: 'https://calendar.stonybrook.edu/site/iacs/event/naclo-2023/',
  },
  {
    id: 19,
    name: 'Union College',
    city: 'Schenectady',
    state: 'NY',
    latitude: 42.8206,
    longitude: -73.9285,
    website: 'http://cs.union.edu/~striegnk/naclo',
  },
  {
    id: 20,
    name: 'University of Wisconsin, Milwaukee',
    city: 'Milwaukee',
    state: 'WI',
    latitude: 43.0799,
    longitude: -87.8816,
    website: 'http://HSlinguistsMKE.wordpress.com',
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
        <Marker key={site.id} position={[site.latitude, site.longitude]}>
          <Popup>
            <strong>{site.name}</strong>
            <br />
            {site.city}, {site.state}
            <br />
            {site.website && (
              <a href={site.website} target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
