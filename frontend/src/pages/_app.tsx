import { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <main
          className="main"
          style={{ paddingTop: '64px', paddingBottom: '64px' }}
        >
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
