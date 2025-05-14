'use client' // Ensure this component is client-side

// Import Leaflet CSS and plugin to avoid 404 errors for default icons:contentReference[oaicite:2]{index=2}
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility' // must be imported after Leaflet CSS

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { JSX } from 'react'

// Define the data type for competition sites
interface CompetitionSite {
  name: string
  city: string
  position: [number, number]
  url: string
}

// Sample 20 competition sites across the US
const competitionSites: CompetitionSite[] = [
  {
    name: 'Tech Innovators Challenge',
    city: 'Seattle, WA',
    position: [47.6062, -122.3321],
    url: 'https://example.com/tech-innovators',
  },
  {
    name: 'Startup Pitch Fest',
    city: 'San Francisco, CA',
    position: [37.7749, -122.4194],
    url: 'https://example.com/startup-pitch',
  },
  {
    name: 'AI Hackathon',
    city: 'Los Angeles, CA',
    position: [34.0522, -118.2437],
    url: 'https://example.com/ai-hackathon',
  },
  {
    name: 'Robotics Championship',
    city: 'Las Vegas, NV',
    position: [36.1699, -115.1398],
    url: 'https://example.com/robotics-champ',
  },
  {
    name: 'Green Energy Contest',
    city: 'Denver, CO',
    position: [39.7392, -104.9903],
    url: 'https://example.com/green-energy',
  },
  {
    name: 'Education Code Cup',
    city: 'Dallas, TX',
    position: [32.7767, -96.797],
    url: 'https://example.com/education-code',
  },
  {
    name: 'Healthcare Hackathon',
    city: 'Houston, TX',
    position: [29.7604, -95.3698],
    url: 'https://example.com/health-hack',
  },
  {
    name: 'FinTech Challenge',
    city: 'Chicago, IL',
    position: [41.8781, -87.6298],
    url: 'https://example.com/fintech-challenge',
  },
  {
    name: 'Gaming Code Jam',
    city: 'Miami, FL',
    position: [25.7617, -80.1918],
    url: 'https://example.com/gaming-jam',
  },
  {
    name: 'Music Tech Competition',
    city: 'Atlanta, GA',
    position: [33.749, -84.388],
    url: 'https://example.com/music-tech',
  },
  {
    name: 'Urban Planning Hack',
    city: 'New York, NY',
    position: [40.7128, -74.006],
    url: 'https://example.com/urban-planning',
  },
  {
    name: 'Biotech Innovation',
    city: 'Boston, MA',
    position: [42.3601, -71.0589],
    url: 'https://example.com/biotech-innovation',
  },
  {
    name: 'Security Hackathon',
    city: 'Washington, DC',
    position: [38.9072, -77.0369],
    url: 'https://example.com/security-hack',
  },
  {
    name: 'Automotive Tech Contest',
    city: 'Detroit, MI',
    position: [42.3314, -83.0458],
    url: 'https://example.com/auto-tech',
  },
  {
    name: 'Civic Tech Challenge',
    city: 'Kansas City, MO',
    position: [39.0997, -94.5786],
    url: 'https://example.com/civic-tech',
  },
  {
    name: 'Space Tech Competition',
    city: 'Phoenix, AZ',
    position: [33.4484, -112.074],
    url: 'https://example.com/space-tech',
  },
  {
    name: 'AgriTech Hackathon',
    city: 'Minneapolis, MN',
    position: [44.9778, -93.265],
    url: 'https://example.com/agritech-hack',
  },
  {
    name: 'Heritage Codefest',
    city: 'New Orleans, LA',
    position: [29.9511, -90.0715],
    url: 'https://example.com/heritage-codefest',
  },
  {
    name: 'Logistics Optimization',
    city: 'Salt Lake City, UT',
    position: [40.7608, -111.891],
    url: 'https://example.com/logistics-opt',
  },
  {
    name: 'Social Impact Hackathon',
    city: 'Cleveland, OH',
    position: [41.4993, -81.6944],
    url: 'https://example.com/social-impact',
  },
]

export default function CompetitionMap(): JSX.Element {
  return (
    <MapContainer
      center={[37.8, -96.0]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '100%' }}
    >
      {/* OpenStreetMap Tile Layer with proper attribution */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Add a Marker + Popup for each competition site */}
      {competitionSites.map((site) => (
        <Marker key={site.name} position={site.position}>
          <Popup>
            <strong>{site.name}</strong>
            <br />
            {site.city}
            <br />
            <a href={site.url} target="_blank" rel="noopener noreferrer">
              Visit website
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
