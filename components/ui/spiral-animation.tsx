'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

// ─── FULL SPIRAL ANIMATION (complex class-based, loops forming phase only) ───

class Vector2D {
  constructor(public x: number, public y: number) {}
  static random(min: number, max: number): number {
    return min + Math.random() * (max - min)
  }
}

class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

class AnimationController {
  private timeline: gsap.core.Timeline
  public time = 0
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private size: number
  private spiralStars: SpiralStar[] = []

  public readonly changeEventTime = 0.32
  public readonly cameraZ = -400
  public readonly cameraTravelDistance = 3400
  private readonly startDotYOffset = 28
  public readonly viewZoom = 100
  private readonly numberOfStars = 5000
  private readonly trailLength = 80

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, _dpr: number, size: number) {
    this.canvas = canvas
    this.ctx = ctx
    this.size = size
    this.timeline = gsap.timeline()

    const origRandom = Math.random
    let seed = 1234
    Math.random = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    for (let i = 0; i < this.numberOfStars; i++) {
      this.spiralStars.push(new SpiralStar(this.cameraZ, this.cameraTravelDistance))
    }
    Math.random = origRandom

    this.setupTimeline()
  }

  private setupTimeline() {
    // Loop ONLY the forming phase (0 → 0.30) — stops before the scatter event
    this.timeline.to(this, {
      time: 0.30,
      duration: 4.5,
      repeat: -1,
      ease: 'none',
      onUpdate: () => this.render(),
    })
  }

  public ease(p: number, g: number): number {
    return p < 0.5 ? 0.5 * Math.pow(2 * p, g) : 1 - 0.5 * Math.pow(2 * (1 - p), g)
  }

  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5
    if (x <= 0) return 0
    if (x >= 1) return 1
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1
  }

  public map(value: number, start1: number, stop1: number, start2: number, stop2: number): number {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  }

  public constrain(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  public lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t
  }

  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1)
    p = this.ease(p, 1.8)
    const theta = 2 * Math.PI * 6 * Math.sqrt(p)
    const r = 170 * Math.sqrt(p)
    return new Vector2D(r * Math.cos(theta), r * Math.sin(theta) + this.startDotYOffset)
  }

  public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2)
    const dx = v1.x - middle.x
    const dy = v1.y - middle.y
    const angle = Math.atan2(dy, dx)
    const o = orientation ? -1 : 1
    const r = Math.sqrt(dx * dx + dy * dy)
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p)
    return new Vector2D(
      middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    )
  }

  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance
    if (position.z > newCameraZ) {
      const depth = position.z - newCameraZ
      const x = this.viewZoom * position.x / depth
      const y = this.viewZoom * position.y / depth
      const sw = 400 * sizeFactor / depth
      this.ctx.lineWidth = sw
      this.ctx.beginPath()
      this.ctx.arc(x, y, 0.5, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = this.cameraZ * this.startDotYOffset / this.viewZoom
      this.showProjectedDot(new Vector3D(0, dy, this.cameraTravelDistance), 2.5)
    }
  }

  public render() {
    const ctx = this.ctx
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, this.size, this.size)
    ctx.save()
    ctx.translate(this.size / 2, this.size / 2)

    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1)
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1)

    ctx.rotate(-Math.PI * this.ease(t2, 2.7))
    this.drawTrail(t1)

    ctx.fillStyle = 'white'
    for (const star of this.spiralStars) {
      star.render(t1, this)
    }
    this.drawStartDot()
    ctx.restore()
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1)
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f
      this.ctx.fillStyle = 'white'
      this.ctx.lineWidth = sw
      const pathTime = t1 - 0.00015 * i
      const position = this.spiralPath(pathTime)
      const offset = new Vector2D(position.x + 5, position.y + 5)
      const rotated = this.rotate(position, offset, Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5, i % 2 === 0)
      this.ctx.beginPath()
      this.ctx.arc(rotated.x, rotated.y, sw / 2, 0, Math.PI * 2)
      this.ctx.fill()
    }
  }

  public destroy() {
    this.timeline.kill()
  }
}

