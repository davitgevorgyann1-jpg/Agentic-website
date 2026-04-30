import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Davit Gevorgyan — Strategy-Led AI Transformation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const GOLD = '#E2B97F'
const BG = '#0a0a0f'

// IMPORTANT: do not set `fontFamily: 'monospace'` (or any font we have not
// explicitly loaded). Satori — the renderer behind ImageResponse — only
// ships with Inter by default. Referencing an unavailable font silently
// produces a 0-byte PNG. Stick to Inter weights or fetch a font.
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Top tag row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 60,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: GOLD,
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: GOLD,
              textTransform: 'uppercase',
              letterSpacing: 6,
              fontWeight: 600,
            }}
          >
            Strategy-Led AI Transformation
          </div>
        </div>

        {/* Main name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 32,
            display: 'flex',
          }}
        >
          Davit Gevorgyan
        </div>

        {/* Subhead — the thesis */}
        <div
          style={{
            fontSize: 36,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.35,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>I don&apos;t ask what to automate.</span>
          <span>I ask why.</span>
        </div>

        {/* Bottom row: >_ prompt left, byline right */}
        <div
          style={{
            position: 'absolute',
            left: 80,
            right: 80,
            bottom: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 48,
              color: GOLD,
              fontWeight: 800,
              display: 'flex',
            }}
          >
            {'>_'}
          </div>
          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: 4,
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            davit-gevorgyan.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
