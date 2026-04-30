import { ImageResponse } from 'next/og'

/**
 * LinkedIn cover photo / banner image.
 *
 * Served at: /linkedin-banner
 * Spec:      1584 × 396 PNG (LinkedIn personal banner dimensions)
 *
 * Layout is composed around LinkedIn's profile-picture overlay, which sits
 * in the bottom-left corner of the banner (approximately the first 300×200
 * pixels). All meaningful content stays in the top half, the right two
 * thirds, or the bottom-right corner — none of which the avatar covers.
 *
 * Same renderer (Satori via next/og), same typography rules as the OG
 * image: do NOT reference unavailable fonts; rely on Inter (the default).
 */

export const runtime = 'edge'

const GOLD = '#E2B97F'
const BG = '#0a0a0f'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 64px',
          position: 'relative',
        }}
      >
        {/* Subtle grid pattern, matching the website's global overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 11,
              height: 11,
              borderRadius: '50%',
              background: GOLD,
            }}
          />
          <div
            style={{
              fontSize: 20,
              color: GOLD,
              textTransform: 'uppercase',
              letterSpacing: 6,
              fontWeight: 600,
              display: 'flex',
            }}
          >
            Strategy-Led AI Transformation
          </div>
        </div>

        {/* Punchline — centered vertically, right-aligned to clear the avatar */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'right',
            }}
          >
            <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
              Strategy first.
            </span>
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                color: GOLD,
              }}
            >
              Then build the agents.
            </span>
          </div>
        </div>

        {/* Bottom-right: >_ + URL */}
        <div
          style={{
            position: 'absolute',
            right: 64,
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: GOLD,
              fontWeight: 800,
              display: 'flex',
            }}
          >
            {'>_'}
          </div>
          <div
            style={{
              fontSize: 15,
              color: 'rgba(255,255,255,0.5)',
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
    {
      width: 1584,
      height: 396,
    }
  )
}
