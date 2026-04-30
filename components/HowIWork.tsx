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
    body: 'Strategy docs. OKRs. Board decks. Then interviews where leadership says what they actually believe — usually not what is written down.',
    outcome: 'A sharper version of your real priorities.',
    time: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Alignment Design',
    subtitle: 'Map every process, every dashboard, every agent against the strategy.',
    body: 'Every existing automation, report, and decision-making layer gets tested against Phase 01. Most fail. We identify what to kill, keep, and what should exist but does not.',
    outcome: 'A map of misalignments — and the design that fixes them.',
    time: '2–3 weeks',
  },
  {
    number: '03',
    title: 'Agent Build',
    subtitle: 'Build the agents the strategy actually needs.',
    body: 'Strategic intelligence agents. Alignment gatekeepers. Operational agents that know exactly why they exist. Designed top-down, not bottom-up from "cool AI things."',
    outcome: 'Working AI agent systems, deployed with your stack.',
    time: '4–6 weeks',
  },
  {
    number: '04',
    title: 'Embed & Iterate',
    subtitle: 'I stay until it actually works.',
    body: 'I do not hand it over and disappear. I stay embedded for 90+ days post-deployment to tune the agents as your strategy evolves.',
    outcome: 'A system that keeps working when your strategy changes.',
    time: '90+ days',
  },
]

function PhaseRow({ phase, index }: { phase: Phase; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-start gap-4"
    >
      {/* Numbered circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#0a0a0f',
          border: `1.5px solid ${GOLD}`,
          boxShadow: `0 0 12px ${GOLD}33`,
          marginTop: 2,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: GOLD,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
          }}
        >
          {phase.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Title row: name + time */}
        <div className="flex items-baseline gap-3 flex-wrap mb-1">
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {phase.title}
          </span>
          <span
            className="uppercase"
            style={{
              fontSize: 10,
              color: 'rgba(255,255,255,0.35)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
            }}
          >
            {phase.time}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="italic mb-2"
          style={{ fontSize: 12, color: GOLD, opacity: 0.75, lineHeight: 1.5 }}
        >
          {phase.subtitle}
        </p>

        {/* Body */}
        <p
          className="mb-2"
          style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}
        >
          {phase.body}
        </p>

        {/* Outcome */}
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
          <span
            className="uppercase"
            style={{
              fontSize: 9,
              color: GOLD,
              opacity: 0.85,
              letterSpacing: '0.18em',
              fontFamily: 'var(--font-mono)',
              marginRight: 8,
            }}
          >
            OUTCOME
          </span>
          {phase.outcome}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowIWork() {
  return (
    <section
      id="approach"
      className="relative px-6"
      style={{
        background: '#0a0a0f',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="max-w-[1100px] mx-auto w-full"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
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
            <span className="text-[11px] uppercase tracking-[0.18em]" style={{ color: GOLD }}>
              THE APPROACH
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${GOLD}66, transparent)` }}
            />
          </div>
          <h2 className="text-[clamp(26px,4vw,38px)] font-bold text-white mb-2">
            Top down. Always.
          </h2>
          <p
            className="text-[14px] max-w-[760px]"
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}
          >
            Most consultants start with what to automate. I start with what your company is actually trying to do.
          </p>
        </motion.div>

        {/* Phases — flex distribute */}
        <div
          className="flex flex-col gap-6"
          style={{ flex: '0 1 auto' }}
        >
          {PHASES.map((phase, i) => (
            <PhaseRow key={phase.number} phase={phase} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
