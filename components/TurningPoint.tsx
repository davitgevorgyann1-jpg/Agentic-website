'use client'

import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const problems = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#f59e0b" strokeWidth="1.5"/>
        <path d="M10 6v4M10 13h.01" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    text: 'Agents built to demonstrate AI capability, not solve actual problems',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 14l4-4 3 3 5-6" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="2" width="16" height="16" rx="3" stroke="#f59e0b" strokeWidth="1.5"/>
      </svg>
    ),
    text: 'No feedback loops — actions taken with no mechanism to learn if they worked',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2v4M10 14v4M2 10h4M14 10h4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="3" stroke="#f59e0b" strokeWidth="1.5"/>
      </svg>
    ),
    text: 'Organizational memory loss — each agent is an island with no shared context',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M7 9l3 3 3-3" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 5h14M3 10h14M3 15h8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    text: 'Strategy-execution gap: leadership has a direction; agents have no idea what it is',
  },
]

const shifts = [
  { from: 'Automate everything', to: 'Automate what matters' },
  { from: 'Deploy fast', to: 'Deploy right' },
  { from: 'More agents', to: 'Better connected agents' },
  { from: 'Task completion', to: 'Outcome ownership' },
]

export default function TurningPoint() {
  return (
    <section
      id="turning-point"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #edf0f7 0%, #f0f5ff 50%, #eef3fc 100%)',
      }}
    >
      {/* Light radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(219,234,254,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-20">
          <motion.span
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200/70"
          >
            The Problem
          </motion.span>

          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            The agents aren&rsquo;t the problem.{' '}
            <em className="italic text-blue-600">The architecture is.</em>
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-lg text-slate-500 max-w-xl leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Companies aren&rsquo;t failing at AI because they lack technology. They&rsquo;re failing because they deploy capability without infrastructure.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: What goes wrong */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card-muted rounded-2xl p-7"
          >
            <h3
              className="font-display text-xl font-semibold text-slate-700 mb-6"
              style={{ fontFamily: 'var(--font-newsreader)' }}
            >
              What goes wrong
            </h3>
            <ul className="flex flex-col gap-5">
              {problems.map((p, i) => (
                <li key={i} className="flex gap-3.5 items-start">
                  <span className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center">
                    {p.icon}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed font-body">{p.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: The shift */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-4"
          >
            <h3
              className="font-display text-xl font-semibold text-slate-700 mb-2"
              style={{ fontFamily: 'var(--font-newsreader)' }}
            >
              The shift required
            </h3>
            {shifts.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                className="glass-card rounded-xl px-5 py-4 flex items-center gap-4"
              >
                <div className="flex-1 text-sm text-slate-500 line-through decoration-slate-300 font-body">
                  {s.from}
                </div>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 text-blue-400">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="flex-1 text-sm font-medium text-slate-800 text-right font-body">
                  {s.to}
                </div>
              </motion.div>
            ))}

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-4 border-l-4 border-blue-300 pl-5 py-1"
            >
              <p className="text-base text-slate-600 italic leading-relaxed font-display" style={{ fontFamily: 'var(--font-newsreader)' }}>
                &ldquo;The companies winning with AI aren&rsquo;t the ones with the most agents. They&rsquo;re the ones whose agents know what winning looks like.&rdquo;
              </p>
              <cite className="block mt-2 text-sm text-slate-400 font-body not-italic">— Davit Gevorgyan</cite>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
