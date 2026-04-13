'use client'

import { motion } from 'framer-motion'

const HIGHLIGHTS = [
  '10+ years product management',
  'B2B SaaS specialization',
  'Strategy + Implementation',
]

export default function Architect() {
  return (
    <section id="architect" className="relative py-24 px-6" style={{ background: '#0a0a0f' }}>
      {/* Subtle warm gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(255,255,255,0.02) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
              display: 'inline-block',
            }}
          />
          <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            THE ARCHITECT
          </span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.15), transparent)' }} />
        </motion.div>

        {/* Name + title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-[32px] font-normal text-white mb-2">Davit Gevorgyan</h2>
          <p className="text-[14px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Strategy-Led AI Transformation
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 mb-10"
        >
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            I spent 10 years as a product manager watching companies write brilliant strategies in January and forget them by March. OKRs became checkbox exercises. KPIs lived in dashboards nobody checked. And when AI entered the picture, companies started automating processes without ever asking whether those processes served their goals.
          </p>
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Two years ago, I quit to solve this problem. The emergence of AI agents made the solution possible: not just consulting on strategy, but building intelligent systems that enforce it.
          </p>
          <p className="text-[13px] leading-[1.8]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            I work across all three layers: I audit your strategy, map your operations, design the alignment layer that connects them, and then build the actual agents that make it all work. I don&apos;t hand you a PDF and disappear. I don&apos;t automate blindly and hope for the best. I start with why, build what matters, and stay to make sure it keeps working.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {HIGHLIGHTS.map((h) => (
            <span
              key={h}
              className="text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border"
              style={{
                color: 'rgba(255,255,255,0.5)',
                borderColor: 'rgba(255,255,255,0.15)',
              }}
            >
              {h}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#assessment"
            className="inline-flex items-center gap-2 bg-white text-black text-xs font-medium px-6 py-3 rounded hover:bg-gray-200 transition-colors"
          >
            Book a Discovery Call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
