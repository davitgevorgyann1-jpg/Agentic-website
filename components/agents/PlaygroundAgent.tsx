'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/data/agents'
import PlaygroundDialog from './PlaygroundDialog'
import ParticleDotAgent from './ParticleDotAgent'

interface Position {
  left: string
  bottom: number
}

interface PlaygroundAgentProps {
  agent: Agent
  position: Position
  delay?: number
}

export default function PlaygroundAgent({ agent, position, delay = 0 }: PlaygroundAgentProps) {
  const [hovered, setHovered] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => setDialogOpen(true)}
        className="absolute cursor-pointer flex flex-col items-center"
        style={{
          left: position.left,
          bottom: position.bottom,
          zIndex: hovered ? 20 : 5,
          // transform-origin bottom-center so hover scale feels grounded
        }}
      >
        {/* ── Speech bubble (appears on hover) ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="bubble"
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{   opacity: 0, y: 3,  scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute"
              style={{
                bottom: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 210,
                pointerEvents: 'none',
                zIndex: 30,
              }}
            >
              <div
                className="relative px-4 py-3 rounded-2xl text-xs leading-relaxed text-center font-body"
                style={{
                  background: 'rgba(255,251,235,0.97)',
                  border: '1px solid rgba(245,158,11,0.35)',
                  color: '#78350f',
                  boxShadow: '0 4px 20px rgba(180,100,0,0.12)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {agent.oneLiner}
                {/* tail border */}
                <div style={{
                  position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
                  borderTop: '7px solid rgba(245,158,11,0.35)',
                }} />
                {/* tail fill */}
                <div style={{
                  position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                  borderTop: '6px solid rgba(255,251,235,0.97)',
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Robot (particle dots) ── */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ filter: hovered ? 'drop-shadow(0 0 18px rgba(245,158,11,0.3))' : 'none', transition: 'filter 0.3s ease' }}
        >
          <ParticleDotAgent type={agent.type} size={160} interactive={true} />
        </motion.div>

        {/* ── Name tag ── */}
        <div
          className="mt-1 px-3 py-1 rounded-full text-xs font-medium font-body whitespace-nowrap"
          style={{
            background: 'rgba(254,243,199,0.85)',
            border: '1px solid rgba(245,158,11,0.3)',
            color: '#92400e',
            backdropFilter: 'blur(4px)',
            fontFamily: 'var(--font-dm-sans)',
          }}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5 animate-flicker align-middle" />
          {agent.name}
        </div>
      </motion.div>

      <PlaygroundDialog agent={agent} isOpen={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
