'use client'

import { useRef, useEffect } from 'react'
import { AgentType } from '@/data/agents'

interface EnergyPortalProps {
  width?: number      // canvas CSS width
  hovered?: boolean
  type?: AgentType
}

const PALETTE = {
  broken:      { core: '#fef08a', bright: '#fcd34d', mid: '#f59e0b', warm: '#d97706', deep: '#b45309', dark: '#92400e' },
  operational: { core: '#d1fae5', bright: '#6ee7b7', mid: '#22c55e', warm: '#16a34a', deep: '#14532d', dark: '#052e16' },
  strategic:   { core: '#dbeafe', bright: '#93c5fd', mid: '#3b82f6', warm: '#2563eb', deep: '#1e40af', dark: '#1e3a8a' },
  infinite:    { core: '#ede9fe', bright: '#c4b5fd', mid: '#8b5cf6', warm: '#6d28d9', deep: '#4c1d95', dark: '#3b0764' },
  messenger:   { core: '#ede9fe', bright: '#c4b5fd', mid: '#8b5cf6', warm: '#6d28d9', deep: '#4c1d95', dark: '#3b0764' },
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

interface Orbital { angle: number; speed: number; rX: number; rY: number; size: number; color: string; opacity: number; phase: number }
interface SurfaceSpark { angle: number; rFrac: number; size: number; life: number; speed: number; color: string }

export default function EnergyPortal({ width = 340, hovered = false, type = 'broken' }: EnergyPortalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef  = useRef<{
    orbitals: Orbital[]
    sparks:   SurfaceSpark[]
    ringAngle: number
    time: number
    animId: number
    hovered: boolean
  }>({ orbitals: [], sparks: [], ringAngle: 0, time: 0, animId: 0, hovered: false })

  useEffect(() => { stateRef.current.hovered = hovered }, [hovered])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W   = width
    const H   = Math.round(width * 0.28)
    canvas.width  = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)

    const pal = PALETTE[type] ?? PALETTE.broken
    const [coreR, coreG, coreB]     = hexToRgb(pal.core)
    const [brightR, brightG, brightB] = hexToRgb(pal.bright)
    const [midR, midG, midB]         = hexToRgb(pal.mid)
    const [warmR, warmG, warmB]       = hexToRgb(pal.warm)
    const [deepR, deepG, deepB]       = hexToRgb(pal.deep)

    const cx     = W / 2
    const cy     = H * 0.55
    const baseRX = W * 0.44
    const baseRY = H * 0.30

    const s = stateRef.current

    // ── Init orbital particles (constrained to disc surface) ──
    s.orbitals = Array.from({ length: 30 }, (_, i) => {
      const frac = i / 30
      const rFrac = 0.25 + Math.random() * 0.75
      return {
        angle:   Math.random() * Math.PI * 2,
        speed:   (0.008 + Math.random() * 0.012) * (Math.random() < 0.5 ? 1 : -1),
        rX:      baseRX * rFrac * (0.85 + Math.random() * 0.3),
        rY:      baseRY * rFrac * (0.85 + Math.random() * 0.3),
        size:    0.8 + Math.random() * 1.8,
        color:   [pal.core, pal.bright, pal.mid, pal.warm][Math.floor(frac * 4)],
        opacity: 0.4 + Math.random() * 0.5,
        phase:   Math.random() * Math.PI * 2,
      }
    })

    // ── Init surface sparks (on the disc) ──
    s.sparks = Array.from({ length: 20 }, () => ({
      angle: Math.random() * Math.PI * 2,
      rFrac: 0.15 + Math.random() * 0.85,
      size:  1.0 + Math.random() * 2.5,
      life:  Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      color: Math.random() < 0.5 ? pal.core : pal.bright,
    }))

    s.ringAngle = 0
    s.time      = 0
    let lastTs  = 0

    function loop(ts: number) {
      const dt = Math.min(ts - lastTs, 50)
      lastTs   = ts
      s.time  += dt * 0.001
      const boost  = s.hovered ? 1.6 : 1.0
      const rBoost = s.hovered ? 1.15 : 1.0

      ctx.clearRect(0, 0, W, H)

      const rX = baseRX * rBoost
      const rY = baseRY * rBoost

      // ── 1. Outer halo glow ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, (rY * 1.5) / (rX * 1.5))
      const haloGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rX * 1.5)
      haloGrad.addColorStop(0,   `rgba(${brightR},${brightG},${brightB},${0.15 * boost})`)
      haloGrad.addColorStop(0.5, `rgba(${midR},${midG},${midB},${0.06 * boost})`)
      haloGrad.addColorStop(1,   `rgba(${warmR},${warmG},${warmB},0)`)
      ctx.beginPath()
      ctx.arc(0, 0, rX * 1.5, 0, Math.PI * 2)
      ctx.fillStyle = haloGrad
      ctx.fill()
      ctx.restore()

      // ── 2. Disc fill (solid glowing platform) ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, rY / rX)
      const discGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, rX)
      discGrad.addColorStop(0,    `rgba(${coreR},${coreG},${coreB},${0.60 * boost})`)
      discGrad.addColorStop(0.4,  `rgba(${brightR},${brightG},${brightB},${0.45 * boost})`)
      discGrad.addColorStop(0.75, `rgba(${midR},${midG},${midB},${0.25 * boost})`)
      discGrad.addColorStop(1,    `rgba(${warmR},${warmG},${warmB},${0.08 * boost})`)
      ctx.beginPath()
      ctx.arc(0, 0, rX, 0, Math.PI * 2)
      ctx.fillStyle = discGrad
      ctx.fill()
      ctx.restore()

      // ── 3. Concentric rotating rings ──
      s.ringAngle += 0.004 * boost
      const rings = [
        { fX: 0.35, fY: 0.35, speed:  1.5, col: pal.bright, w: 1.8, op: 0.55 },
        { fX: 0.62, fY: 0.62, speed: -1.0, col: pal.mid,    w: 1.5, op: 0.40 },
        { fX: 0.88, fY: 0.88, speed:  0.6, col: pal.warm,   w: 1.2, op: 0.28 },
      ]
      for (const ring of rings) {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(s.ringAngle * ring.speed)
        ctx.beginPath()
        ctx.ellipse(0, 0, rX * ring.fX, rY * ring.fY, 0, 0, Math.PI * 2)
        ctx.strokeStyle = ring.col
        ctx.globalAlpha = ring.op * boost * 0.9
        ctx.lineWidth   = ring.w
        ctx.stroke()
        ctx.restore()
      }
      ctx.globalAlpha = 1

      // ── 4. Orbital particles (on disc surface) ──
      for (const orb of s.orbitals) {
        orb.angle += orb.speed * boost
        const px = cx + Math.cos(orb.angle) * orb.rX * rBoost
        const py = cy + Math.sin(orb.angle) * orb.rY * rBoost
        const op = orb.opacity * (0.7 + Math.sin(s.time * 1.5 + orb.phase) * 0.3) * boost * 0.85
        ctx.globalAlpha = Math.min(1, op)
        ctx.fillStyle   = orb.color
        ctx.beginPath()
        ctx.arc(px, py, orb.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // ── 5. Surface sparks ──
      for (const sp of s.sparks) {
        sp.life += sp.speed * boost
        const t  = (Math.sin(sp.life) + 1) / 2
        const sz = sp.size * t
        const op = t * 0.9 * (boost > 1 ? 1.0 : 0.7)
        const px = cx + Math.cos(sp.angle) * rX * sp.rFrac
        const py = cy + Math.sin(sp.angle) * rY * sp.rFrac

        if (sz > 0.2) {
          ctx.globalAlpha = op
          ctx.fillStyle   = sp.color
          ctx.beginPath()
          ctx.arc(px, py, sz, 0, Math.PI * 2)
          ctx.fill()
          // Cross glint for bright sparks
          if (t > 0.8 && sp.size > 2) {
            ctx.strokeStyle = sp.color
            ctx.globalAlpha = op * 0.5
            ctx.lineWidth   = 0.8
            ctx.beginPath()
            ctx.moveTo(px - sz * 2, py)
            ctx.lineTo(px + sz * 2, py)
            ctx.moveTo(px, py - sz * 2)
            ctx.lineTo(px, py + sz * 2)
            ctx.stroke()
          }
        }
        // Respawn at new position when cycle completes
        if (sp.life > Math.PI * 4) {
          sp.life  = 0
          sp.angle = Math.random() * Math.PI * 2
          sp.rFrac = 0.15 + Math.random() * 0.85
        }
      }
      ctx.globalAlpha = 1

      // ── 6. Disc rim highlight ──
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, rY / rX)
      ctx.beginPath()
      ctx.arc(0, 0, rX, 0, Math.PI * 2)
      ctx.strokeStyle = pal.core
      ctx.globalAlpha = 0.35 * boost
      ctx.lineWidth   = 1.0
      ctx.stroke()
      ctx.restore()
      ctx.globalAlpha = 1

      s.animId = requestAnimationFrame(loop)
    }

    s.animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(s.animId)
  }, [width, type])

  const H = Math.round(width * 0.28)

  return (
    <canvas
      ref={canvasRef}
      style={{ width, height: H, display: 'block', pointerEvents: 'none' }}
    />
  )
}
