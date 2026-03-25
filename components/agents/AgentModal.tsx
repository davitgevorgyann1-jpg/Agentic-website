'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Agent } from '@/data/agents'
import AgentCharacter from './AgentCharacter'

interface AgentModalProps {
  agent: Agent
  isOpen: boolean
  onClose: () => void
}

const typeLabels: Record<Agent['type'], string> = {
  broken: 'Broken Agent',
  operational: 'Operational Agent',
  strategic: 'Strategic Agent',
  infinite: 'Infinite Agent',
}

const typeColors: Record<Agent['type'], { bg: string; text: string; border: string; speechBg: string; speechBorder: string }> = {
  broken: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    speechBg: 'bg-slate-50',
    speechBorder: 'border-l-4 border-amber-300',
  },
  operational: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    speechBg: 'bg-green-50/60',
    speechBorder: 'border-l-4 border-green-400',
  },
  strategic: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    speechBg: 'bg-blue-50/60',
    speechBorder: 'border-l-4 border-blue-400',
  },
  infinite: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
    speechBg: 'bg-violet-50/50',
    speechBorder: 'border-l-4 border-violet-300',
  },
}

export default function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const colors = typeColors[agent.type]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm"
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: '100%', scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '60%', scale: 0.96 }}
            transition={{
              type: 'spring',
              damping: 28,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed inset-x-0 bottom-0 z-50 md:inset-0 md:flex md:items-center md:justify-center md:p-6 pointer-events-none"
          >
            <div
              className="relative pointer-events-auto w-full max-w-xl md:max-w-2xl mx-auto
                rounded-t-3xl md:rounded-3xl
                bg-white/92 backdrop-blur-xl
                border border-white/80
                shadow-[0_24px_80px_rgba(30,41,59,0.18)]
                flex flex-col max-h-[88vh] md:max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle (mobile) */}
              <div className="md:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-slate-300" />
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
                  bg-slate-100 hover:bg-slate-200 transition-colors duration-150 text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              {/* Header */}
              <div className="flex items-center gap-5 px-6 pt-5 pb-4 border-b border-slate-100">
                {/* Character — larger */}
                <div className="flex-shrink-0">
                  <AgentCharacter type={agent.type} status={agent.status} size="lg" />
                </div>

                {/* Name + type tag */}
                <div className="flex flex-col gap-2 min-w-0">
                  <h2
                    className="font-display text-2xl font-semibold text-slate-800 leading-tight"
                    style={{ fontFamily: 'var(--font-newsreader)' }}
                  >
                    {agent.name}
                  </h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border} w-fit`}
                  >
                    {typeLabels[agent.type]}
                  </span>
                  <p className="text-sm text-slate-500 leading-snug font-body">{agent.oneLiner}</p>
                </div>
              </div>

              {/* Dialogue */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {/* Speech bubble quote mark */}
                <div className="flex items-start gap-3 mb-3">
                  <svg
                    width="24"
                    height="20"
                    viewBox="0 0 24 20"
                    fill="none"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <path
                      d="M0 20V12C0 5.373 5.373 0 12 0h2v4h-2C8.686 4 6 6.686 6 10v2h6v8H0zm14 0V12C14 5.373 19.373 0 26 0h2v4h-2c-3.314 0-6 2.686-6 6v2h6v8H14z"
                      fill="currentColor"
                      className="text-slate-200"
                    />
                  </svg>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Speaking</p>
                </div>

                <blockquote
                  className={`${colors.speechBg} ${colors.speechBorder} rounded-r-xl px-5 py-4`}
                >
                  <p
                    className="text-slate-700 leading-relaxed text-base font-body"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {agent.dialogue}
                  </p>
                  {/* Blinking cursor at end */}
                  <span
                    className="inline-block w-0.5 h-4 bg-slate-400 ml-1 align-middle"
                    style={{ animation: 'flicker 1.1s step-end infinite' }}
                  />
                </blockquote>

                {/* Bottom spacer */}
                <div className="h-2" />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors duration-150 flex items-center gap-1.5"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back
                </button>
                <a
                  href="#assessment"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors duration-150"
                >
                  Assess your agents
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
