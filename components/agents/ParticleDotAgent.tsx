'use client'

import { useRef, useEffect, useCallback } from 'react'
import { AgentType } from '@/data/agents'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ParticleDotAgentProps {
  type: AgentType
  size?: number        // canvas CSS width in px (height = size * 1.25)
  interactive?: boolean
}

type DotGroup = 'head' | 'visor' | 'face' | 'body' | 'arm' | 'platform'

interface Dot {
  x: number; y: number
  baseX: number; baseY: number
  vx: number; vy: number
  opacity: number; baseOpacity: number
  radius: number; color: string
  phase: number; freq: number
  group: DotGroup
  // platform-only
  pAngle?: number; pRX?: number; pRY?: number
  pCX?: number; pCY?: number; pSpeed?: number
  // broken-only
  detaching?: boolean
}

interface ShadeSet {
  s0: string; s1: string; s2: string; s3: string; s4: string
  visorBg: string; visorGlow: string
  platform: string[]
}

// ─── Color Palettes (5 shades: darkest → lightest, visor bg, visor glow, platform) ──

const SHADES: Record<AgentType, ShadeSet> = {
  broken: {
    s0: '#78350f', s1: '#92400e', s2: '#d97706', s3: '#f59e0b', s4: '#fcd34d',
    visorBg: '#1c0800', visorGlow: '#fef9c3',
    platform: ['#fcd34d', '#f59e0b', '#d97706', '#b45309', '#78350f'],
  },
  operational: {
    s0: '#052e16', s1: '#14532d', s2: '#15803d', s3: '#22c55e', s4: '#86efac',
    visorBg: '#021a0e', visorGlow: '#dcfce7',
    platform: ['#86efac', '#22c55e', '#16a34a', '#15803d', '#14532d'],
  },
  strategic: {
    s0: '#1e3a8a', s1: '#1e40af', s2: '#2563eb', s3: '#60a5fa', s4: '#bae6fd',
    visorBg: '#0a1628', visorGlow: '#e0f2fe',
    platform: ['#bae6fd', '#60a5fa', '#3b82f6', '#2563eb', '#1e40af'],
  },
  infinite: {
    s0: '#3b0764', s1: '#4c1d95', s2: '#7c3aed', s3: '#a78bfa', s4: '#ede9fe',
    visorBg: '#1a0438', visorGlow: '#f5f3ff',
    platform: ['#ede9fe', '#a78bfa', '#7c3aed', '#4c1d95', '#3b0764'],
  },
  messenger: {
    s0: '#3b0764', s1: '#4c1d95', s2: '#7c3aed', s3: '#a78bfa', s4: '#ede9fe',
    visorBg: '#1a0438', visorGlow: '#f5f3ff',
    platform: ['#ede9fe', '#a78bfa', '#7c3aed', '#4c1d95', '#3b0764'],
  },
}

// ─── Base geometry (all coordinates in 200×250 space, then scaled) ──────────

// Head: large oval, 35% of 250 = ~87px tall
const HCX = 100, HCY = 76, HRX = 65, HRY = 43
// Visor: inner dark oval on face
const VCX = 100, VCY = 78, VRX = 47, VRY = 28
// Eyes (base coords on visor)
const EYE_L = { x: 83, y: 69 }
const EYE_R = { x: 117, y: 69 }
// Smile arc: center above the arc so the curve dips down (happy smile)
const SMILE_CX = 100, SMILE_CY = 70, SMILE_R = 18
const SMILE_A0 = Math.PI * 0.22, SMILE_A1 = Math.PI * 0.78
// Antennae
const ANT_L_BASE = { x: 85, y: 33 }, ANT_L_TIP = { x: 74, y: 5 }
const ANT_R_BASE = { x: 115, y: 33 }, ANT_R_TIP = { x: 126, y: 5 }
// Body: compact ellipse below head
const BCX = 100, BCY = 158, BRX = 37, BRY = 26
// Arms
const ARM_L_ROOT = { x: 63, y: 149 }, ARM_L_TIP = { x: 34, y: 162 }
const ARM_R_ROOT = { x: 137, y: 149 }, ARM_R_TIP = { x: 166, y: 162 }
// Platform ellipse center
const PCX = 100, PCY = 220

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Map a position to one of 5 shades via upper-right lighting model */
function shadeAt(bx: number, by: number, cx: number, cy: number, s: ShadeSet): string {
  const nx = (bx - cx) / 90
  const ny = (by - cy) / 90
  const t = nx * 0.62 + ny * -0.78   // dot with (upper-right) light dir
  const idx = Math.round((t + 1) * 2) // -1→0, 0→2, 1→4
  return [s.s0, s.s1, s.s2, s.s3, s.s4][Math.max(0, Math.min(4, idx))]
}

