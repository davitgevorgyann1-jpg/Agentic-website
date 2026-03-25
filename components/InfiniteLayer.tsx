'use client'

import { motion } from 'framer-motion'
import { infiniteAgent } from '@/data/agents'
import AgentCard from './agents/AgentCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const prerequisites = [
  'Operational agents with clear signal routing',
  'Feedback loops that capture real outcomes',
  'Institutional memory that survives headcount changes',
  'Strategic context embedded in the execution layer',
  'A team that can interpret what the system surfaces',
]

export default function InfiniteLayer() {
  return (
    <section
      id="infinite"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #e8f0fe 0%, #ede9fe 60%, #f5f3ff 100%)',
      }}
    >
      {/* Dreamy radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(221,214,254,0.35) 0%, transparent 70%)',
        }}
      />

      {/* Breathing outer rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, height: 600 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-violet-200/30"
            style={{
              transform: `scale(${0.4 + i * 0.25})`,
              animation: `breathe ${3 + i}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-16">
          <motion.span
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-violet-700 bg-violet-50 border border-violet-200/70"
          >
            <span className="w-1.5 h-1.5 rounded-full border border-violet-400 bg-transparent" />
            Layer 3 — Infinite
          </motion.span>

          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            What becomes possible{' '}
            <em className="italic text-violet-600">when the foundation is real.</em>
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-lg text-slate-500 max-w-xl leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            The Infinite Agent isn&rsquo;t a product. It&rsquo;s the capability that accrues when everything below it is working.
          </motion.p>
        </div>

        {/* Two column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">
          {/* Left: the agent card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-xs">
              <AgentCard agent={infiniteAgent} index={0} />
            </div>
          </motion.div>

          {/* Right: prerequisites */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <h3
              className="font-display text-xl font-semibold text-slate-700"
              style={{ fontFamily: 'var(--font-newsreader)' }}
            >
              What it requires first
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-body">
              Companies chase this layer first. They end up with something expensive, impressive in demos, and unable to do what they actually needed. The prerequisites:
            </p>
            <ul className="flex flex-col gap-3 mt-1">
              {prerequisites.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm text-slate-600 font-body"
                >
                  <span className="mt-1 w-5 h-5 rounded-full border border-violet-300 flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#7c3aed" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-4 p-5 rounded-xl border border-violet-200/60 bg-violet-50/50"
            >
              <p className="text-sm text-violet-800 leading-relaxed font-body italic">
                &ldquo;Start with the foundation. I&rsquo;ll be here.&rdquo;
              </p>
              <p className="text-xs text-violet-500 mt-2 font-body">— The Infinite Agent</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
