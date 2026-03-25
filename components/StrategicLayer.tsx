'use client'

import { motion } from 'framer-motion'
import { strategicAgents } from '@/data/agents'
import AgentCard from './agents/AgentCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const capabilities = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.8 5.4H17l-4.8 3.5 1.8 5.5L9 13.1l-5 3.3 1.8-5.5L1 7.4h6.2L9 2z" stroke="#3b82f6" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Strategy translation',
    description: 'Leadership priorities become operating parameters that every agent inherits automatically.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="#3b82f6" strokeWidth="1.4"/>
        <path d="M6 9l2 2 4-4" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Unbiased pattern recognition',
    description: 'Surface what the data actually says, not what confirms existing beliefs.',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="#3b82f6" strokeWidth="1.4"/>
        <path d="M6 9h6M9 6v6" stroke="#3b82f6" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Decision architecture',
    description: 'Structure choices so the humans making them have the right container for good judgment.',
  },
]

export default function StrategicLayer() {
  return (
    <section
      id="strategy"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #edf5f0 0%, #eef3fc 40%, #e8f0fe 100%)',
      }}
    >
      {/* Radial blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(219,234,254,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <motion.span
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200/70"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-blue-500"
              style={{ animation: 'pulse-glow 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(59,130,246,0.7)' }}
            />
            Layer 2 — Strategy
          </motion.span>

          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            Where AI systems connect to{' '}
            <em className="italic text-blue-600">what the business is actually trying to do.</em>
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-lg text-slate-500 max-w-xl leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            The strategic layer is the infrastructure that makes execution meaningful. It doesn&rsquo;t replace leadership judgment. It gives that judgment reach.
          </motion.p>
        </div>

        {/* Capability tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card-blue rounded-xl p-6 flex flex-col gap-3"
            >
              <span className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
                {cap.icon}
              </span>
              <h4 className="font-semibold text-slate-800 text-base">{cap.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-body">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {strategicAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
