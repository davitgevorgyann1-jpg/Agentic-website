'use client'

import { useState } from 'react'

// Order MUST match the section order in app/page.tsx.
// If you add or remove a section there, also update SECTION_LABELS in FullpageScroll.tsx.
const MENU_SECTIONS = [
  { label: 'Home',           id: 'hero' },
  { label: 'The Problem',    id: 'broken' },
  { label: 'The Shift',      id: 'turning-point' },
  { label: 'Strategy',       id: 'strategy' },
  { label: 'Operations',     id: 'operations' },
  { label: 'Your Agent',     id: 'agents' },
  { label: 'Your Architect', id: 'architect' },
  { label: 'How I Work',     id: 'approach' },
  { label: 'Engagement',     id: 'engagement' },
  { label: 'Assessment',     id: 'assessment' },
  { label: 'Contact',        id: 'cta' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = (id: string) => {
    window.dispatchEvent(new CustomEvent('fp:goto', { detail: { id } }))
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className="site-header absolute top-0 left-0 right-0 z-50"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-sm font-bold text-white hover:text-white/80 transition-colors tracking-wide">
            Davit Gevorgyan
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Open navigation menu"
            style={{
              background: 'none',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 4,
              padding: '7px 10px',
              cursor: 'pointer',
              flexDirection: 'column',
              gap: 4,
              alignItems: 'center',
            }}
          >
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#ffffff', borderRadius: 1 }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#ffffff', borderRadius: 1 }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#ffffff', borderRadius: 1 }} />
          </button>
        </div>
      </header>

      {/* Full-screen nav overlay — mobile only, rendered via CSS display control */}
      {menuOpen && (
        <div
          className="nav-menu-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(10,10,15,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            flexDirection: 'column',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {/* Header row */}
          <div
            style={{
              height: 64,
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '0.5px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              Navigation
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 4,
                width: 32,
                height: 32,
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 18,
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
          </div>

          {/* Section links */}
          <nav
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 24px',
              overflowY: 'auto',
            }}
          >
            {MENU_SECTIONS.map((section, i) => (
              <button
                key={section.id}
                onClick={() => navigate(section.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: '0.5px solid rgba(255,255,255,0.06)',
                  padding: '18px 0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 17,
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.2)',
                    width: 20,
                    textAlign: 'right',
                    flexShrink: 0,
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
