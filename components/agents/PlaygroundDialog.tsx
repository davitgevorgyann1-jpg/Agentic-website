'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/data/agents'
import ParticleDotAgent from './ParticleDotAgent'

interface PlaygroundDialogProps {
  agent: Agent
  isOpen: boolean
  onClose: () => void
}

const TYPE_LABELS: Record<Agent['type'], string> = {
  broken:      'Broken Agent',
  operational: 'Operational Agent',
  strategic:   'Strategic Agent',
  infinite:    'Infinite Agent',
  messenger:   'The Messenger',
}

const TYPE_ACCENT: Record<Agent['type'], { badge: string; bar: string }> = {
  broken:      { badge: 'bg-amber-100 text-amber-800 border-amber-300',  bar: 'border-amber-400' },
  operational: { badge: 'bg-green-100 text-green-800 border-green-300',  bar: 'border-green-400' },
  strategic:   { badge: 'bg-blue-100 text-blue-800 border-blue-300',     bar: 'border-blue-400' },
  infinite:    { badge: 'bg-violet-100 text-violet-800 border-violet-300',bar: 'border-violet-400' },
  messenger:   { badge: 'bg-violet-100 text-violet-800 border-violet-300',bar: 'border-violet-400' },
}

export default function PlaygroundDialog({ agent, isOpen, onClose }: PlaygroundDialogProps) {
  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const accent = TYPE_ACCENT[agent.type]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
            <motion.div
              key="dialog"
              className="relative w-full max-w-3xl pointer-events-auto rounded-3xl overflow-hidden
                         flex flex-col md:flex-row shadow-[0_32px_96px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{   opacity: 0, scale: 0.94, y: 8  }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center
                           bg-white/15 hover:bg-white/25 text-white/80 hover:text-white transition-colors duration-150"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              {/* ── LEFT: Robot panel (dark warm) ── */}
              <div
                className="flex-shrink-0 flex flex-col items-center justify-center gap-4 py-10 px-8"
                style={{
                  background: 'linear-gradient(160deg, #1c1208 0%, #2a1b08 45%, #181210 100%)',
                  width: '42%',
                  minWidth: 240,
                  minHeight: 360,
                }}
              >
                {/* Particle dot robot */}
                <div
                  className="relative flex items-center justify-center"
                  style={{ filter: 'drop-shadow(0 0 32px rgba(245,158,11,0.2))' }}
                >
                  <ParticleDotAgent type={agent.type} size={200} interactive={false} />
                </div>

                {/* Small type label under robot */}
                <span
                  className="text-xs font-medium uppercase tracking-widest"
                  style={{ color: 'rgba(245,158,11,0.6)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {TYPE_LABELS[agent.type]}
                </span>
              </div>

              {/* ── RIGHT: Dialogue panel (light) ── */}
              <div
                className="flex-1 flex flex-col gap-5 p-8 overflow-y-auto"
                style={{ background: 'rgba(255,253,250,0.97)', maxHeight: '80vh' }}
              >
                {/* Agent name */}
                <div className="flex flex-col gap-2">
                  <h2
                    className="font-display text-2xl md:text-3xl font-semibold text-slate-800 leading-tight"
                    style={{ fontFamily: 'var(--font-newsreader)' }}
                  >
                    {agent.name}
                  </h2>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border w-fit ${accent.badge}`}>
                    {TYPE_LABELS[agent.type]}
                  </span>
                </div>

                {/* Speaking label */}
                <div className="flex items-center gap-2">
                  <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                    <path d="M0 16V9.6C0 4.3 4.3 0 9.6 0H11v3.2h-1.4C6.3 3.2 3.2 6.3 3.2 9.6V12h5v4H0zm11 0V9.6C11 4.3 15.3 0 20.6 0H22v3.2h-1.4c-3.3 0-6.4 3.1-6.4 6.4V12h5v4H11z"
                      fill="currentColor" className="text-slate-200" />
                  </svg>
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-widest" style={{ fontFamily: 'var(--font-dm-sans)' }}>
                    Speaking
                  </span>
                </div>

                {/* Dialogue */}
                <blockquote
                  className={`flex-1 pl-5 py-4 pr-4 rounded-r-2xl border-l-4 ${accent.bar}`}
                  style={{ background: 'rgba(0,0,0,0.02)' }}
                >
                  <p
                    className="text-slate-700 leading-[1.8] text-base font-body"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {agent.dialogue}
                  </p>
                  {/* Blinking cursor */}
                  <span
                    className="inline-block w-0.5 h-4 bg-slate-400 ml-1 align-middle"
                    style={{ animation: 'flicker 1.1s step-end infinite' }}
                  />
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <button
                    onClick={onClose}
                    className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Close
                  </button>
                  <a
                    href="#assessment"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors duration-150"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    Assess your agents
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
