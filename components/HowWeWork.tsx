'use client'

import { motion } from 'framer-motion'
import { openCalendly } from '@/lib/calendly'

const GOLD = '#E2B97F'

interface FormatCard {
  badge?: string
  title: string
  tagline: string
  body: string
  bullets: string[]
}

const EMBED: FormatCard = {
  badge: 'MOST COMMON',
  title: 'The Embed',
  tagline: 'I become your fractional Head of AI Strategy.',
  body:
    '80 hours a month. Embedded in your team — in your Slack, in your leadership meetings, in your roadmap. I lead the audit, design the alignment layer, and build the agents from inside the company, not from outside it.',
  bullets: [
    'Continuous strategic involvement',
    'Lead the work from inside the team',
    '3-month minimum engagement',
    'Easy to scale up or wind down',
  ],
}

const PROJECT: FormatCard = {
  title: 'The Project',
  tagline: 'Same work. Defined scope. Clean exit.',
  body:
    'A scoped strategic audit and agent build with clear deliverables and a fixed timeline. For when you would rather hand me a brief than a desk.',
  bullets: [
    'Fixed scope and timeline',
    'Strategic audit + agent build',
    'Clear deliverables, defined milestones',
    'Clean entry and exit',
  ],
}

function Card({ card, primary }: { card: FormatCard; primary: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: primary ? 0 : 0.1 }}
      className="relative rounded-lg flex flex-col h-full"
      style={{
        background: primary ? 'rgba(226,185,127,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${primary ? `${GOLD}55` : 'rgba(255,255,255,0.08)'}`,
        padding: 28,
        boxShadow: primary ? `0 0 40px ${GOLD}11` : 'none',
      }}
    >
      {/* Badge */}
      {card.badge && (
        <span
          className="uppercase"
          style={{
            position: 'absolute',
            top: -10,
            left: 24,
            fontSize: 9,
            color: GOLD,
            background: '#0a0a0f',
            border: `1px solid ${GOLD}66`,
            padding: '3px 10px',
            borderRadius: 9999,
            letterSpacing: '0.2em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {card.badge}
        </span>
      )}

      {/* Title */}
      <h3
        className="font-bold text-white mb-2"
        style={{ fontSize: 22, fontFamily: 'var(--font-mono)' }}
      >
        {card.title}
      </h3>

      {/* Tagline */}
      <p
        className="italic mb-5"
        style={{ fontSize: 13, color: GOLD, opacity: 0.8, lineHeight: 1.5 }}
      >
        {card.tagline}
      </p>

      {/* Body */}
      <p
        className="mb-6"
        style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}
      >
        {card.body}
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2.5 mb-2">
        {card.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: primary ? GOLD : 'rgba(255,255,255,0.4)',
                marginTop: 8,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {b}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function HowWeWork() {
  return (
    <section
      id="engagement"
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
              HOW WE WORK TOGETHER
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${GOLD}66, transparent)` }}
            />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Two ways to work with me.
          </h2>
          <p
            className="text-[18px] mb-10 max-w-[800px]"
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
          >
            Same outcomes, different shapes. The choice is about how you want to work, not what you want to spend.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card card={EMBED} primary />
          <Card card={PROJECT} primary={false} />
        </div>

        {/* Pricing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p
            className="italic"
            style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}
          >
            Pricing is comparable across both. We&apos;ll figure out which fits in the discovery call.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              openCalendly()
            }}
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-medium px-6 py-3 rounded hover:bg-gray-200 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
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