function inEllipse(x: number, y: number, cx: number, cy: number, rx: number, ry: number): boolean {
  return ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1
}

function randEllipse(cx: number, cy: number, rx: number, ry: number): [number, number] {
  const a = Math.random() * Math.PI * 2
  const r = Math.sqrt(Math.random())
  return [cx + Math.cos(a) * r * rx, cy + Math.sin(a) * r * ry]
}

// ─── Dot factory ─────────────────────────────────────────────────────────────

function mkDot(
  bx: number, by: number, color: string, group: DotGroup,
  scale: number, op?: number, r?: number,
): Dot {
  const x = bx * scale, y = by * scale
  const opacity = op ?? (0.55 + Math.random() * 0.45)
  return {
    x, y, baseX: x, baseY: y, vx: 0, vy: 0,
    opacity, baseOpacity: opacity,
    radius: Math.max(0.7, (r ?? (1.4 + Math.random() * 1.0)) * Math.min(1.1, scale * 0.9)),
    color, phase: Math.random() * Math.PI * 2, freq: 0.25 + Math.random() * 0.5,
    group,
  }
}

// ─── Build all dots for the robot ────────────────────────────────────────────

function buildDots(shades: ShadeSet, scale: number, type: AgentType): Dot[] {
  const dots: Dot[] = []
  const s = shades

  // ── ANTENNAE stems ──
  for (let i = 0; i < 6; i++) {
    const t = i / 5
    const jx = (Math.random() - 0.5) * 1.5, jy = (Math.random() - 0.5) * 1.5
    dots.push(mkDot(
      ANT_L_BASE.x + (ANT_L_TIP.x - ANT_L_BASE.x) * t + jx,
      ANT_L_BASE.y + (ANT_L_TIP.y - ANT_L_BASE.y) * t + jy,
      s.s2, 'head', scale, 0.65, 1.2,
    ))
    dots.push(mkDot(
      ANT_R_BASE.x + (ANT_R_TIP.x - ANT_R_BASE.x) * t + jx,
      ANT_R_BASE.y + (ANT_R_TIP.y - ANT_R_BASE.y) * t + jy,
      s.s2, 'head', scale, 0.65, 1.2,
    ))
  }

  // ── ANTENNA BALLS (tip spheres) ──
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2, r = 4.5 + Math.random() * 2
    dots.push(mkDot(
      ANT_L_TIP.x + Math.cos(a) * r, ANT_L_TIP.y + Math.sin(a) * r * 0.75,
      s.s4, 'head', scale, 0.85, 1.9,
    ))
    dots.push(mkDot(
      ANT_R_TIP.x + Math.cos(a) * r, ANT_R_TIP.y + Math.sin(a) * r * 0.75,
      s.s4, 'head', scale, 0.85, 1.9,
    ))
  }
  // Center antenna ball dots
  dots.push(mkDot(ANT_L_TIP.x, ANT_L_TIP.y, s.visorGlow, 'head', scale, 0.9, 2.0))
  dots.push(mkDot(ANT_R_TIP.x, ANT_R_TIP.y, s.visorGlow, 'head', scale, 0.9, 2.0))

  // ── HEAD OVAL (excluding visor region) ──
  let placed = 0, att = 0
  while (placed < 160 && att < 5000) {
    att++
    const [bx, by] = randEllipse(HCX, HCY, HRX, HRY)
    if (inEllipse(bx, by, VCX, VCY, VRX, VRY)) continue
    const nx = (bx - HCX) / HRX, ny = (by - HCY) / HRY
    const edgeDist = Math.sqrt(nx * nx + ny * ny)
    // Sparser at edges (dissolve look)
    if (Math.random() < edgeDist * 0.42) continue
    const color = shadeAt(bx, by, HCX, HCY, s)
    const op = 0.5 + Math.random() * 0.5 - edgeDist * 0.12
    dots.push(mkDot(bx, by, color, 'head', scale, op))
    placed++
  }

  // ── VISOR BACKGROUND (dark inner face) ──
  placed = 0; att = 0
  while (placed < 55 && att < 2000) {
    att++
    const [bx, by] = randEllipse(VCX, VCY, VRX, VRY)
    const nx = (bx - VCX) / VRX, ny = (by - VCY) / VRY
    const edgeDist = Math.sqrt(nx * nx + ny * ny)
    if (Math.random() < edgeDist * 0.25) continue
    dots.push(mkDot(bx, by, s.visorBg, 'visor', scale, 0.8 + Math.random() * 0.2))
    placed++
  }

  // ── EYES ──
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2, r = 3.5
    dots.push(mkDot(EYE_L.x + Math.cos(a) * r, EYE_L.y + Math.sin(a) * r * 0.8, s.visorGlow, 'face', scale, 0.95, 1.8))
    dots.push(mkDot(EYE_R.x + Math.cos(a) * r, EYE_R.y + Math.sin(a) * r * 0.8, s.visorGlow, 'face', scale, 0.95, 1.8))
  }
  dots.push(mkDot(EYE_L.x, EYE_L.y, s.visorGlow, 'face', scale, 1.0, 2.2))
  dots.push(mkDot(EYE_R.x, EYE_R.y, s.visorGlow, 'face', scale, 1.0, 2.2))

  // ── SMILE ARC ──
  for (let i = 0; i <= 11; i++) {
    const a = SMILE_A0 + (SMILE_A1 - SMILE_A0) * (i / 11)
    dots.push(mkDot(
      SMILE_CX + Math.cos(a) * SMILE_R,
      SMILE_CY + Math.sin(a) * SMILE_R * 0.72,
      s.visorGlow, 'face', scale, 0.9, 1.6,
    ))
  }

  // ── NECK (short connector between head and body) ──
  const neckTop = HCY + HRY, neckBot = BCY - BRY
  for (let i = 0; i < 5; i++) {
    const t = i / 4
    dots.push(mkDot(
      98 + Math.random() * 4,
      neckTop + (neckBot - neckTop) * t,
      s.s1, 'body', scale, 0.45, 1.1,
    ))
  }

  // ── BODY ──
  placed = 0; att = 0
  while (placed < 82 && att < 2500) {
    att++
    const [bx, by] = randEllipse(BCX, BCY, BRX, BRY)
    const nx = (bx - BCX) / BRX, ny = (by - BCY) / BRY
    const edgeDist = Math.sqrt(nx * nx + ny * ny)
    if (Math.random() < edgeDist * 0.38) continue
    const color = shadeAt(bx, by, BCX, BCY, s)
    dots.push(mkDot(bx, by, color, 'body', scale, 0.55 + Math.random() * 0.45))
    placed++
  }

  // ── CHEST EMBLEM (bright ring on body) ──
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2, r = 4.5 + Math.random() * 4
    dots.push(mkDot(BCX + Math.cos(a) * r, BCY - 4 + Math.sin(a) * r * 0.8, s.s4, 'body', scale, 0.9, 1.5))
  }
  dots.push(mkDot(BCX, BCY - 4, s.visorGlow, 'body', scale, 1.0, 2.0))

  // ── ARMS (dot lines from body to hands) ──
  for (let i = 0; i < 10; i++) {
    const t = i / 9, jitter = (Math.random() - 0.5) * 2.5
    dots.push(mkDot(
      ARM_L_ROOT.x + (ARM_L_TIP.x - ARM_L_ROOT.x) * t + jitter,
      ARM_L_ROOT.y + (ARM_L_TIP.y - ARM_L_ROOT.y) * t + jitter * 0.4,
      s.s1, 'arm', scale, 0.6, 1.4,
    ))
    dots.push(mkDot(
      ARM_R_ROOT.x + (ARM_R_TIP.x - ARM_R_ROOT.x) * t + jitter,
      ARM_R_ROOT.y + (ARM_R_TIP.y - ARM_R_ROOT.y) * t + jitter * 0.4,
      s.s3, 'arm', scale, 0.6, 1.4,
    ))
  }

  // ── HAND BALLS ──
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2, r = 4.5 + Math.random() * 3
    dots.push(mkDot(ARM_L_TIP.x + Math.cos(a) * r * 0.9, ARM_L_TIP.y + Math.sin(a) * r * 0.75, s.s2, 'arm', scale, 0.7, 1.6))
    dots.push(mkDot(ARM_R_TIP.x + Math.cos(a) * r * 0.9, ARM_R_TIP.y + Math.sin(a) * r * 0.75, s.s2, 'arm', scale, 0.7, 1.6))
  }
  // Hand center dots
  dots.push(mkDot(ARM_L_TIP.x, ARM_L_TIP.y, s.s3, 'arm', scale, 0.85, 2.0))
  dots.push(mkDot(ARM_R_TIP.x, ARM_R_TIP.y, s.s3, 'arm', scale, 0.85, 2.0))

  // ── ENERGY PLATFORM (concentric rotating rings) ──
  const rings: Array<{ rX: number; rY: number; count: number; colorIdx: number; speed: number }> = [
    { rX: 20, rY: 6,  count: 14, colorIdx: 0, speed:  0.004 },
    { rX: 36, rY: 10, count: 22, colorIdx: 2, speed: -0.003 },
    { rX: 54, rY: 14, count: 30, colorIdx: 4, speed:  0.002 },
  ]
  for (const ring of rings) {
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2
      const bx = PCX + Math.cos(angle) * ring.rX
      const by = PCY + Math.sin(angle) * ring.rY
      const op = 0.35 + Math.random() * 0.35
      const d: Dot = {
        x: bx * scale, y: by * scale,
        baseX: bx * scale, baseY: by * scale,
        vx: 0, vy: 0, opacity: op, baseOpacity: op,
        radius: Math.max(0.7, (1.2 + Math.random() * 0.8) * Math.min(1.1, scale * 0.9)),
        color: shades.platform[ring.colorIdx],
        phase: angle, freq: ring.speed,
        group: 'platform',
        pAngle: angle, pRX: ring.rX * scale, pRY: ring.rY * scale,
        pCX: PCX * scale, pCY: PCY * scale, pSpeed: ring.speed,
      }
      dots.push(d)
    }
  }

  return dots
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ParticleDotAgent({
  type,
  size = 160,
  interactive = true,
}: ParticleDotAgentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const stateRef = useRef<{
    dots: Dot[]
    mouseX: number; mouseY: number
    time: number
    hovered: boolean
    scattering: boolean; scatterStart: number
    animId: number
  }>({
    dots: [], mouseX: -999, mouseY: -999, time: 0,
    hovered: false, scattering: false, scatterStart: 0, animId: 0,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W = size
    const H = Math.round(size * 1.25)
    canvas.width = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const scale = W / 200   // base geometry is 200px wide
    const shades = SHADES[type]
    const dots = buildDots(shades, scale, type)
    const s = stateRef.current
    s.dots = dots
    s.time = 0
    s.scattering = false

    // Bob amplitude and period
    const BOB_AMP = 3 * scale
    const BOB_PERIOD = 3  // seconds

    let lastTs = 0

    function loop(ts: number) {
      const dt = Math.min(ts - lastTs, 50)
      lastTs = ts
      s.time += dt * 0.001

      ctx.clearRect(0, 0, W, H)

      const bobY = Math.sin(s.time * (Math.PI * 2 / BOB_PERIOD)) * BOB_AMP

      for (const d of s.dots) {

        // ── Platform: rotate, don't spring ──
        if (d.group === 'platform') {
          d.pAngle! += d.pSpeed! * dt * 0.06
          d.x = d.pCX! + Math.cos(d.pAngle!) * d.pRX!
          d.y = d.pCY! + Math.sin(d.pAngle!) * d.pRY!
          d.baseX = d.x; d.baseY = d.y

          if (s.hovered) {
            d.opacity = Math.min(1, d.baseOpacity * 1.7)
          } else {
            d.opacity = d.baseOpacity * (0.65 + Math.abs(Math.sin(s.time * 1.1 + d.phase)) * 0.35)
          }

        } else {
          // ── Normal dots: spring toward base + drift + bob ──
          const driftX = Math.sin(s.time * d.freq + d.phase) * 0.7
          const driftY = Math.cos(s.time * d.freq * 0.7 + d.phase) * 0.5

          if (s.scattering) {
            const elapsed = ts - s.scatterStart
            if (elapsed < 400) {
              d.x += d.vx; d.y += d.vy
            } else {
              d.vx += (d.baseX - d.x) * 0.08
              d.vy += (d.baseY + bobY - d.y) * 0.08
              d.vx *= 0.84; d.vy *= 0.84
              d.x += d.vx; d.y += d.vy
            }
          } else {
            // ── Broken detach ──
            if (type === 'broken' && d.group !== 'face' && !d.detaching && Math.random() < 0.00018) {
              d.detaching = true
            }
            if (d.detaching) {
              d.vy -= 0.045
              d.vx += (Math.random() - 0.5) * 0.08
              d.opacity -= 0.008
              d.x += d.vx; d.y += d.vy
              if (d.opacity <= 0 || d.y < -15 * scale) {
                d.x = d.baseX; d.y = d.baseY
                d.vx = 0; d.vy = 0
                d.opacity = d.baseOpacity
                d.detaching = false
              }
            } else {
              d.vx += (d.baseX + driftX - d.x) * 0.055
              d.vy += (d.baseY + driftY + bobY - d.y) * 0.055
              d.vx *= 0.83; d.vy *= 0.83
              d.x += d.vx; d.y += d.vy
            }

            // ── Hover push (not on strategic — they only pulse) ──
            if (interactive && s.hovered && type !== 'strategic') {
              const dx = d.x - s.mouseX, dy = d.y - s.mouseY
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < 28 * scale && dist > 0) {
                const str = (1 - dist / (28 * scale)) * 4.5
                d.vx += (dx / dist) * str
                d.vy += (dy / dist) * str
              }
            }
          }

          // ── Opacity modulation ──
          if (!d.detaching) {
            if (s.hovered && (d.group === 'visor' || d.group === 'face')) {
              d.opacity = Math.min(1, d.baseOpacity * 1.35 + 0.15)
            } else if (type === 'strategic') {
              // Strategic: tight brightness pulse
              d.opacity = d.baseOpacity * (0.65 + Math.sin(s.time * 1.6 + d.phase) * 0.35)
            } else {
              d.opacity = d.baseOpacity * (0.82 + Math.sin(s.time * 0.4 + d.phase) * 0.18)
            }
          }
        }

        // ── Draw ──
        ctx.globalAlpha = Math.max(0, Math.min(1, d.opacity))
        ctx.fillStyle = d.color
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1

      // End scatter after 1.4s
      if (s.scattering && ts - s.scatterStart > 1400) {
        s.scattering = false
        for (const d of s.dots) d.opacity = d.baseOpacity
      }

      s.animId = requestAnimationFrame(loop)
    }

    s.animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(s.animId)
  }, [type, size, interactive])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      stateRef.current.mouseX = (e.clientX - rect.left) * (size / rect.width)
      stateRef.current.mouseY = (e.clientY - rect.top) * (size / rect.width)
    },
    [size],
  )

  const handleMouseEnter = useCallback(() => { stateRef.current.hovered = true }, [])
  const handleMouseLeave = useCallback(() => {
    stateRef.current.hovered = false
    stateRef.current.mouseX = -999
    stateRef.current.mouseY = -999
  }, [])

  const handleClick = useCallback(() => {
    if (!interactive) return
    const s = stateRef.current
    if (s.scattering) return
    s.scattering = true
    s.scatterStart = performance.now()
    for (const d of s.dots) {
      if (d.group === 'platform') continue
      const angle = Math.random() * Math.PI * 2
      const speed = 14 + Math.random() * 18
      d.vx = Math.cos(angle) * speed
      d.vy = Math.sin(angle) * speed
    }
  }, [interactive])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: Math.round(size * 1.25), display: 'block' }}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      onClick={interactive ? handleClick : undefined}
    />
  )
}
