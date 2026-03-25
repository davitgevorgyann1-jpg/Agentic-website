'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
      { label: 'Continuous — our strategy is a living document', score: 4 },
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
      { label: 'None — we mostly run on how things have always been done', score: 1 },
      { label: 'A few, usually only when something breaks', score: 2 },
      { label: "We've reviewed some, but no systematic audit", score: 3 },
      { label: 'Comprehensive review — we regularly evaluate what stays, changes, or goes', score: 4 },
    ],
  },
  {
    id: 4,
    category: 'Operations',
    question: 'How are you currently using AI in your operations?',
    options: [
      { label: "We're not, or it's just individual ChatGPT use", score: 1 },
      { label: 'A few tools here and there, chosen ad hoc', score: 2 },
      { label: "Some organized automation, but not connected to strategy", score: 3 },
      { label: 'AI is deployed strategically with clear ROI metrics', score: 4 },
    ],
  },
  {
    id: 5,
    category: 'Alignment',
    question: 'When a key metric drifts off target, how quickly does your team notice and respond?',
    options: [
      { label: 'Usually we find out at the end of the quarter — too late', score: 1 },
      { label: 'Someone might catch it in a monthly review', score: 2 },
      { label: "We have dashboards, but no one monitors them consistently", score: 3 },
      { label: 'Real-time monitoring with clear escalation paths', score: 4 },
    ],
  },
  {
    id: 6,
    category: 'Alignment',
    question: 'How connected are your daily operations to your strategic OKRs?',
    options: [
      { label: "They're basically two separate worlds", score: 1 },
      { label: "Loosely — people know the OKRs exist but don't reference them", score: 2 },
      { label: "Teams try to connect their work to OKRs, but it's inconsistent", score: 3 },
      { label: "Every team's work directly traces back to strategic objectives", score: 4 },
    ],
  },
  {
    id: 7,
    category: 'Alignment',
    question: "If I asked 5 random employees what the company's top 3 strategic priorities are, how many would get it right?",
    options: [
      { label: "Maybe 0 — most people focus on their own tasks", score: 1 },
      { label: '1 or 2 might get close', score: 2 },
      { label: 'Most would know the general direction but not specifics', score: 3 },
      { label: 'All 5 — strategic priorities are deeply embedded in our culture', score: 4 },
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
  // max score per question is 4, min is 1 — convert to 0–100%
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

function getVerdict(score: number): { text: string; color: string; bg: string; border: string } {
  if (score <= 40)
    return {
      text: 'Critical gaps in strategy-execution alignment. AI transformation without a strategy-first approach will likely fail.',
      color: 'text-red-700',
      bg: 'bg-red-50',
      border: 'border-red-200',
    }
  if (score <= 70)
    return {
      text: 'Some foundations in place, but significant alignment gaps exist. You\'re at risk of automating in the wrong direction.',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    }
  return {
    text: "Strong strategic alignment. You're well-positioned for targeted AI transformation.",
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
  }
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider font-body">{label}</span>
        <span
          className={`text-xs font-bold font-body ${
            score <= 40 ? 'text-red-600' : score <= 70 ? 'text-amber-600' : 'text-green-600'
          }`}
        >
          {score}%
        </span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  )
}

export default function Assessment() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)

  const totalAnswered = Object.keys(answers).length
  const allAnswered = totalAnswered === questions.length

  const sScore = categoryScore(answers, 'Strategy')
  const oScore = categoryScore(answers, 'Operations')
  const aScore = categoryScore(answers, 'Alignment')
  const total = overallScore(answers)
  const verdict = getVerdict(total)

  return (
    <section
      id="assessment"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f8f9fc 0%, #f5f3ff 40%, #f8f9fc 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(219,234,254,0.25) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-5 mb-14">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200/70"
          >
            Free Assessment
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold text-slate-800 leading-[1.15] tracking-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            How aligned is your AI transformation with your strategy?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base text-slate-500 max-w-md leading-relaxed font-body"
            style={{ fontFamily: 'var(--font-dm-sans)' }}
          >
            Answer 7 questions. Get an instant score across Strategy, Operations, and Alignment — plus specific recommendations.
          </motion.p>
        </div>

        {/* Quiz / Results */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-5"
            >
              {questions.map((q, qi) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: qi * 0.07 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-body">
                      Q{q.id}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full font-body ${
                        q.category === 'Strategy'
                          ? 'bg-blue-50 text-blue-600 border border-blue-200/60'
                          : q.category === 'Operations'
                          ? 'bg-green-50 text-green-600 border border-green-200/60'
                          : 'bg-violet-50 text-violet-600 border border-violet-200/60'
                      }`}
                    >
                      {q.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-800 mb-4 leading-snug font-body">
                    {q.question}
                  </p>
                  <div className="flex flex-col gap-2">
                    {q.options.map((opt, oi) => {
                      const selected = answers[q.id] === opt.score
                      return (
                        <button
                          key={oi}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.score }))}
                          className={`w-full text-left px-4 py-3 rounded-xl text-sm font-body leading-snug transition-all duration-150 border ${
                            selected
                              ? 'bg-blue-50 border-blue-300 text-blue-800 font-medium'
                              : 'bg-white/70 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Progress */}
              <div className="flex items-center gap-3 justify-center text-sm text-slate-400 font-body mt-2">
                <span>{totalAnswered} / {questions.length} answered</span>
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-400 rounded-full transition-all duration-300"
                    style={{ width: `${(totalAnswered / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-center mt-4">
                <button
                  disabled={!allAnswered}
                  onClick={() => setSubmitted(true)}
                  className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all duration-200 ${
                    allAnswered
                      ? 'bg-slate-800 text-white hover:bg-slate-700 shadow-md hover:shadow-lg cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  See my results
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
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
              {/* Overall score */}
              <div className={`rounded-2xl p-8 border ${verdict.bg} ${verdict.border}`}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className={`text-5xl font-bold font-display ${verdict.color}`}
                    style={{ fontFamily: 'var(--font-newsreader)' }}
                  >
                    {total}
                  </span>
                  <span className={`text-lg font-medium ${verdict.color} font-body`}>/ 100</span>
                </div>
                <p className={`text-base leading-relaxed font-body ${verdict.color}`}>{verdict.text}</p>
              </div>

              {/* Category bars */}
              <div className="glass-card rounded-2xl p-7 flex flex-col gap-5">
                <h3
                  className="text-base font-semibold text-slate-700 font-display"
                  style={{ fontFamily: 'var(--font-newsreader)' }}
                >
                  Score breakdown
                </h3>
                <ScoreBar
                  label="Strategy"
                  score={sScore}
                  color={sScore <= 40 ? 'bg-red-400' : sScore <= 70 ? 'bg-amber-400' : 'bg-blue-500'}
                />
                <ScoreBar
                  label="Operations"
                  score={oScore}
                  color={oScore <= 40 ? 'bg-red-400' : oScore <= 70 ? 'bg-amber-400' : 'bg-green-500'}
                />
                <ScoreBar
                  label="Alignment"
                  score={aScore}
                  color={aScore <= 40 ? 'bg-red-400' : aScore <= 70 ? 'bg-amber-400' : 'bg-violet-500'}
                />
              </div>

              {/* Email capture / CTA */}
              {!emailSubmitted ? (
                <div className="glass-card rounded-2xl p-7">
                  <h3
                    className="font-display text-xl font-semibold text-slate-800 mb-2"
                    style={{ fontFamily: 'var(--font-newsreader)' }}
                  >
                    Want a full audit with specific recommendations?
                  </h3>
                  <p className="text-sm text-slate-500 mb-6 font-body">
                    Book a Free Discovery Call. I&rsquo;ll look at your specific situation and tell you honestly whether my approach fits.
                  </p>

                  {!showEmailForm ? (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setShowEmailForm(true)}
                        className="flex-1 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        Book a Discovery Call
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path d="M2.5 7.5h10M8 3l4.5 4.5L8 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        if (email) setEmailSubmitted(true)
                      }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition-all font-body placeholder:text-slate-400"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                      >
                        Send results
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full text-center glass-card rounded-2xl p-10"
                >
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M4 11l5 5 9-9" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3
                    className="font-display text-xl font-semibold text-slate-800 mb-2"
                    style={{ fontFamily: 'var(--font-newsreader)' }}
                  >
                    Got it.
                  </h3>
                  <p className="text-sm text-slate-500 font-body">
                    I&rsquo;ll reach out to {email} within 24 hours to schedule your discovery call.
                  </p>
                </motion.div>
              )}

              {/* Retake */}
              <button
                onClick={() => {
                  setSubmitted(false)
                  setAnswers({})
                  setEmailSubmitted(false)
                  setEmail('')
                  setShowEmailForm(false)
                }}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors duration-150 font-body text-center"
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
