import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Davit Gevorgyan — Strategy-Led AI Transformation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const GOLD = '#E2B97F'
const BG = '#0a0a0f'

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
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay (faint) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

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
              boxShadow: `0 0 16px ${GOLD}`,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: GOLD,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            STRATEGY-LED AI TRANSFORMATION
          </div>
        </div>

        {/* Main name — large mono */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: 32,
            letterSpacing: '-0.01em',
            display: 'flex',
          }}
        >
          Davit Gevorgyan
        </div>

        {/* Subhead — the thesis */}
        <div
          style={{
            fontSize: 34,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.35,
            maxWidth: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Most companies are deploying AI agents</span>
          <span>that automate the wrong things.</span>
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
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 44,
              color: GOLD,
              fontWeight: 700,
            }}
          >
            {`>_`}
          </div>
          <div
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            davitgevorgyan.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
