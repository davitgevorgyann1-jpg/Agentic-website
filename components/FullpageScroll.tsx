'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

interface Props {
  children: React.ReactNode[]
}

const SECTION_LABELS = [
  'Home',
  'The Problem',
  'The Shift',
  'Strategy',
  'Operations',
  'Your Agent',
  'Your Architect',
  'Assessment',
  'Contact',
]

// ─── Sidebar ──────────────────────────────────────────────────────────────────

// Sizes by rank (0 = closest to cursor)
const RANK_SIZE: { w: number; h: number }[] = [
  { w: 10, h: 52 }, // rank 0 — closest
  { w: 8,  h: 46 }, // rank 1
  { w: 7,  h: 42 }, // rank 2
  { w: 6,  h: 40 }, // rank 3+ default
]
function rankSize(rank: number) {
  return RANK_SIZE[Math.min(rank, RANK_SIZE.length - 1)]
}

// Each slot: wrapper height 52px + 8px gap = 60px
const WRAP_H = 52
const SLOT_H = 60

function SectionProgress({
  current,
  total,
  goTo,
}: {
  current: number
  total: number
  goTo: (i: number) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseY, setMouseY] = useState<number | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove  = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      setMouseY(e.clientY - rect.top)
    }
    const onLeave = () => setMouseY(null)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Center Y of bar i within the container (paddingTop = 10)
  function centerY(i: number) { return 10 + i * SLOT_H + WRAP_H / 2 }

  function closestIdx(): number | null {
    if (mouseY === null) return null
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < total; i++) {
      const d = Math.abs(mouseY - centerY(i))
      if (d < bestDist) { bestDist = d; best = i }
    }
    return best
  }

  const closest = closestIdx()

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: SLOT_H - WRAP_H,  // 8px
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 40,
        cursor: 'pointer',
      }}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current
        const isPast   = i < current
        const rank     = closest !== null ? Math.abs(i - closest) : 999
        const { w, h } = mouseY !== null ? rankSize(rank) : { w: 6, h: 40 }
        const label    = SECTION_LABELS[i] ?? `Section ${i + 1}`
        const showLabel = closest === i && mouseY !== null

        const barBg = isActive
          ? '#ffffff'
          : isPast
          ? 'rgba(255,255,255,0.3)'
          : 'rgba(255,255,255,0.08)'

        return (
          <div
            key={i}
            onClick={() => goTo(i)}
            style={{
              position: 'relative',
              height: WRAP_H,
              display: 'flex',
              alignItems: 'center',
              width: 50,
            }}
          >
            {/* Bar */}
            <div
              style={{
                width: w,
                height: h,
                borderRadius: 3,
                background: barBg,
                boxShadow: isActive ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                transition: 'width 150ms ease, height 150ms ease, background 150ms ease, box-shadow 150ms ease',
                flexShrink: 0,
              }}
            />

            {/* Tooltip — 14px to the right of the bar, only for closest segment */}
            <AnimatePresence>
              {showLabel && (
                <motion.span
                  key="tip"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    left: w + 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    whiteSpace: 'nowrap',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Floating CTA ─────────────────────────────────────────────────────────────

function FloatingCTA({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {/* Label that slides in on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.a
                href="#assessment"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  background: 'rgba(10,10,15,0.9)',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: 4,
                  padding: '5px 10px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                Book a Call
              </motion.a>
            )}
          </AnimatePresence>

          {/* Circle button */}
          <motion.a
            href="#assessment"
            animate={{
              width:      hovered ? 56 : 48,
              height:     hovered ? 56 : 48,
              opacity:    hovered ? 1 : 0.3,
              background: hovered ? '#ffffff' : 'transparent',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Calendar
              size={16}
              color={hovered ? '#000000' : '#ffffff'}
              style={{ transition: 'color 300ms ease' }}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Fullpage Scroll ──────────────────────────────────────────────────────────

export default function FullpageScroll({ children }: Props) {
  const [current, setCurrent] = useState(0)
  const isAnimating = useRef(false)
  const total = children.length
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return
      const next = Math.max(0, Math.min(total - 1, index))
      if (next === current) return

      isAnimating.current = true
      setCurrent(next)

      const leaving = sectionRefs.current[current]
      const leavingInner = leaving?.querySelector('.fp-section-scroll') as HTMLElement | null
      if (leavingInner) leavingInner.scrollTop = 0

      setTimeout(() => { isAnimating.current = false }, 1000)
    },
    [current, total],
  )

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (isAnimating.current) return

      const section = sectionRefs.current[current]
      const inner = section?.querySelector('.fp-section-scroll') as HTMLElement | null

      if (inner && inner.scrollHeight > inner.clientHeight + 4) {
        const atTop    = inner.scrollTop <= 2
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 4
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          const delta = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY
          inner.scrollTop += delta
          return
        }
      }

      if (Math.abs(e.deltaY) < 8) return
      if (e.deltaY > 0) goTo(current + 1)
      else goTo(current - 1)
    }

    let touchStartY = 0
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY }
    const onTouchEnd   = (e: TouchEvent) => {
      if (isAnimating.current) return
      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) < 50) return
      const section = sectionRefs.current[current]
      const inner = section?.querySelector('.fp-section-scroll') as HTMLElement | null
      if (inner && inner.scrollHeight > inner.clientHeight + 4) {
        const atTop    = inner.scrollTop <= 2
        const atBottom = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 4
        if ((diff > 0 && !atBottom) || (diff < 0 && !atTop)) return
      }
      if (diff > 0) goTo(current + 1)
      else goTo(current - 1)
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(current + 1) }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(current - 1) }
    }

    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [current, goTo])

  useEffect(() => {
    const section = sectionRefs.current[current]
    const id = section?.querySelector('section')?.id
    if (id) window.history.replaceState(null, '', `#${id}`)
  }, [current])

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <SectionProgress current={current} total={total} goTo={goTo} />
      <FloatingCTA visible={current > 0} />

      <div
        style={{
          transform: `translateY(-${current * 100}vh)`,
          transition: 'transform 700ms cubic-bezier(0.77, 0, 0.175, 1)',
          willChange: 'transform',
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el }}
            style={{ height: '100vh', overflow: 'hidden' }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}
