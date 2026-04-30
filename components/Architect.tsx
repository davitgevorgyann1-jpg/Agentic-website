'use client'

import { motion } from 'framer-motion'
import { openCalendly } from '@/lib/calendly'

const GOLD = '#E2B97F'
const LINKEDIN = 'https://www.linkedin.com/in/dav-gevorgyan/'

const HIGHLIGHTS = [
  '10+ years product management',
  'B2B SaaS specialization',
  'Strategy + Implementation',
]

export default function Architect() {
  return (
    <section id="architect" className="relative py-24 px-6" style={{ background: '#0a0a0f' }}>
      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      />

      {/* Faint horizontal accent lines */}
      {[14, 34, 62, 84].map((top, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${top}%`,
            height: 1,
            background: 'rgba(226,185,127,0.03)',
          }}
        />
      ))}

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: GOLD,
              display: 'inline-block',
            }}
          />
          <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: GOLD }}>
            THE ARCHITECT
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, rgba(226,185,127,0.3), transparent)` }}
          />
        </motion.div>

        {/* Name + title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-[clamp(24px,5vw,32px)] font-normal text-white mb-2">Davit Gevorgyan</h2>
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Strategy-Led AI Transformation
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 mb-10"
        >
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            I spent{' '}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>10 years</span>
            {' '}as a product manager watching companies write brilliant strategies in January and forget them
            by March. OKRs became checkbox exercises. KPIs lived in dashboards nobody checked. And when AI
            entered the picture, companies started automating processes without ever asking whether those
            processes served their goals.
          </p>
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Two years ago, I quit to solve this problem. The emergence of{' '}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>AI agents</span>
            {' '}made the solution possible: not just consulting on{' '}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>strategy</span>
            , but building intelligent systems that enforce it.
          </p>
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            I work across all{' '}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>three layers</span>
            : I audit your{' '}
            <span style={{ color: '#ffffff', fontWeight: 700 }}>strategy</span>
            , map your operations, design the alignment layer that connects them, and then build the actual
            agents that make it all work. I don&apos;t hand you a PDF and disappear. I don&apos;t automate
            blindly and hope for the best.{' '}
            <span style={{ color: 'rgba(255,255,255,0.85)' }}>
              I start with why, build what matters, and stay to make sure it keeps working.
            </span>
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {HIGHLIGHTS.map((h) => (
            <span
              key={h}
              className="text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border"
              style={{
                color: 'rgba(255,255,255,0.5)',
                borderColor: 'rgba(226,185,127,0.2)',
              }}
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTA + LinkedIn */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-5"
        >
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); openCalendly() }}
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-medium px-6 py-3 rounded hover:bg-gray-200 transition-colors"
          >
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors"
            style={{
              fontSize: 12,
              color: GOLD,
              opacity: 0.85,
              fontFamily: 'var(--font-mono)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85' }}
          >
            {/* LinkedIn glyph */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43c-1.14 0-2.07-.93-2.07-2.07 0-1.14.93-2.07 2.07-2.07 1.14 0 2.07.93 2.07 2.07 0 1.14-.93 2.07-2.07 2.07zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            Full background on LinkedIn
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 11L11 3M11 3H5M11 3V9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
