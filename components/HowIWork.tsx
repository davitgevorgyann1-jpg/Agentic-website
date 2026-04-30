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
    subtitle: 'Find the strategy you actually have — not the one in the deck.',
    body: 'Most leadership teams have 30 "priorities" and treat all of them as equally important. I read your strategy docs, OKRs, and board decks — then I interview your leadership one-on-one and find out what they actually believe. The gap between those two is where the real work lives.',
    outcome: 'Three to five priorities. Stack-ranked. Committed to in writing.',
    time: '1–2 weeks',
  },
  {
    number: '02',
    title: 'Alignment Design',
    subtitle: 'Most companies have strategy. Most have execution. Almost none have the layer that connects them.',
    body: 'With your priorities locked in, I design what your operations should look like to enforce them — which strategic agents you need, which operational agents you need. If you already have automations running, those get tested against the strategy too — most fail. The result, either way: a blueprint where every piece traces back to a priority.',
    outcome: 'A blueprint: what should exist, what should be kept, what should be killed. Plus the system that prevents future drift.',
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

// Baseline opacities for the trail dots — fades down toward the next phase
const TRAIL_DOTS = [0.7, 0.55, 0.45, 0.35, 0.28, 0.22, 0.16, 0.1]

function PhaseRow({ phase, index, isLast }: { phase: Phase; index: number; isLast: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-stretch gap-6"
    >
      {/* Left column: numbered circle + connecting dot trail */}
      <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 44 }}>
        {/* Numbered circle */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#0a0a0f',
            border: `1.5px solid ${GOLD}`,
            boxShadow: `0 0 14px ${GOLD}33`,
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: GOLD,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
            }}
          >
            {phase.number}
          </span>
        </div>

        {/* Vertical dot trail to next phase — distributes evenly across available column height */}
        {!isLast && (
          <div
            className="flex flex-col items-center"
            style={{
              flex: 1,
              paddingTop: 10,
              paddingBottom: 10,
              justifyContent: 'space-evenly',
            }}
          >
            {TRAIL_DOTS.map((baselineOpacity, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [baselineOpacity * 0.6, baselineOpacity, baselineOpacity * 0.6],
                }}
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
      <div className="flex-1 pb-2" style={{ paddingTop: 4 }}>
        {/* Title row: name + duration inline */}
        <div className="flex items-baseline gap-3 flex-wrap mb-2">
          <span
            style={{
              fontSize: 18,
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
              fontSize: 11,
              color: 'rgba(255,255,255,0.4)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
            }}
          >
            {phase.time}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="italic mb-3"
          style={{ fontSize: 14, color: GOLD, opacity: 0.8, lineHeight: 1.5 }}
        >
          {phase.subtitle}
        </p>

        {/* Body */}
        <p
          className="mb-3"
          style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}
        >
          {phase.body}
        </p>

        {/* Outcome */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.55 }}>
          <span
            className="uppercase"
            style={{
              fontSize: 10,
              color: GOLD,
              opacity: 0.85,
              letterSpacing: '0.2em',
              fontFamily: 'var(--font-mono)',
              marginRight: 10,
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
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
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
              style={{ background: `linear-gradient(to right, ${GOLD}66, transparent)` }}
            />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Top down. Always.
          </h2>
          <p
            className="text-[18px] max-w-[820px]"
            style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}
          >
            Most consultants start with what to automate. I start with what your company is actually trying to do.
          </p>
        </motion.div>

        {/* Phases — small inter-row gap so the dot trails feel continuous */}
        <div className="flex flex-col" style={{ gap: 4 }}>
          {PHASES.map((phase, i) => (
            <PhaseRow
              key={phase.number}
              phase={phase}
              index={i}
              isLast={i === PHASES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
