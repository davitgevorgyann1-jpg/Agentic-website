'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { openCalendly } from '@/lib/calendly'

type Category = 'Strategy' | 'Operations' | 'Alignment'

interface Question {
  id: number
  category: Category
  question: string
  options: { label: string; score: number }[]
}

const questions: Question[] = [
  {
    id: 1,
    category: 'Strategy',
    question: 'How often does your leadership team revisit the company strategy and OKRs during the year?',
    options: [
      { label: 'We set them once a year and rarely look back', score: 1 },
      { label: 'Quarterly reviews, but they feel like a formality', score: 2 },
      { label: 'Regular reviews that sometimes change our priorities', score: 3 },
      { label: 'Continuous: our strategy is a living document', score: 4 },
    ],
  },
  {
    id: 2,
    category: 'Strategy',
    question: 'When a new initiative is proposed, how do you determine whether it aligns with company goals?',
    options: [
      { label: "It's mostly gut feel from leadership", score: 1 },
      { label: "We discuss it but there's no formal check", score: 2 },
      { label: "We reference our OKRs, but it's manual and inconsistent", score: 3 },
      { label: 'Every initiative is evaluated against documented strategic criteria', score: 4 },
    ],
  },
  {
    id: 3,
    category: 'Operations',
    question: 'How many of your current business processes have been audited for strategic relevance in the past year?',
    options: [
      { label: 'None. We mostly run on how things have always been done', score: 1 },
      { label: 'A few, usually only when something breaks', score: 2 },
      { label: "We've reviewed some, but no systematic audit", score: 3 },
      { label: 'Comprehensive review: we regularly evaluate what stays, changes, or goes', score: 4 },
    ],
  },
  {
    id: 4,
    category: 'Operations',
    question: 'How are you currently using AI in your operations?',
    options: [
      { label: "We're not, or it's just individual ChatGPT use", score: 1 },
      { label: 'A few tools here and there, chosen ad hoc', score: 2 },
      { label: 'Some organized automation, but not connected to strategy', score: 3 },
      { label: 'AI is deployed strategically with clear ROI metrics', score: 4 },
    ],
  },
  {
    id: 5,
    category: 'Alignment',
    question: 'When a key metric drifts off target, how quickly does your team notice and respond?',
    options: [
      { label: 'Usually we find out at the end of the quarter, too late', score: 1 },
      { label: 'Someone might catch it in a monthly review', score: 2 },
      { label: 'We have dashboards, but no one monitors them consistently', score: 3 },
      { label: 'Real-time monitoring with clear escalation paths', score: 4 },
    ],
  },
  {
    id: 6,
    category: 'Alignment',
    question: 'How connected are your daily operations to your strategic OKRs?',
    options: [
      { label: "They're basically two separate worlds", score: 1 },
      { label: "Loosely: people know the OKRs exist but don't reference them", score: 2 },
      { label: "Teams try to connect their work to OKRs, but it's inconsistent", score: 3 },
      { label: "Every team's work directly traces back to strategic objectives", score: 4 },
    ],
  },
  {
    id: 7,
    category: 'Alignment',
    question: "If I asked 5 random employees what the company's top 3 strategic priorities are, how many would get it right?",
    options: [
      { label: 'Maybe 0. Most people focus on their own tasks', score: 1 },
      { label: '1 or 2 might get close', score: 2 },
      { label: 'Most would know the general direction but not specifics', score: 3 },
      { label: 'All 5: strategic priorities are deeply embedded in our culture', score: 4 },
    ],
  },
]

const categoryQuestions: Record<Category, number[]> = {
  Strategy: [1, 2],
  Operations: [3, 4],
  Alignment: [5, 6, 7],
}

function categoryScore(answers: Record<number, number>, category: Category): number {
  const ids = categoryQuestions[category]
  const answered = ids.filter((id) => answers[id] !== undefined)
  if (answered.length === 0) return 0
  const total = answered.reduce((sum, id) => sum + answers[id], 0)
  const maxScore = answered.length * 4
  const minScore = answered.length * 1
  return Math.round(((total - minScore) / (maxScore - minScore)) * 100)
}

