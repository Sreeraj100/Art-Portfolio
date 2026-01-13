'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PortraitGallery from '../components/PortraitGallery';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PortraitGallery />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
