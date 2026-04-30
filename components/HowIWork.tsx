'use client'

import { motion } from 'framer-motion'

const GOLD = '#E2B97F'

interface Phase {
  number: string
  title: string
  subtitle: string
  body: string
  outcome: string
  time: string
}

const PHASES: Phase[] = [
  {
    number: '01',
    title: 'Strategic Audit',
    subtitle: 'Read what you said. Find out what you actually mean.',
    body: 'Strategy docs, OKRs, board decks. Then interviews with leadership where they say what they actually believe — which is rarely what is written down. The gap between the two is where most of the work happens.',
    outcome: 'A sharper, shorter version of your actual strategic priorities. Usually fewer than what is currently documented.',
    time: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Alignment Design',
    subtitle: 'Map every process, every dashboard, every agent against the strategy.',
    body: 'Every existing automation, report, and decision-making layer gets tested against the priorities from Phase 01. Most fail. We identify what should be killed, what should be kept, and what should exist but does not.',
    outcome: 'A map of misalignments — and the design for the alignment layer that fixes them.',
    time: '2–3 weeks',
  },
  {
    number: '03',
    title: 'Agent Build',
    subtitle: 'Build the agents the strategy actually needs.',
    body: 'Now — and only now — do we build. Strategic intelligence agents. Alignment gatekeepers. Operational agents that know exactly why they exist. Each one designed top-down from the strategic priorities, not bottom-up from "what is a cool AI thing we could build?"',
    outcome: 'Working AI agent systems, deployed and integrated with your existing tools.',
    time: '4–6 weeks',
  },
  {
    number: '04',
    title: 'Embed & Iterate',
    subtitle: 'I stay until it actually works.',
    body: 'I do not hand over a system and disappear. I stay embedded for at least 90 days post-deployment to tune the agents as your strategy evolves and your team learns to use them.',
    outcome: 'A system that keeps working when your strategy changes — not one that decays the moment I leave.',
    time: '90+ days post-deployment',
  },
]

function PhaseRow({ phase, index, isLast }: { phase: Phase; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Left column: numbered circle + connecting trail */}
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 56 }}>
        {/* Numbered circle */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: '#0a0a0f',
            border: `1.5px solid ${GOLD}`,
            boxShadow: `0 0 16px ${GOLD}33`,
            zIndex: 2,
            flexShrink: 0,
          }}
        >
          <span
            className="font-bold"
            style={{
              fontSize: 14,
              color: GOLD,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            {phase.number}
          </span>
        </div>

        {/* Vertical dot trail to next phase */}
        {!isLast && (
          <div
            className="flex flex-col items-center"
            style={{ flex: 1, paddingTop: 12, paddingBottom: 12, gap: 6 }}
          >
            {[0.7, 0.5, 0.35, 0.25, 0.15, 0.1].map((opacity, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [opacity * 0.6, opacity, opacity * 0.6] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: '50%',
                  background: GOLD,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right column: phase content */}
      <div className="flex-1 pb-12">
        <h3
          className="font-bold text-white mb-2"
          style={{ fontSize: 18, fontFamily: 'var(--font-mono)' }}
        >
          {phase.title}
        </h3>
        <p
          className="italic mb-4"
          style={{ fontSize: 14, color: GOLD, opacity: 0.75, lineHeight: 1.5 }}
        >
          {phase.subtitle}
        </p>
        <p
          className="mb-5"
          style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}
        >
          {phase.body}
        </p>

        {/* Outcome + Time */}
        <div
          className="flex flex-col gap-2 pl-4"
          style={{ borderLeft: `1px solid ${GOLD}33` }}
        >
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className="uppercase"
              style={{
                fontSize: 9,
                color: GOLD,
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-mono)',
                flexShrink: 0,
              }}
            >
              OUTCOME
            </span>
            <span
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}
            >
              {phase.outcome}
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <span
              className="uppercase"
              style={{
                fontSize: 9,
                color: GOLD,
                letterSpacing: '0.18em',
                fontFamily: 'var(--font-mono)',
                flexShrink: 0,
              }}
            >
              TIME
            </span>
            <span
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)' }}
            >
              {phase.time}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function HowIWork() {
  return (
    <section
      id="approach"
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
              THE APPROACH
            </span>
            <div
              className="flex-1 h-px"
              style={{
                background: `linear-gradient(to right, ${GOLD}66, transparent)`,
              }}
            />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Top down. Always.
          </h2>
          <p
            className="text-[18px] mb-10 max-w-[800px]"
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
          >
            Most consultants start with what to automate. I start with what your company is actually trying to do.
          </p>
        </motion.div>

        {/* Phases */}
        <div className="flex flex-col">
          {PHASES.map((phase, i) => (
            <PhaseRow
              key={phase.number}
              phase={phase}
              index={i}
              isLast={i === PHASES.length - 1}
            />
          ))}
        </div>

        {/* Section footer divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6"
        >
          <div className="section-divider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span
              style={{
                background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)`,
                height: 1,
              }}
            />
            <span className="whitespace-nowrap">
              STRATEGY → ALIGNMENT → AGENTS → SUSTAIN
            </span>
            <span
              style={{
                background: `linear-gradient(to right, transparent, ${GOLD}55, transparent)`,
                height: 1,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
