'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { openCalendly } from '@/lib/calendly'

// ─── TextScramble ────────────────────────────────────────────────────────────

const CHARS = '!<>-_\\/[]{}—=+*^?#________'

interface QueueItem {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

class TextScramble {
  el: HTMLElement
  chars: string
  queue: QueueItem[]
  frame: number
  frameRequest: number
  resolve!: () => void

  constructor(el: HTMLElement) {
    this.el = el
    this.chars = CHARS
    this.queue = []
    this.frame = 0
    this.frameRequest = 0
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve
    })
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)]
          this.queue[i].char = char
        }
        output += `<span class="scramble-dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update())
      this.frame++
    }
  }

  destroy() {
    cancelAnimationFrame(this.frameRequest)
  }
}

// ─── RainingLetters ──────────────────────────────────────────────────────────

const RAIN_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*<>{}[]|/\\~'
const STRATEGIC_WORDS = ['OKR','KPI','ROI','AI','NPS','MRR','ARR','CAC','LTV','CHURN','ALIGN','DRIFT','GOAL','AGENT','AUDIT','STRATEGY','EXECUTE','AUTOMATE','PIPELINE','METRICS','REVENUE','GROWTH','SCALE','VISION','FOCUS','IMPACT','DATA','SIGNAL','MONITOR','TRACK']

interface RainDrop {
  x: number
  speed: number
  delay: number
  char: string
  opacity: number
  flashDelay: number
  flashDuration: number
}

function generateRainDrops(): RainDrop[] {
  const drops: RainDrop[] = []
  const singleCount = 220
  const wordCount = 28

  // Stratified x positions — divide viewport into equal slots with small jitter,
  // then shuffle so assignment is random but coverage is even (no clusters, no gaps)
  const totalStreams = singleCount + wordCount
  const xPositions = Array.from({ length: totalStreams }, (_, i) =>
    ((i + 0.15 + Math.random() * 0.7) / totalStreams) * 100
  )
  for (let i = xPositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[xPositions[i], xPositions[j]] = [xPositions[j], xPositions[i]]
  }

  let xIdx = 0

  // Single character drops
  for (let i = 0; i < singleCount; i++) {
    const flashDuration = 4 + Math.random() * 6
    drops.push({
      x: xPositions[xIdx++],
      speed: 8 + Math.random() * 18,
      delay: Math.random() * -20,
      char: RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)],
      opacity: 0.4,
      // Negative delay = animation starts mid-cycle → gold flashes appear immediately on load
      flashDelay: -(Math.random() * flashDuration),
      flashDuration,
    })
  }

  // Vertical strategic word columns
  for (let i = 0; i < wordCount; i++) {
    const word = STRATEGIC_WORDS[Math.floor(Math.random() * STRATEGIC_WORDS.length)]
    const x = xPositions[xIdx++]
    const speed = 8 + Math.random() * 18
    const baseDelay = Math.random() * -20
    const flashDuration = 4 + Math.random() * 6
    const flashDelay = -(Math.random() * flashDuration)

    // Each letter falls at the same x/speed, staggered so they form a vertical column
    for (let j = 0; j < word.length; j++) {
      drops.push({
        x,
        speed,
        delay: baseDelay - j * 0.6,
        char: word[j],
        opacity: 0.5,
        flashDelay,
        flashDuration,
      })
    }
  }

  return drops
}

// Pre-generate so server & client match
const RAIN_DROPS = generateRainDrops()

// ─── HeroDark Component ─────────────────────────────────────────────────────

const PHRASES = [
  'I lead AI transformations',
  'Starting where nobody else does',
  'Your strategy',
  'Nothing gets automated without a reason',
  'Nothing gets built without a purpose',
  'From strategy to agents. End to end',
]

export default function HeroDark() {
  const textRef = useRef<HTMLSpanElement>(null)
  const scramblerRef = useRef<TextScramble | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!textRef.current) return
    const scrambler = new TextScramble(textRef.current)
    scramblerRef.current = scrambler

    let counter = 0
    let timeout: NodeJS.Timeout

    const next = () => {
      scrambler.setText(PHRASES[counter]).then(() => {
        timeout = setTimeout(next, 2000)
      })
      counter = (counter + 1) % PHRASES.length
    }
    next()

    return () => {
      scrambler.destroy()
      clearTimeout(timeout)
    }
  }, [])

  const scrollDown = useCallback(() => {
    window.dispatchEvent(new CustomEvent('fp:goto', { detail: { id: 'broken' } }))
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Raining characters */}
      {mounted && (
        <div className="rain-container absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {RAIN_DROPS.map((drop, i) => (
            <span
              key={i}
              className="absolute rain-char"
              style={{
                left: `${drop.x}%`,
                fontSize: '1.2rem',
                animation: `rain-fall ${drop.speed}s linear ${drop.delay}s infinite, rain-flash ${drop.flashDuration}s ease-in-out ${drop.flashDelay}s infinite`,
                color: '#475569',
                opacity: drop.opacity,
                fontFamily: 'var(--font-mono)',
                userSelect: 'none',
                willChange: 'transform',
              }}
            >
              {drop.char}
            </span>
          ))}
        </div>
      )}

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto gap-6">
        {/* Scrambling headline */}
        <h1
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight text-white min-h-[1.2em]"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span ref={textRef} />
        </h1>

        {/* Static subtitle */}
        <p
          className="tracking-wide"
          style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', fontFamily: 'var(--font-mono)' }}
        >
          Strategy-Led AI Transformation
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={scrollDown}
            className="px-6 py-2.5 text-sm font-medium bg-white text-black rounded hover:bg-gray-200 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Explore ↓
          </button>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); openCalendly() }}
            className="px-6 py-2.5 text-sm font-medium text-white border border-white/50 rounded hover:border-white hover:bg-white/5 transition-colors"
            style={{ fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
          >
            Book a Discovery Call
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0f)' }}
      />


    </section>
  )
}
