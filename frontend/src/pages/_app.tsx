import { AppProps } from 'next/app'
import Head from 'next/head'
import { AuthProvider } from '../context/AuthContext'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NACLO</title>{' '}
      </Head>
      <div
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Navbar />
        <main className="main" style={{ paddingTop: '64px' }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}