function overallScore(answers: Record<number, number>): number {
  const s = categoryScore(answers, 'Strategy')
  const o = categoryScore(answers, 'Operations')
  const a = categoryScore(answers, 'Alignment')
  return Math.round((s + o + a) / 3)
}

function getScoreColor(score: number): string {
  if (score <= 40) return '#ef4444'
  if (score <= 70) return '#D97706'
  return '#16A34A'
}

function getVerdict(score: number): string {
  if (score <= 40)
    return 'Critical gaps in strategy-execution alignment. AI transformation without a strategy-first approach will likely fail.'
  if (score <= 70)
    return "Some foundations in place, but significant alignment gaps exist. You're at risk of automating in the wrong direction."
  return "Strong strategic alignment. You're well-positioned for targeted AI transformation."
}

function FieldLabel({ children, optional }: { children: React.ReactNode; optional?: boolean }) {
  return (
    <div className="flex items-baseline gap-2 mb-1.5">
      <span
        className="uppercase"
        style={{
          fontSize: 9,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.18em',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {children}
      </span>
      {optional && (
        <span
          className="uppercase"
          style={{
            fontSize: 9,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.15em',
            fontFamily: 'var(--font-mono)',
          }}
        >
          — optional
        </span>
      )}
    </div>
  )
}

function PillGroup({
  options,
  value,
  onChange,
  disabled,
}: {
  options: string[]
  value: string | null
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => !disabled && onChange(opt)}
            disabled={disabled}
            className="text-[11px] rounded transition-all"
            style={{
              padding: '6px 12px',
              background: active ? 'rgba(226,185,127,0.12)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${active ? 'rgba(226,185,127,0.55)' : 'rgba(255,255,255,0.10)'}`,
              color: active ? '#E2B97F' : 'rgba(255,255,255,0.55)',
              fontFamily: 'var(--font-mono)',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = getScoreColor(score)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</span>
        <span className="text-[11px] font-bold" style={{ color }}>{score}%</span>
      </div>
      <div className="h-1 w-full rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}

type Stage = 'questions' | 'email' | 'results'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ROLE_OPTIONS = ['Founder / CEO', 'Operations', 'Product', 'Engineering', 'Other']
const STAGE_OPTIONS = ['Pre-revenue', 'Seed–Series A', 'Series B+', 'Established', 'Other']

export default function Assessment() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [stage, setStage] = useState<Stage>('questions')
  const [direction, setDirection] = useState(1)
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<string | null>(null)
  const [companyStage, setCompanyStage] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const q = questions[currentStep]
  const totalAnswered = Object.keys(answers).length
  const allAnswered = totalAnswered === questions.length

  const sScore = categoryScore(answers, 'Strategy')
  const oScore = categoryScore(answers, 'Operations')
  const aScore = categoryScore(answers, 'Alignment')
  const total = overallScore(answers)
  const scoreColor = getScoreColor(total)

  const submitted = stage === 'results'

  const submitLead = async (skipped: boolean) => {
    if (!skipped) {
      const trimmed = email.trim()
      if (!EMAIL_RE.test(trimmed)) {
        setFormError('Enter a valid email address.')
        return
      }
      if (!role) {
        setFormError('Pick the role that fits you best.')
        return
      }
      if (!companyStage) {
        setFormError('Pick your company stage.')
        return
      }
      setFormError(null)
      setSubmitting(true)
      try {
        await fetch('/api/assessment-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: trimmed,
            role,
            companyStage,
            note: note.trim() || undefined,
            scores: {
              overall: total,
              strategy: sScore,
              operations: oScore,
              alignment: aScore,
            },
            answers,
          }),
        })
      } catch {
        // Non-blocking — still show results even if the lead capture fails
      } finally {
        setSubmitting(false)
      }
    }
    setStage('results')
  }

  const goNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const goBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelect = (score: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: score }))
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section id="assessment" className="relative py-24 px-6" style={{ background: '#0a0a0f' }}>
      <div className="relative z-10 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="animate-pulse-steady"
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#94A3B8', display: 'inline-block', boxShadow: '0 0 8px rgba(148,163,184,0.5)' }}
            />
            <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: '#94A3B8' }}>FREE ASSESSMENT</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(148,163,184,0.4), transparent)' }} />
          </div>
          <h2 className="text-[22px] font-normal text-white mb-3 text-center">
            How aligned is your AI transformation with your strategy?
          </h2>
          <p className="text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            7 questions. Instant score. Specific recommendations.
          </p>
        </motion.div>

        {/* Wizard */}
        <AnimatePresence mode="wait">
          {stage === 'questions' ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Progress dots */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        answers[questions[i].id] !== undefined
                          ? '#2563EB'
                          : i === currentStep
                          ? '#ffffff'
                          : 'transparent',
                      border:
                        i === currentStep
                          ? '1.5px solid #ffffff'
                          : answers[questions[i].id] !== undefined
                          ? '1.5px solid #2563EB'
                          : '1.5px solid rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>

              {/* Question card */}
              <div
                className="rounded-lg p-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Category tag */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.1em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Q{q.id}
                  </span>
                  <span
                    className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full border"
                    style={{
                      color: q.category === 'Strategy' ? '#60A5FA' : q.category === 'Operations' ? '#4ADE80' : '#A78BFA',
                      borderColor: q.category === 'Strategy' ? '#2563EB44' : q.category === 'Operations' ? '#16A34A44' : '#7C3AED44',
                    }}
                  >
                    {q.category}
                  </span>
                </div>

                {/* Sliding question */}
                <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <p className="text-[13px] font-medium text-white mb-5 leading-relaxed">
                        {q.question}
                      </p>

                      {/* Options */}
                      <div className="flex flex-col gap-2">
                        {q.options.map((opt, oi) => {
                          const selected = answers[q.id] === opt.score
                          return (
                            <button
                              key={oi}
                              onClick={() => handleSelect(opt.score)}
                              className="w-full text-left px-4 py-3 rounded text-[12px] leading-snug transition-all duration-150 border"
                              style={{
                                background: selected ? 'rgba(37,99,235,0.15)' : 'rgba(255,255,255,0.02)',
                                borderColor: selected ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
                                color: selected ? '#93C5FD' : 'rgba(255,255,255,0.5)',
                              }}
                            >
                              {opt.label}
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <button
                    onClick={goBack}
                    disabled={currentStep === 0}
                    className="text-[11px] transition-colors"
                    style={{
                      color: currentStep === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)',
                      cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    &larr; Back
                  </button>

                  {currentStep < questions.length - 1 ? (
                    <button
                      onClick={goNext}
                      disabled={answers[q.id] === undefined}
                      className="text-[11px] px-4 py-1.5 rounded transition-all"
                      style={{
                        background: answers[q.id] !== undefined ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
                        color: answers[q.id] !== undefined ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)',
                        cursor: answers[q.id] !== undefined ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Continue &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={() => allAnswered && setStage('email')}
                      disabled={!allAnswered}
                      className="text-[11px] px-4 py-1.5 rounded transition-all"
                      style={{
                        background: allAnswered ? '#ffffff' : 'rgba(255,255,255,0.03)',
                        color: allAnswered ? '#0a0a0f' : 'rgba(255,255,255,0.2)',
                        cursor: allAnswered ? 'pointer' : 'not-allowed',
                        fontWeight: allAnswered ? 600 : 400,
                      }}
                    >
                      See my results &rarr;
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : stage === 'email' ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-[640px] mx-auto"
            >
              <div
                className="rounded-lg p-7"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Tag */}
                <div className="flex items-center gap-2 mb-5">
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#E2B97F',
                      display: 'inline-block',
                      boxShadow: '0 0 8px rgba(226,185,127,0.6)',
                    }}
                  />
                  <span
                    className="uppercase"
                    style={{
                      fontSize: 10,
                      color: '#E2B97F',
                      letterSpacing: '0.18em',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    ONE LAST THING
                  </span>
                </div>

                <h3
                  className="text-white mb-2"
                  style={{ fontSize: 18, fontWeight: 600 }}
                >
                  Want me to take a closer look at this?
                </h3>
                <p
                  className="mb-5"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}
                >
                  I read every assessment that comes in. Give me 30 seconds of context and I&apos;ll write back personally with 2–3 things I&apos;d focus on first.
                </p>

                {/* Email */}
                <FieldLabel>Email</FieldLabel>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (formError) setFormError(null)
                  }}
                  disabled={submitting}
                  className="w-full px-4 py-2.5 rounded text-[13px] outline-none transition-colors mb-4"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                  }}
                />

                {/* Role */}
                <FieldLabel>Your role</FieldLabel>
                <PillGroup
                  options={ROLE_OPTIONS}
                  value={role}
                  onChange={(v) => { setRole(v); if (formError) setFormError(null) }}
                  disabled={submitting}
                />

                {/* Company stage */}
                <div className="mt-4">
                  <FieldLabel>Company stage</FieldLabel>
                  <PillGroup
                    options={STAGE_OPTIONS}
                    value={companyStage}
                    onChange={(v) => { setCompanyStage(v); if (formError) setFormError(null) }}
                    disabled={submitting}
                  />
                </div>

                {/* Optional note */}
                <div className="mt-4">
                  <FieldLabel optional>Anything specific you&apos;d like me to look at?</FieldLabel>
                  <textarea
                    placeholder="A line or two — completely optional."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={submitting}
                    rows={2}
                    maxLength={500}
                    className="w-full px-4 py-2.5 rounded text-[13px] outline-none transition-colors resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      lineHeight: 1.5,
                    }}
                  />
                </div>

                {/* Error */}
                {formError && (
                  <p
                    className="mt-3"
                    style={{ fontSize: 11, color: '#ef4444' }}
                  >
                    {formError}
                  </p>
                )}

                {/* Buttons */}
                <div className="flex items-center justify-between mt-5">
                  <button
                    onClick={() => submitLead(true)}
                    disabled={submitting}
                    className="text-[11px] transition-colors"
                    style={{
                      color: 'rgba(255,255,255,0.35)',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    Skip — just show my score
                  </button>

                  <button
                    onClick={() => submitLead(false)}
                    disabled={submitting}
                    className="text-[11px] px-5 py-2 rounded transition-all"
                    style={{
                      background: submitting ? 'rgba(255,255,255,0.5)' : '#ffffff',
                      color: '#0a0a0f',
                      cursor: submitting ? 'wait' : 'pointer',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {submitting ? 'Sending…' : 'Send to Davit →'}
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col gap-6"
            >
              {/* Score circle */}
              <div className="flex flex-col items-center text-center mb-4">
                <div
                  className="relative flex items-center justify-center rounded-full mb-4"
                  style={{
                    width: 120,
                    height: 120,
                    border: `3px solid ${scoreColor}`,
                    boxShadow: `0 0 30px ${scoreColor}33`,
                  }}
                >
                  <span className="text-[36px] font-bold text-white">{total}</span>
                </div>
                <span className="text-[12px]" style={{ color: 'rgba(255,255,255,0.4)' }}>/100</span>
              </div>

              {/* Verdict */}
              <div
                className="rounded-lg p-5 text-center"
                style={{
                  background: `${scoreColor}11`,
                  border: `1px solid ${scoreColor}33`,
                }}
              >
                <p className="text-[12px] leading-[1.7]" style={{ color: `${scoreColor}cc` }}>
                  {getVerdict(total)}
                </p>
              </div>

              {/* Breakdown bars */}
              <div
                className="rounded-lg p-5 flex flex-col gap-4"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <span className="text-[10px] uppercase tracking-[0.1em] mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Score breakdown
                </span>
                <ScoreBar label="Strategy" score={sScore} />
                <ScoreBar label="Operations" score={oScore} />
                <ScoreBar label="Alignment" score={aScore} />
              </div>

              {/* CTA */}
              <div
                className="rounded-lg p-6 text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-[14px] text-white mb-2">Want a full audit with specific recommendations?</p>
                <p className="text-[11px] mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Book a free discovery call. I&apos;ll tell you honestly whether my approach fits.
                </p>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); openCalendly() }}
                  className="inline-flex items-center gap-2 bg-white text-black text-xs font-medium px-6 py-3 rounded hover:bg-gray-200 transition-colors"
                >
                  Book a Discovery Call
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Retake */}
              <button
                onClick={() => {
                  setStage('questions')
                  setAnswers({})
                  setCurrentStep(0)
                  setEmail('')
                  setRole(null)
                  setCompanyStage(null)
                  setNote('')
                  setFormError(null)
                }}
                className="text-[11px] text-center transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                Retake the assessment
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
