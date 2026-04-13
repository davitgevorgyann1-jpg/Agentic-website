'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent, AgentType } from '@/data/agents'
import PlaygroundDialog from './PlaygroundDialog'
import EnergyPortal from './EnergyPortal'

// ─── Robot PNG per type ───────────────────────────────────────────────────────
const ROBOT_PNG: Record<AgentType, string> = {
  broken:      '/robots/robot-broken.png',
  operational: '/robots/robot-operational.png',
  strategic:   '/robots/robot-strategic.png',
  infinite:    '/robots/robot-strategic.png',
  messenger:   '/robots/robot-strategic.png',
}

// ─── Bubble colors per type ───────────────────────────────────────────────────
const BUBBLE: Record<AgentType, { bg: string; border: string; text: string }> = {
  broken:      { bg: 'rgba(255,251,235,0.97)', border: 'rgba(245,158,11,0.45)',  text: '#78350f' },
  operational: { bg: 'rgba(240,253,244,0.97)', border: 'rgba(34,197,94,0.45)',   text: '#14532d' },
  strategic:   { bg: 'rgba(239,246,255,0.97)', border: 'rgba(59,130,246,0.45)',  text: '#1e3a8a' },
  infinite:    { bg: 'rgba(245,243,255,0.97)', border: 'rgba(139,92,246,0.45)',  text: '#4c1d95' },
  messenger:   { bg: 'rgba(245,243,255,0.97)', border: 'rgba(139,92,246,0.45)',  text: '#4c1d95' },
}

const NAME_COLOR: Record<AgentType, string> = {
  broken: '#92400e', operational: '#14532d', strategic: '#1e40af',
  infinite: '#4c1d95', messenger: '#4c1d95',
}

// ─── Dot mask: 3px circles on 5.5px grid ─────────────────────────────────────
const DOT_MASK: React.CSSProperties = {
  WebkitMaskImage: 'radial-gradient(circle at center, black 3px, transparent 3px)',
  WebkitMaskSize: '5.5px 5.5px',
  WebkitMaskRepeat: 'repeat',
  maskImage: 'radial-gradient(circle at center, black 3px, transparent 3px)',
  maskSize: '5.5px 5.5px',
  maskRepeat: 'repeat',
}

// ─── Component ────────────────────────────────────────────────────────────────

interface RobotCharacterProps {
  agent: Agent
  align?: 'left' | 'right'
  size?: number      // robot image width in px
  bobDelay?: number  // seconds — offset between robots so they don't bob in sync
}

export default function RobotCharacter({
  agent,
  align = 'left',
  size = 260,
  bobDelay = 0,
}: RobotCharacterProps) {
  const [hovered, setHovered]     = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const bubble    = BUBBLE[agent.type]
  const nameColor = NAME_COLOR[agent.type]
  const imgSrc    = ROBOT_PNG[agent.type]
  const portalW   = Math.round(size * 0.85)   // disc matches trail width at overlap point
  const overlapPx = Math.round(size * 0.50)   // trail bottom aligns with disc — robot emerges from portal

  return (
    <>
      <div
        className="relative select-none"
        style={{ width: portalW, cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setDialogOpen(true)}
      >
        {/* ── Speech bubble (hover, 200ms fade) ── */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="bubble"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute z-30 pointer-events-none"
              style={{
                bottom: `calc(100% + 12px)`,
                left: align === 'left' ? 0 : 'auto',
                right: align === 'right' ? 0 : 'auto',
                width: Math.max(portalW, 280),
              }}
            >
              <div
                className="relative px-5 py-3.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: bubble.bg,
                  border: `1px solid ${bubble.border}`,
                  color: bubble.text,
                  boxShadow: '0 6px 28px rgba(0,0,0,0.1)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                {agent.oneLiner}
                {/* Bubble tail — border */}
                <div style={{
                  position: 'absolute', bottom: -9,
                  left: align === 'left' ? 32 : 'auto',
                  right: align === 'right' ? 32 : 'auto',
                  width: 0, height: 0,
                  borderLeft: '9px solid transparent',
                  borderRight: '9px solid transparent',
                  borderTop: `9px solid ${bubble.border}`,
                }} />
                {/* Bubble tail — fill */}
                <div style={{
                  position: 'absolute', bottom: -7,
                  left: align === 'left' ? 34 : 'auto',
                  right: align === 'right' ? 34 : 'auto',
                  width: 0, height: 0,
                  borderLeft: '7px solid transparent',
                  borderRight: '7px solid transparent',
                  borderTop: `7px solid ${bubble.bg}`,
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Robot: scale wrapper → bob → dot mask → PNG ── */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Bob with per-robot delay */}
            <div
              className="animate-robot-bob"
              style={{ animationDelay: `${bobDelay}s` }}
            >
              {/* Dot halftone mask over PNG */}
              <div style={{ ...DOT_MASK, width: size, lineHeight: 0 }} className={hovered ? 'dot-shimmer' : ''}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={agent.name}
                  width={size}
                  style={{ display: 'block', width: size, height: 'auto' }}
                />
              </div>
            </div>
          </motion.div>

          {/* ── Energy portal — overlaps robot bottom ── */}
          <div style={{ marginTop: -overlapPx, position: 'relative', zIndex: 1 }}>
            <EnergyPortal width={portalW} hovered={hovered} type={agent.type} />
          </div>
        </div>

        {/* ── Name tag ── */}
        <div
          className="text-center text-xs font-semibold uppercase tracking-widest mt-1"
          style={{ color: nameColor, fontFamily: 'var(--font-dm-sans)', opacity: 0.65 }}
        >
          {agent.name}
        </div>

        {/* ── Click hint (appears on hover) ── */}
        <div
          className="text-center text-xs mt-1 transition-opacity duration-200"
          style={{
            color: nameColor,
            fontFamily: 'var(--font-dm-sans)',
            opacity: hovered ? 0.6 : 0,
          }}
        >
          Click to hear it speak →
        </div>
      </div>

      <PlaygroundDialog
        agent={agent}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
