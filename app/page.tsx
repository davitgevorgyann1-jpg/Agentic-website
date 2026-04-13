import Nav from '@/components/Nav'
import HeroDark from '@/components/HeroDark'
import BrokenWorld from '@/components/BrokenWorld'
import TurningPoint from '@/components/TurningPoint'
import OperationsLayer from '@/components/OperationsLayer'
import StrategicLayer from '@/components/StrategicLayer'
import InfiniteLayer from '@/components/InfiniteLayer'
import Architect from '@/components/Architect'
import Assessment from '@/components/Assessment'
import Footer from '@/components/Footer'
import FullpageScroll from '@/components/FullpageScroll'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0f' }}>
      {/* Global grid overlay */}
      <div className="grid-overlay" />

      <FullpageScroll>
        {/* Section 1: Hero */}
        <div style={{ position: 'relative' }}>
          <Nav />
          <HeroDark />
        </div>

        {/* Section 2: Broken World */}
        <div className="fp-section-scroll">
          <BrokenWorld />
        </div>

        {/* Section 3: Turning Point */}
        <TurningPoint />

        {/* Section 4: Strategic Layer */}
        <div className="fp-section-scroll">
          <StrategicLayer />
        </div>

        {/* Section 5: Operations Layer */}
        <div className="fp-section-scroll">
          <OperationsLayer />
        </div>

        {/* Section 6: Infinite Layer */}
        <div className="fp-section-scroll">
          <InfiniteLayer />
        </div>

        {/* Section 7: The Architect */}
        <Architect />

        {/* Section 8: Assessment */}
        <div className="fp-section-scroll">
          <Assessment />
        </div>

        {/* Section 9: CTA + Footer */}
        <Footer />
      </FullpageScroll>
    </main>
  )
}
