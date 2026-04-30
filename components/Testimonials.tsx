'use client'

import { motion } from 'framer-motion'

const GOLD = '#E2B97F'

interface Testimonial {
  quote: string
  attribution: string
}

/**
 * TESTIMONIALS
 *
 * Format guide:
 *   - quote:        A specific moment, not generic praise.
 *                   ✅ "Davit forced us to kill three automations we were about to ship."
 *                   ❌ "Davit was amazing to work with."
 *   - attribution:  At least 2 dimensions of detail (role + stage/size).
 *                   ✅ "VP Engineering, Series B SaaS, ~$15M ARR"
 *                   ❌ "VP Engineering"
 *
 * The section auto-hides if this array is empty.
 */
const TESTIMONIALS: Testimonial[] = [
  // Populate when real quotes are gathered. Example structure below — replace, don't ship.
  // {
  //   quote: 'Davit forced us to kill three automations we were about to ship. Months of saved engineering.',
  //   attribution: 'VP Engineering, Series B SaaS, ~$15M ARR',
  // },
]

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  return (
    <section
      id="testimonials"
      className="relative px-6"
      style={{ background: '#0a0a0f', paddingTop: 80, paddingBottom: 60 }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="animate-pulse-steady"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: GOLD,
                display: 'inline-block',
                boxShadow: `0 0 8px ${GOLD}99`,
              }}
            />
            <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: GOLD }}>
              FROM PEOPLE I&apos;VE WORKED WITH
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${GOLD}66, transparent)` }}
            />
          </div>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-lg flex flex-col"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: 28,
                position: 'relative',
              }}
            >
              {/* Open-quote glyph */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 18,
                  fontSize: 56,
                  lineHeight: 1,
                  color: GOLD,
                  opacity: 0.15,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                &ldquo;
              </span>

              <p
                className="mb-6 relative"
                style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.7,
                  zIndex: 1,
                }}
              >
                {t.quote}
              </p>

              <div
                style={{
                  paddingTop: 14,
                  borderTop: `1px solid ${GOLD}22`,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: GOLD,
                    opacity: 0.85,
                    letterSpacing: '0.06em',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  — {t.attribution}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
