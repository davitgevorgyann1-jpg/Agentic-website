'use client'

import { motion } from 'framer-motion'

// Hardcoded particle positions to avoid hydration mismatch
const PARTICLES = [
  { x: 8,  y: 12, size: 4, delay: 0,    dur: 4.2 },
  { x: 18, y: 68, size: 3, delay: 0.8,  dur: 3.7 },
  { x: 28, y: 35, size: 5, delay: 1.4,  dur: 5.1 },
  { x: 42, y: 80, size: 3, delay: 0.3,  dur: 4.8 },
  { x: 55, y: 22, size: 4, delay: 2.1,  dur: 3.9 },
  { x: 65, y: 55, size: 6, delay: 0.6,  dur: 5.5 },
  { x: 72, y: 88, size: 3, delay: 1.8,  dur: 4.0 },
  { x: 85, y: 40, size: 5, delay: 1.1,  dur: 3.6 },
  { x: 92, y: 72, size: 4, delay: 2.5,  dur: 4.9 },
  { x: 3,  y: 48, size: 3, delay: 0.9,  dur: 5.2 },
  { x: 14, y: 90, size: 5, delay: 1.7,  dur: 3.8 },
  { x: 33, y: 58, size: 4, delay: 0.4,  dur: 4.6 },
  { x: 47, y: 14, size: 3, delay: 2.3,  dur: 5.0 },
  { x: 60, y: 76, size: 6, delay: 0.7,  dur: 4.3 },
  { x: 78, y: 28, size: 3, delay: 1.5,  dur: 3.5 },
  { x: 88, y: 60, size: 4, delay: 2.0,  dur: 4.7 },
  { x: 22, y: 44, size: 5, delay: 0.2,  dur: 5.3 },
  { x: 50, y: 92, size: 3, delay: 1.2,  dur: 4.1 },
  { x: 70, y: 8,  size: 4, delay: 1.9,  dur: 3.4 },
  { x: 95, y: 20, size: 5, delay: 0.5,  dur: 5.4 },
  { x: 37, y: 70, size: 3, delay: 2.6,  dur: 4.4 },
  { x: 58, y: 45, size: 4, delay: 1.3,  dur: 3.3 },
  { x: 82, y: 85, size: 6, delay: 0.1,  dur: 5.8 },
  { x: 12, y: 30, size: 3, delay: 2.2,  dur: 4.5 },
  { x: 44, y: 62, size: 5, delay: 0.8,  dur: 3.2 },
]

const words  = 'Every company is building AI agents.'.split(' ')
const words2 = 'Almost none of them know why.'.split(' ')

const wordVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.09,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(219,234,254,0.35) 0%, rgba(248,249,252,0.0) 70%), #f8f9fc',
      }}
    >
      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(59, 130, 246, 0.16)',
            animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
            boxShadow: '0 0 6px rgba(59,130,246,0.12)',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200/60"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-500"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(59,130,246,0.7)' }}
          />
          Strategy-Led AI Transformation
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(2.4rem,7vw,4.8rem)] font-semibold leading-[1.1] tracking-tight text-slate-800"
          style={{ fontFamily: 'var(--font-newsreader)' }}
        >
          <span className="block mb-1">
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block italic text-slate-600">
            {words2.map((word, i) => (
              <motion.span
                key={i}
                custom={words.length + i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6, ease: 'easeOut' }}
          className="text-lg text-slate-500 font-body max-w-sm"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Scroll to meet them.
        </motion.p>

        {/* Down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
          className="flex flex-col items-center gap-1"
        >
          <div className="animate-bounce-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-slate-400">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="animate-bounce-arrow" style={{ animationDelay: '0.15s' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-slate-300">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #f8f9fc)' }}
      />
    </section>
  )
}
