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
 * Satori gotchas we've already hit and codified:
 *   - Do not reference unavailable fonts (e.g. monospace). Satori only
 *     ships with Inter by default; an unknown font silently produces 0 bytes.
 *   - Do not put `display: flex` on a <span> that directly contains text.
 *     Use a <div> for flex containers; let leaf text nodes stay simple.
 *   - For right-aligning column children, use `alignItems: 'flex-end'` on
 *     the parent — not `display: flex` on each child.
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
        {/* Subtle grid overlay matching the website's global pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Top-left: tag */}
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
            }}
          >
            Strategy-Led AI Transformation
          </div>
        </div>

        {/* Center-right: two-line punchline.
            justifyContent on the row pushes the block right of the avatar zone;
            alignItems flex-end on the inner column right-aligns the two lines. */}
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
              alignItems: 'flex-end',
            }}
          >
            <div>From products to agents.</div>
            <div style={{ color: GOLD }}>Strategy is the constant.</div>
          </div>
        </div>

        {/* Bottom-right: >_ mark + URL */}
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
