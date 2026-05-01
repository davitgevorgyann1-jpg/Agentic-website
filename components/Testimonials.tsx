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
 * Layout: 2 / 2 / 1. First four testimonials render as a 2x2 grid; the
 * fifth renders centered alone in a third row, same size as the others.
 *
 * Implementation: a 4-column grid with each card spanning 2 columns.
 * Cards 1-4 fall into row 1 (cols 1-2 and 3-4), row 2 (cols 1-2 and 3-4).
 * Card 5 uses `col-start-2 col-span-2`, occupying cols 2-3 — centered
 * within the row.
 *
 * Format guide:
 *   - quote:        A specific moment, not generic praise.
 *   - attribution:  Role + stage/size at minimum (2 dimensions of detail).
 *
 * Section auto-hides if the array is empty.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'I came in expecting a roadmap. Davit gave me a list of things we should stop building. That list saved us months of engineering work that would not have moved any of our metrics.',
    attribution: 'Founder, B2B SaaS, Series A',
  },
  {
    quote: 'Our CRM was slowing the team down more than it helped. Davit overhauled how we used it and automated the busy work. Manual errors dropped by about 40% in two months.',
    attribution: 'Head of Operations, mid-market SaaS',
  },
  {
    quote: 'He designed our reward and incentive architecture from the ground up. What I valued most was the part nobody asks for: the guardrails. He told us which behaviors we should not be rewarding before we wrote a line of code.',
    attribution: 'Product Lead, social platform',
  },
  {
    quote: 'Three weeks in, Davit had changed how we thought about our margin problem. After his redesign, transaction fees dropped roughly 20% and the profit margin moved for the first time in a year.',
    attribution: 'Founder, crypto payments startup',
  },
  {
    quote: 'Davit walked into a half-built AI agent and asked what business outcome it tied to. Nobody had a clean answer. We killed it that week and rebuilt from the strategy down. The replacement now flags every roadmap proposal against our OKRs.',
    attribution: 'Head of Product, growth-stage SaaS',
  },
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

        {/* Testimonials: 4-column grid where each card spans 2 cols.
            Cards 1-4 fill rows 1-2 (2 per row). Card 5 is centered in row 3
            via col-start-2 col-span-2 (occupies cols 2-3, leaving 1 and 4 empty). */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {TESTIMONIALS.map((t, i) => {
            const isFifth = i === 4
            const colSpan = isFifth ? 'md:col-span-2 md:col-start-2' : 'md:col-span-2'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className={`rounded-lg flex flex-col ${colSpan}`}
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
                    / {t.attribution}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
