import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import VideoSection from './components/VideoSection'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import { useState } from 'react'

export default function App() {

  const [bannerVisible, setVisible] = useState(localStorage.getItem('cookie-consent') === null)

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <VideoSection />
      <ContactForm />
      <Footer onCookieSettings={() => setVisible(true)}/>
      <CookieBanner visible={bannerVisible} setVisible={setVisible}/>
    </>
  )
}
