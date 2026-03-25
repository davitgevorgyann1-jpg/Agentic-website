'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Agent } from '@/data/agents'
import AgentCharacter from './AgentCharacter'
import AgentModal from './AgentModal'

interface AgentCardProps {
  agent: Agent
  index: number
}

function StatusBadge({ status }: { status: Agent['status'] }) {
  const configs = {
    'amber-flicker': {
      label: 'Unstable',
      dotClass: 'bg-amber-400',
      textClass: 'text-amber-700',
      bgClass: 'bg-amber-50 border-amber-200',
      animate: true,
    },
    'amber-dim': {
      label: 'Orphaned',
      dotClass: 'bg-amber-300',
      textClass: 'text-amber-600',
      bgClass: 'bg-amber-50/70 border-amber-200/60',
      animate: false,
    },
    'red-static': {
      label: 'Disconnected',
      dotClass: 'bg-red-500',
      textClass: 'text-red-700',
      bgClass: 'bg-red-50 border-red-200',
      animate: true,
    },
    'green-solid': {
      label: 'Operational',
      dotClass: 'bg-green-500',
      textClass: 'text-green-700',
      bgClass: 'bg-green-50 border-green-200',
      animate: false,
    },
    'blue-pulse': {
      label: 'Strategic',
      dotClass: 'bg-blue-500',
      textClass: 'text-blue-700',
      bgClass: 'bg-blue-50 border-blue-200',
      animate: false,
    },
    empty: {
      label: 'Latent',
      dotClass: 'bg-violet-300',
      textClass: 'text-violet-600',
      bgClass: 'bg-violet-50 border-violet-200',
      animate: false,
    },
  }

  const cfg = configs[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bgClass} ${cfg.textClass}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${cfg.dotClass} ${cfg.animate ? 'animate-flicker' : ''}`}
        style={
          status === 'blue-pulse'
            ? { animation: 'pulse-glow 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(59,130,246,0.6)' }
            : {}
        }
      />
      {cfg.label}
    </span>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const isBroken = agent.type === 'broken'
  const isInfinite = agent.type === 'infinite'

  const cardBg = isBroken
    ? 'bg-slate-50/80'
    : isInfinite
    ? 'bg-white/60'
    : 'bg-white/80'

  const cardBorder = isBroken
    ? 'border-slate-200/70'
    : isInfinite
    ? 'border-violet-200/50'
    : 'border-white/80'

  return (
    <>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        whileHover={{
          scale: 1.025,
          y: -4,
          transition: { duration: 0.25, ease: 'easeOut' },
        }}
        onClick={() => setIsOpen(true)}
        className={`
          relative cursor-pointer rounded-2xl p-6 flex flex-col items-center gap-4
          backdrop-blur-md border transition-shadow duration-300
          ${cardBg} ${cardBorder}
          hover:shadow-[0_12px_40px_rgba(100,120,180,0.14)]
          group
        `}
        style={{
          boxShadow: '0 4px 24px rgba(100, 120, 180, 0.07)',
        }}
      >
        {/* Subtle glitch overlay on hover for broken agents */}
        {isBroken && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(100,100,100,0.03) 3px, rgba(100,100,100,0.03) 4px)',
            }}
          />
        )}

        {/* Agent visual */}
        <div className="mt-2">
          <AgentCharacter type={agent.type} status={agent.status} size="md" />
        </div>

        {/* Name */}
        <h3
          className="font-display text-lg font-semibold text-center text-slate-800 leading-snug"
          style={{ fontFamily: 'var(--font-newsreader)' }}
        >
          {agent.name}
        </h3>

        {/* One-liner */}
        <p className="text-sm text-slate-500 text-center leading-relaxed font-body px-1">
          {agent.oneLiner}
        </p>

        {/* Status badge */}
        <StatusBadge status={agent.status} />

        {/* Read more hint */}
        <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600 transition-colors duration-200 mt-1">
          <span>Hear it speak</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          >
            <path
              d="M2 6h8M7 3l3 3-3 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      <AgentModal agent={agent} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