class SpiralStar {
  private dx: number
  private dy: number
  spiralLocation: number
  private strokeWeightFactor: number
  private z: number
  private angle: number
  private distance: number
  private rotationDirection: number
  private expansionRate: number
  private finalScale: number

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2
    this.distance = 30 * Math.random() + 15
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1
    this.expansionRate = 1.2 + Math.random() * 0.8
    this.finalScale = 0.7 + Math.random() * 0.6
    this.dx = this.distance * Math.cos(this.angle)
    this.dy = this.distance * Math.sin(this.angle)
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ)
    this.z = this.z * 0.7 + (cameraTravelDistance / 2) * 0.3 * this.spiralLocation
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0)
  }

  render(p: number, ctrl: AnimationController) {
    const spiralPos = ctrl.spiralPath(this.spiralLocation)
    const q = p - this.spiralLocation
    if (q > 0) {
      const dp = ctrl.constrain(4 * q, 0, 1)
      let easing: number
      if (dp < 0.3) easing = ctrl.lerp(dp, Math.pow(dp, 2), dp / 0.3)
      else if (dp < 0.7) easing = ctrl.lerp(Math.pow(dp, 2), ctrl.easeOutElastic(dp), (dp - 0.3) / 0.4)
      else easing = ctrl.easeOutElastic(dp)

      let screenX: number, screenY: number
      if (dp < 0.3) {
        screenX = ctrl.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3)
        screenY = ctrl.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3)
      } else if (dp < 0.7) {
        const mid = (dp - 0.3) / 0.4
        const curve = Math.sin(mid * Math.PI) * this.rotationDirection * 1.5
        screenX = ctrl.lerp(spiralPos.x + this.dx * 0.3, spiralPos.x + this.dx * 0.7, mid) + (-this.dy * 0.4 * curve * mid)
        screenY = ctrl.lerp(spiralPos.y + this.dy * 0.3, spiralPos.y + this.dy * 0.7, mid) + (this.dx * 0.4 * curve * mid)
      } else {
        const fin = (dp - 0.7) / 0.3
        const tDist = this.distance * this.expansionRate * 1.5
        const sAngle = this.angle + 1.2 * this.rotationDirection * fin * Math.PI
        screenX = ctrl.lerp(spiralPos.x + this.dx * 0.7, spiralPos.x + tDist * Math.cos(sAngle), fin)
        screenY = ctrl.lerp(spiralPos.y + this.dy * 0.7, spiralPos.y + tDist * Math.sin(sAngle), fin)
      }

      const vx = (this.z - ctrl['cameraZ']) * screenX / ctrl['viewZoom']
      const vy = (this.z - ctrl['cameraZ']) * screenY / ctrl['viewZoom']
      const pos = new Vector3D(vx, vy, this.z)

      let sizeMult = dp < 0.6 ? 1.0 + dp * 0.2 : 1.2 * (1 - (dp - 0.6) / 0.4) + this.finalScale * ((dp - 0.6) / 0.4)
      ctrl.showProjectedDot(pos, 8.5 * this.strokeWeightFactor * sizeMult)
    }
  }
}

export function SpiralAnimationFull({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctrlRef = useRef<AnimationController | null>(null)
  const [dims, setDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => setDims({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!dims.width || !dims.height) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const size = Math.max(dims.width, dims.height)
    canvas.width = size * dpr
    canvas.height = size * dpr
    canvas.style.width = `${dims.width}px`
    canvas.style.height = `${dims.height}px`
    ctx.scale(dpr, dpr)

    ctrlRef.current?.destroy()
    ctrlRef.current = new AnimationController(canvas, ctx, dpr, size)

    return () => {
      ctrlRef.current?.destroy()
      ctrlRef.current = null
    }
  }, [dims])

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}

interface Star {
  x: number
  y: number
  z: number
  prevZ: number
}

interface SpiralAnimationProps {
  className?: string
  starCount?: number
  speed?: number
  onComplete?: () => void
}

export function SpiralAnimation({
  className = '',
  starCount = 5000,
  speed = 1,
  onComplete,
}: SpiralAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animFrameRef = useRef<number>(0)
  const speedRef = useRef(speed)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const update = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    if (!size.width || !size.height) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = size

    // Initialize stars
    const initStar = (): Star => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width,
      prevZ: 0,
    })

    starsRef.current = Array.from({ length: starCount }, initStar)

    const render = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      for (const star of starsRef.current) {
        star.prevZ = star.z
        star.z -= speedRef.current

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
          star.z = width
          star.prevZ = width
        }

        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * width + cy
        const px = (star.x / star.prevZ) * width + cx
        const py = (star.y / star.prevZ) * width + cy

        const size = Math.max(0.5, (1 - star.z / width) * 3)
        const opacity = 1 - star.z / width

        ctx.strokeStyle = `rgba(255,255,255,${opacity})`
        ctx.lineWidth = size
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    // Clear to black before starting
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [size, starCount])

  return (
    <canvas
      ref={canvasRef}
      width={size.width}
      height={size.height}
      className={className}
      style={{ display: 'block', background: 'black' }}
    />
  )
}

