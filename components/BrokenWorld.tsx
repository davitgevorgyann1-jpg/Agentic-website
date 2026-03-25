'use client'

import { motion } from 'framer-motion'
import { brokenAgents } from '@/data/agents'
import AgentCard from './agents/AgentCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function BrokenWorld() {
  return (
    <section
      id="broken"
      className="relative py-28 overflow-hidden noise-overlay"
      style={{
        background:
          'linear-gradient(180deg, #f8f9fc 0%, #f0f3f8 40%, #edf0f7 100%)',
      }}
    >
      {/* Subtle cool scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(148,163,184,0.025) 3px, rgba(148,163,184,0.025) 4px)',
          opacity: 0.7,
        }}
      />

      {/* Faint diagonal stripes — gives a slightly "off" feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(100,116,139,0.015) 40px, rgba(100,116,139,0.015) 41px)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          {/* Tag pill */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200/70">
              <span
                className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-flicker"
                style={{ animationDelay: '0.3s' }}
              />
              The Current State
            </span>
          </motion.div>

          {/* H2 */}
          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            Meet the agents companies are building today.
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-lg text-slate-500 max-w-xl leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            They&rsquo;re fast. They&rsquo;re efficient.{' '}
            <em className="text-slate-600 not-italic font-medium">
              They have no idea what they&rsquo;re doing.
            </em>
          </motion.p>

          {/* Separator line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="w-16 h-px bg-amber-300 origin-left"
          />
        </div>

        {/* Agent cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {brokenAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>

        {/* Bottom section note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-slate-400 max-w-md leading-relaxed font-body">
            Click any agent to hear what it would say if it could speak honestly about its situation.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-8 h-px bg-slate-200" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-300">
              <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="w-8 h-px bg-slate-200" />
          </div>
          <p className="text-sm text-slate-400 font-medium">There is another way.</p>
        </motion.div>
      </div>
    </section>
  )
}
