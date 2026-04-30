'use client'

import { motion } from 'framer-motion'
import { openCalendly } from '@/lib/calendly'

const EMAIL = 'davit.gevorgyann1@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/dav-gevorgyan/'

export default function Footer() {
  return (
    <section
      id="cta"
      style={{
        background: '#0a0a0f',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ─── Concentric rings background ──────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <svg width="900" height="900" viewBox="0 0 900 900" fill="none">
          <circle cx="450" cy="450" r="110" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="450" cy="450" r="210" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="450" cy="450" r="320" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle cx="450" cy="450" r="430" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
        </svg>
      </div>

      {/* ─── Contact Area ──────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '0 24px',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(20px, 5vw, 28px)',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: 12,
            textAlign: 'center',
          }}
        >
          Ready to align your AI with your strategy?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: 'clamp(13px, 3vw, 16px)',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          Book a free 30-minute discovery call.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: 24 }}
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); openCalendly() }}
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#000000',
              fontWeight: 600,
              fontSize: 14,
              padding: '14px 32px',
              borderRadius: 6,
              textDecoration: 'none',
              transition: 'background 200ms ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e5e5e5')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
          >
            Book a Discovery Call
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
          }}
        >
          <a
            href={`mailto:${EMAIL}`}
            style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 200ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            {EMAIL}
          </a>
          <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 200ms' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            LinkedIn
          </a>
        </motion.div>
      </div>

      {/* ─── Footer ────────────────────────────────────────────── */}
      <footer
        style={{
          height: 56,
          borderTop: '0.5px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'rgba(255,255,255,0.25)',
          }}
        >
          <span>&copy; 2026 Davit Gevorgyan</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <a
              href={`mailto:${EMAIL}`}
              style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
            >
              {EMAIL}
            </a>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
