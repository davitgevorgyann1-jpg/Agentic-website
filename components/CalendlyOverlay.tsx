'use client'

import { useEffect } from 'react'
import { closeCalendlyOverlay } from '@/lib/calendly'

// Direct DOM mutation for hover — avoids React re-renders that would reset
// display/transform values set by openCalendly / closeCalendlyOverlay
function onCloseEnter(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = 'rgba(0,0,0,0.08)'
  e.currentTarget.style.color      = 'rgba(0,0,0,0.7)'
}
function onCloseLeave(e: React.MouseEvent<HTMLButtonElement>) {
  e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
  e.currentTarget.style.color      = 'rgba(0,0,0,0.35)'
}

export default function CalendlyOverlay() {
  useEffect(() => {
    // Close when Calendly fires its postMessage events
    const onMessage = (e: MessageEvent) => {
      if (
        e.data?.event === 'calendly.event_scheduled' ||
        e.data?.event === 'calendly.close_page'
      ) {
        closeCalendlyOverlay()
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <>
      {/* ── Blurred backdrop (click anywhere to close) ───────── */}
      <div
        id="calendly-backdrop"
        onClick={closeCalendlyOverlay}
        style={{
          position:       'fixed',
          inset:          0,
          zIndex:         9997,
          background:     'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display:        'none',
          opacity:        0,
          pointerEvents:  'none',
          transition:     'opacity 0.35s ease',
          cursor:         'pointer',
        }}
      />

      {/* ── Slide-in panel from right ─────────────────────────── */}
      <div
        id="calendly-panel"
        style={{
          position:      'fixed',
          top:           0,
          right:         0,
          bottom:        0,
          zIndex:        9998,
          background:    '#ffffff',
          borderLeft:    '1px solid rgba(0,0,0,0.08)',
          boxShadow:     '-12px 0 48px rgba(0,0,0,0.18)',
          display:       'none',         // toggled by openCalendly()
          flexDirection: 'column',
          transform:     'translateX(100%)',
          transition:    'transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow:      'hidden',
        }}
      >

        {/* ── Header ─────────────────────────────────────────── */}
        <div
          style={{
            padding:      '28px 28px 22px',
            borderBottom: '3px solid #E2B97F',
            flexShrink:   0,
            position:     'relative',
            background:   '#ffffff',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeCalendlyOverlay}
            onMouseEnter={onCloseEnter}
            onMouseLeave={onCloseLeave}
            aria-label="Close booking panel"
            style={{
              position:       'absolute',
              top:            20,
              right:          20,
              width:          34,
              height:         34,
              borderRadius:   '50%',
              background:     'rgba(0,0,0,0.04)',
              border:         'none',
              cursor:         'pointer',
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          'rgba(0,0,0,0.35)',
              fontSize:       20,
              lineHeight:     '1',
              fontFamily:     'system-ui, sans-serif',
              transition:     'background 0.15s ease, color 0.15s ease',
            }}
          >
            ×
          </button>

          {/* Status pill */}
          <div
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                width:        6,
                height:       6,
                borderRadius: '50%',
                background:   '#E2B97F',
                display:      'inline-block',
                flexShrink:   0,
              }}
            />
            <span
              style={{
                fontSize:      10,
                color:         'rgba(0,0,0,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontFamily:    'var(--font-mono)',
              }}
            >
              Free · 30 min · Google Meet
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize:     20,
              fontWeight:   700,
              color:        '#111111',
              margin:       '0 0 5px',
              fontFamily:   'var(--font-mono)',
              paddingRight: 44, // clearance for close button
              lineHeight:   1.3,
            }}
          >
            Book a Discovery Call
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontSize:   13,
              color:      'rgba(0,0,0,0.58)',
              margin:     '0 0 18px',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5,
            }}
          >
            Strategy-led AI transformation session
          </p>

          {/* Meta badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['30 minutes', 'Google Meet', 'No credit card'].map(label => (
              <span
                key={label}
                style={{
                  fontSize:      11,
                  color:         'rgba(0,0,0,0.6)',
                  border:        '1px solid rgba(0,0,0,0.18)',
                  borderRadius:  4,
                  padding:       '3px 9px',
                  fontFamily:    'var(--font-mono)',
                  letterSpacing: '0.03em',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Calendly inline iframe ──────────────────────────── */}
        {/* src is set lazily by openCalendly() — nothing loads until panel opens */}
        <div style={{ flex: 1, background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
          <iframe
            id="calendly-iframe"
            src=""
            title="Book a discovery call"
            style={{
              flex:    1,
              width:   '100%',
              border:  'none',
              display: 'block',
            }}
          />
        </div>

      </div>
    </>
  )
}