interface SpiralDemoProps {
  onEnter?: () => void
}

export function SpiralDemo({ onEnter }: SpiralDemoProps) {
  const [entered, setEntered] = useState(false)
  const [speed, setSpeed] = useState(1)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleEnter = () => {
    if (!buttonRef.current) return

    // Accelerate stars on click
    gsap.to({ val: 1 }, {
      val: 20,
      duration: 1.2,
      ease: 'power3.in',
      onUpdate: function () {
        setSpeed(this.targets()[0].val)
      },
      onComplete: () => {
        setEntered(true)
        onEnter?.()
      },
    })

    // Fade out button
    gsap.to(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in',
    })
  }

  if (entered) return null

  return (
    <div className="relative w-full h-full">
      <SpiralAnimation className="absolute inset-0" speed={speed} />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="px-10 py-4 border border-white/40 text-white text-sm font-semibold tracking-[0.2em] uppercase backdrop-blur-sm rounded-full hover:bg-white/10 transition-colors duration-300"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          Enter
        </button>
      </div>
    </div>
  )
}

// ─── CARD SPIRAL ─────────────────────────────────────────────────────────────
// Compact starfield for agent card backgrounds. Color-coded per agent type.

type AgentColor = 'amber' | 'green' | 'blue' | 'violet'

const COLOR_MAP: Record<AgentColor, [number, number, number]> = {
  amber:  [245, 158,  11],
  green:  [ 34, 197,  94],
  blue:   [ 59, 130, 246],
  violet: [139,  92, 246],
}

interface CardSpiralProps {
  color?: AgentColor
  hovered?: boolean
  size?: number
}

export function CardSpiral({ color = 'blue', hovered = false, size = 140 }: CardSpiralProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const speedRef  = useRef(0.4)
  const starsRef  = useRef<Star[]>([])
  const frameRef  = useRef(0)
  const tweenRef  = useRef<gsap.core.Tween | null>(null)

  const initStar = useCallback((): Star => ({
    x: Math.random() * size - size / 2,
    y: Math.random() * size - size / 2,
    z: Math.random() * size,
    prevZ: 0,
  }), [size])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const [r, g, b] = COLOR_MAP[color]
    const cx = size / 2
    const cy = size / 2

    starsRef.current = Array.from({ length: 180 }, initStar)
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.fillRect(0, 0, size, size)

    const render = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.25)'
      ctx.fillRect(0, 0, size, size)

      for (const star of starsRef.current) {
        star.prevZ = star.z
        star.z -= speedRef.current

        if (star.z <= 0) {
          star.x = Math.random() * size - size / 2
          star.y = Math.random() * size - size / 2
          star.z = size
          star.prevZ = size
        }

        const sx = (star.x / star.z) * size + cx
        const sy = (star.y / star.z) * size + cy
        const px = (star.x / star.prevZ) * size + cx
        const py = (star.y / star.prevZ) * size + cy

        const opacity = Math.max(0, 1 - star.z / size)
        const thickness = Math.max(0.5, opacity * 2)

        ctx.strokeStyle = `rgba(${r},${g},${b},${opacity * 0.9})`
        ctx.lineWidth = thickness
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(sx, sy)
        ctx.stroke()
      }

      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frameRef.current)
  }, [color, size, initStar])

  // Accelerate / decelerate on hover
  useEffect(() => {
    tweenRef.current?.kill()
    tweenRef.current = gsap.to(speedRef, {
      current: hovered ? 3.5 : 0.4,
      duration: hovered ? 0.5 : 1.2,
      ease: hovered ? 'power2.in' : 'power2.out',
    })
  }, [hovered])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        display: 'block',
        borderRadius: '50%',
        opacity: hovered ? 0.85 : 0.55,
        transition: 'opacity 0.4s ease',
      }}
    />
  )
}
