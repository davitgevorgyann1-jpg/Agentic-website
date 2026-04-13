'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Agent } from '@/data/agents'
import AgentModal from './AgentModal'
import ParticleDotAgent from './ParticleDotAgent'

interface AgentCardProps {
  agent: Agent
  index: number
}

// Kept for any external consumers that may reference it
export const ROBOT_IMAGE: Record<string, string> = {
  broken:      '/robots/robot-broken.png',
  operational: '/robots/robot-operational.png',
  strategic:   '/robots/robot-strategic.png',
  infinite:    '/robots/robot-strategic.png',
  messenger:   '/robots/robot-strategic.png',
}

// Tint color behind the robot
const ROBOT_TINT: Record<string, string> = {
  broken:      'rgba(254,243,199,0.35)',
  operational: 'rgba(220,252,231,0.35)',
  strategic:   'rgba(219,234,254,0.35)',
  infinite:    'rgba(237,233,254,0.35)',
  messenger:   'rgba(237,233,254,0.35)',
}

// Speech bubble tint per type
const BUBBLE: Record<string, { bg: string; border: string; text: string; tail: string }> = {
  broken:      { bg: 'rgba(255,251,235,0.97)', border: 'rgba(245,158,11,0.3)',  text: '#92400e', tail: 'rgba(255,251,235,0.97)' },
  operational: { bg: 'rgba(240,253,244,0.97)', border: 'rgba(34,197,94,0.3)',   text: '#14532d', tail: 'rgba(240,253,244,0.97)' },
  strategic:   { bg: 'rgba(239,246,255,0.97)', border: 'rgba(59,130,246,0.3)',  text: '#1e3a5f', tail: 'rgba(239,246,255,0.97)' },
  infinite:    { bg: 'rgba(245,243,255,0.97)', border: 'rgba(139,92,246,0.3)',  text: '#4c1d95', tail: 'rgba(245,243,255,0.97)' },
  messenger:   { bg: 'rgba(245,243,255,0.97)', border: 'rgba(139,92,246,0.3)',  text: '#4c1d95', tail: 'rgba(245,243,255,0.97)' },
}

function StatusBadge({ status }: { status: Agent['status'] }) {
  const configs = {
    'amber-flicker': { label: 'Unstable',     dot: 'bg-amber-400 animate-flicker', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    'amber-dim':     { label: 'Orphaned',      dot: 'bg-amber-300',                 text: 'text-amber-600', bg: 'bg-amber-50/70 border-amber-200/60' },
    'red-static':    { label: 'Disconnected',  dot: 'bg-red-500 animate-flicker',   text: 'text-red-700',   bg: 'bg-red-50 border-red-200' },
    'green-solid':   { label: 'Operational',   dot: 'bg-green-500',                 text: 'text-green-700', bg: 'bg-green-50 border-green-200' },
    'blue-pulse':    { label: 'Strategic',     dot: 'bg-blue-500',                  text: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200' },
    'empty':         { label: 'Latent',        dot: 'bg-violet-300',                text: 'text-violet-600',bg: 'bg-violet-50 border-violet-200' },
    'violet-pulse':  { label: 'Self-Aware',    dot: 'bg-violet-500',                text: 'text-violet-700',bg: 'bg-violet-50 border-violet-200' },
  }
  const c = configs[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.text}`}>
      <span
        className={`w-2 h-2 rounded-full ${c.dot}`}
        style={status === 'blue-pulse' ? { animation: 'pulse-glow 2s ease-in-out infinite', boxShadow: '0 0 6px rgba(59,130,246,0.6)' } : {}}
      />
      {c.label}
    </span>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function AgentCard({ agent, index }: AgentCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const bubble = BUBBLE[agent.type] ?? BUBBLE.strategic
  const tint   = ROBOT_TINT[agent.type] ?? ROBOT_TINT.strategic

  return (
    <>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
        onClick={() => setIsOpen(true)}
        className="relative cursor-pointer rounded-2xl overflow-hidden flex flex-col items-center
                   backdrop-blur-md border border-white/70 bg-white/80
                   hover:shadow-[0_20px_56px_rgba(100,120,180,0.18)] transition-shadow duration-300 group"
        style={{ boxShadow: '0 4px 24px rgba(100,120,180,0.08)' }}
      >
        {/* Speech bubble */}
        <div className="w-full px-5 pt-6 pb-2">
          <div
            className="relative rounded-2xl px-4 py-3"
            style={{ background: bubble.bg, border: `1px solid ${bubble.border}`, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}
          >
            <p className="text-xs leading-relaxed text-center font-body line-clamp-3" style={{ color: bubble.text, fontFamily: 'var(--font-dm-sans)' }}>
              {agent.oneLiner}
            </p>
            {/* Tail — border layer */}
            <div style={{ position:'absolute', bottom:-8, left:'50%', transform:'translateX(-50%)', width:0, height:0,
              borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderTop:`8px solid ${bubble.border}` }} />
            {/* Tail — fill layer */}
            <div style={{ position:'absolute', bottom:-6, left:'50%', transform:'translateX(-50%)', width:0, height:0,
              borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderTop:`7px solid ${bubble.tail}` }} />
          </div>
        </div>

        {/* Robot particle area */}
        <div className="relative w-full flex justify-center items-center" style={{ background: tint, minHeight: 220 }}>
          <motion.div
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.3 }}
          >
            <ParticleDotAgent type={agent.type} size={200} interactive={true} />
          </motion.div>
        </div>

        {/* Info */}
        <div className="w-full px-5 py-5 flex flex-col items-center gap-3">
          <h3
            className="font-display text-lg font-semibold text-center text-slate-800 leading-snug"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            {agent.name}
          </h3>
          <StatusBadge status={agent.status} />
          <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600 transition-colors duration-200">
            <span>Hear it speak</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      <AgentModal agent={agent} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
