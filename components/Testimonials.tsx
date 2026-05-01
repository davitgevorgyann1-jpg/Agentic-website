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
 * Layout: the FIRST testimonial in the array is rendered as a featured /
 * marquee card at the top (full width, larger type, more presence). The
 * remaining testimonials render as a 2-column grid below. Pick the most
 * impactful quote for index 0.
 *
 * Format guide:
 *   - quote:        A specific moment, not generic praise.
 *   - attribution:  Role + stage/size at minimum (2 dimensions of detail).
 *
 * Section auto-hides if the array is empty.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    // Featured (rendered as marquee card)
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
    quote: 'Most strategy consultants do not write code. Davit does. When my engineers had questions, he sat with them. The strategy survived contact with implementation because of that.',
    attribution: 'CTO, enterprise platform',
  },
]

export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null

  const [featured, ...rest] = TESTIMONIALS

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

        {/* Featured testimonial — larger, marquee treatment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="rounded-lg flex flex-col mx-auto mt-8"
          style={{
            maxWidth: 820,
            background: 'rgba(226,185,127,0.04)',
            border: '1px solid rgba(226,185,127,0.22)',
            padding: 36,
            position: 'relative',
            boxShadow: `0 0 40px ${GOLD}0d`,
          }}
        >
          {/* Larger open-quote glyph for the featured card */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 14,
              left: 22,
              fontSize: 76,
              lineHeight: 1,
              color: GOLD,
              opacity: 0.18,
              fontFamily: 'var(--font-mono)',
            }}
          >
            &ldquo;
          </span>

          <p
            className="mb-6 relative"
            style={{
              fontSize: 18,
              color: 'rgba(255,255,255,0.92)',
              lineHeight: 1.65,
              zIndex: 1,
              fontStyle: 'italic',
            }}
          >
            {featured.quote}
          </p>

          <div
            style={{
              paddingTop: 14,
              borderTop: `1px solid ${GOLD}33`,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: GOLD,
                opacity: 0.9,
                letterSpacing: '0.06em',
                fontFamily: 'var(--font-mono)',
              }}
            >
              / {featured.attribution}
            </span>
          </div>
        </motion.div>

        {/* Grid of remaining testimonials — 2 columns on desktop */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {rest.map((t, i) => (
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
                    / {t.attribution}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
