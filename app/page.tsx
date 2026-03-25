import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import BrokenWorld from '@/components/BrokenWorld'
import TurningPoint from '@/components/TurningPoint'
import OperationsLayer from '@/components/OperationsLayer'
import StrategicLayer from '@/components/StrategicLayer'
import InfiniteLayer from '@/components/InfiniteLayer'
import Architect from '@/components/Architect'
import Assessment from '@/components/Assessment'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f9fc]">
      <Nav />

      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Broken World */}
      <BrokenWorld />

      {/* Section 3: Turning Point / The Problem */}
      <TurningPoint />

      {/* Section 4: Operations Layer */}
      <OperationsLayer />

      {/* Section 5: Strategic Layer */}
      <StrategicLayer />

      {/* Section 6: Infinite Layer */}
      <InfiniteLayer />

      {/* Section 7: The Architect */}
      <Architect />

      {/* Section 8: Assessment */}
      <Assessment />

      {/* Footer */}
      <Footer />
    </main>
  )
}
