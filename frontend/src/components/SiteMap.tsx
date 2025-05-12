'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import axios from 'axios'

import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Fix Leaflet marker icon path for Next.js
L.Icon.Default.mergeOptions({
  iconUrl,
  shadowUrl: iconShadowUrl,
})

type Site = {
  id: number
  name: string
  latitude: number
  longitude: number
  city: string
  state: string
}

const SiteMap = () => {
  const [sites, setSites] = useState<Site[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const fetchSites = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
        const url = `${baseUrl.replace(/\/+$/, '')}/api/sites`
        const res = await axios.get(url)
        setSites(res.data.data || [])
      } catch (err) {
        console.error('Failed to load sites:', err)
      }
    }

    fetchSites()
  }, [])

  const mapCenter: LatLngExpression = [39.8283, -98.5795]

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <h2>Explore NACLO Sites Across the US</h2>

      <MapContainer
        center={mapCenter}
        zoom={4}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sites.map(
          (site) =>
            site.latitude &&
            site.longitude && (
              <Marker key={site.id} position={[site.latitude, site.longitude]}>
                <Popup>
                  <strong>{site.name}</strong>
                  <br />
                  {site.city}, {site.state}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  )
}

export default SiteMap
