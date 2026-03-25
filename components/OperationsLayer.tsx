'use client'

import { motion } from 'framer-motion'
import { operationsAgents } from '@/data/agents'
import AgentCard from './agents/AgentCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const layerSteps = [
  {
    number: '01',
    title: 'Signal clarity',
    description: 'Every agent knows which signals matter and routes them to where decisions happen.',
  },
  {
    number: '02',
    title: 'Feedback architecture',
    description: 'Every action feeds back. Outcomes become inputs. The system learns what actually works.',
  },
  {
    number: '03',
    title: 'Institutional memory',
    description: "Context doesn't die when people leave. History surfaces when it's needed.",
  },
]

export default function OperationsLayer() {
  return (
    <section
      id="operations"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #eef3fc 0%, #f0f7f2 60%, #edf5f0 100%)',
      }}
    >
      {/* Soft radial glow — green tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(187,247,208,0.18) 0%, transparent 70%)',
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
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-green-700 bg-green-50 border border-green-200/70"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ boxShadow: '0 0 6px rgba(34,197,94,0.7)' }} />
            Layer 1 — Operations
          </motion.span>

          <motion.h2
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            Agents that know what they&rsquo;re doing{' '}
            <em className="italic text-green-700">and why.</em>
          </motion.h2>

          <motion.p
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-lg text-slate-500 max-w-xl leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            The operations layer is where automation gets connected to purpose. Not more speed. More direction.
          </motion.p>
        </div>

        {/* Three principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {layerSteps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-xl p-6 flex flex-col gap-3"
            >
              <span className="text-3xl font-display font-light text-green-300" style={{ fontFamily: 'var(--font-newsreader)' }}>
                {step.number}
              </span>
              <h4 className="font-semibold text-slate-700 text-base">{step.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-body">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {operationsAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
