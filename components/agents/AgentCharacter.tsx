'use client'

import { AgentType, AgentStatus } from '@/data/agents'

interface AgentCharacterProps {
  type: AgentType
  status: AgentStatus
  size?: 'sm' | 'md' | 'lg'
}

export default function AgentCharacter({ type, status, size = 'md' }: AgentCharacterProps) {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.4 : 1

  if (type === 'broken') return <BrokenAgent status={status} scale={scale} />
  if (type === 'operational') return <OperationalAgent status={status} scale={scale} />
  if (type === 'strategic') return <StrategicAgent status={status} scale={scale} />
  if (type === 'infinite') return <InfiniteAgent scale={scale} />
  return null
}

// ─── BROKEN AGENT ────────────────────────────────────────────────────────────
function BrokenAgent({ status, scale }: { status: AgentStatus; scale: number }) {
  const flickerColor = status === 'red-static' ? '#ef4444' : status === 'amber-dim' ? '#fbbf24' : '#f59e0b'
  const flickerShadow = status === 'red-static'
    ? '0 0 10px rgba(239,68,68,0.8)'
    : status === 'amber-dim'
    ? '0 0 6px rgba(251,191,36,0.4)'
    : '0 0 10px rgba(245,158,11,0.8)'
  const isFlickering = status !== 'amber-dim'

  return (
    <div
      className="relative flex flex-col items-center select-none"
      style={{ width: 80 * scale, height: 100 * scale }}
    >
      {/* Antenna — bent/broken */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: 2 * scale,
          height: 14 * scale,
          background: '#64748b',
          transform: `translateX(-50%) rotate(18deg)`,
          borderRadius: 2,
          transformOrigin: 'bottom center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: `calc(50% + ${4 * scale}px)`,
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: '50%',
          background: flickerColor,
          boxShadow: flickerShadow,
          animation: isFlickering ? 'flicker 2.5s step-end infinite' : undefined,
          opacity: status === 'amber-dim' ? 0.5 : 1,
        }}
      />

      {/* Head */}
      <div
        style={{
          marginTop: 14 * scale,
          width: 56 * scale,
          height: 48 * scale,
          borderRadius: 10 * scale,
          background: 'linear-gradient(160deg, #64748b 0%, #475569 50%, #334155 100%)',
          boxShadow: `
            0 ${4 * scale}px ${12 * scale}px rgba(0,0,0,0.25),
            inset 0 ${1 * scale}px ${2 * scale}px rgba(255,255,255,0.12),
            inset 0 -${2 * scale}px ${4 * scale}px rgba(0,0,0,0.2)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * scale,
          overflow: 'hidden',
        }}
      >
        {/* Scanline overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            pointerEvents: 'none',
          }}
        />

        {/* Eyes row */}
        <div style={{ display: 'flex', gap: 12 * scale, alignItems: 'center' }}>
          {/* Left eye — flickering */}
          <div
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: '50%',
              background: flickerColor,
              boxShadow: flickerShadow,
              animation: 'flicker 2.5s step-end infinite',
            }}
          />
          {/* Right eye — dim */}
          <div
            style={{
              width: 10 * scale,
              height: 8 * scale,
              borderRadius: '50%',
              background: 'rgba(245,158,11,0.3)',
              boxShadow: 'none',
            }}
          />
        </div>

        {/* Mouth — broken/jagged */}
        <div style={{ display: 'flex', gap: 2 * scale, alignItems: 'flex-end' }}>
          {[3, 5, 2, 6, 2].map((h, i) => (
            <div
              key={i}
              style={{
                width: 4 * scale,
                height: h * scale,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Neck */}
      <div
        style={{
          width: 18 * scale,
          height: 6 * scale,
          background: 'linear-gradient(180deg, #475569, #334155)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}
      />

      {/* Body */}
      <div
        style={{
          width: 64 * scale,
          height: 30 * scale,
          borderRadius: `0 0 ${8 * scale}px ${8 * scale}px`,
          background: 'linear-gradient(180deg, #475569 0%, #334155 60%, #1e293b 100%)',
          boxShadow: `
            0 ${4 * scale}px ${12 * scale}px rgba(0,0,0,0.3),
            inset 0 ${1 * scale}px ${2 * scale}px rgba(255,255,255,0.08)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6 * scale,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Chest status light — amber/red flicker */}
        <div
          style={{
            width: 8 * scale,
            height: 8 * scale,
            borderRadius: '50%',
            background: flickerColor,
            boxShadow: flickerShadow,
            animation: 'flicker 1.8s step-end infinite',
          }}
        />
        {/* Body details */}
        <div style={{ display: 'flex', gap: 2 * scale }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4 * scale,
                height: 10 * scale,
                background: 'rgba(255,255,255,0.08)',
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── OPERATIONAL AGENT ───────────────────────────────────────────────────────
function OperationalAgent({ scale }: { status: AgentStatus; scale: number }) {
  return (
    <div
      className="relative flex flex-col items-center select-none animate-float"
      style={{ width: 80 * scale, height: 110 * scale }}
    >
      {/* Connection beam going up */}
      <div
        style={{
          position: 'absolute',
          top: -20 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2 * scale,
          height: 22 * scale,
          background: 'linear-gradient(0deg, rgba(34,197,94,0.8), rgba(34,197,94,0))',
          borderRadius: 2,
        }}
      />

      {/* Antenna — straight, precise */}
      <div
        style={{
          width: 2 * scale,
          height: 14 * scale,
          background: 'linear-gradient(180deg, #22c55e, #4ade80)',
          borderRadius: 2,
          boxShadow: '0 0 6px rgba(34,197,94,0.6)',
        }}
      />
      <div
        style={{
          width: 8 * scale,
          height: 8 * scale,
          borderRadius: '50%',
          background: '#22c55e',
          boxShadow: '0 0 12px rgba(34,197,94,0.9)',
          marginTop: -4 * scale,
        }}
      />

      {/* Head */}
      <div
        style={{
          marginTop: 6 * scale,
          width: 56 * scale,
          height: 48 * scale,
          borderRadius: 10 * scale,
          background: 'linear-gradient(160deg, #e2f5ea 0%, #b8e9c5 40%, #86d9a0 100%)',
          boxShadow: `
            0 ${4 * scale}px ${16 * scale}px rgba(34,197,94,0.2),
            inset 0 ${1 * scale}px ${3 * scale}px rgba(255,255,255,0.8),
            inset 0 -${2 * scale}px ${4 * scale}px rgba(0,0,0,0.08)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * scale,
        }}
      >
        {/* Eyes — bright and alert */}
        <div style={{ display: 'flex', gap: 12 * scale }}>
          <div
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: '50%',
              background: '#15803d',
              boxShadow: '0 0 8px rgba(21,128,61,0.7)',
            }}
          />
          <div
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: '50%',
              background: '#15803d',
              boxShadow: '0 0 8px rgba(21,128,61,0.7)',
            }}
          />
        </div>
        {/* Mouth — straight, functional */}
        <div
          style={{
            width: 22 * scale,
            height: 3 * scale,
            background: '#15803d',
            borderRadius: 2,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Neck */}
      <div
        style={{
          width: 18 * scale,
          height: 6 * scale,
          background: 'linear-gradient(180deg, #86d9a0, #4ade80)',
        }}
      />

      {/* Body */}
      <div
        style={{
          width: 64 * scale,
          height: 30 * scale,
          borderRadius: `0 0 ${8 * scale}px ${8 * scale}px`,
          background: 'linear-gradient(180deg, #b8e9c5 0%, #86d9a0 60%, #4ade80 100%)',
          boxShadow: `
            0 ${4 * scale}px ${12 * scale}px rgba(34,197,94,0.15),
            inset 0 ${1 * scale}px ${2 * scale}px rgba(255,255,255,0.6)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * scale,
        }}
      >
        <div
          style={{
            width: 10 * scale,
            height: 10 * scale,
            borderRadius: '50%',
            background: '#22c55e',
            boxShadow: '0 0 10px rgba(34,197,94,0.9)',
          }}
        />
        <div
          style={{
            width: 20 * scale,
            height: 8 * scale,
            borderRadius: 4,
            background: 'rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: 14 * scale, height: 2 * scale, background: 'rgba(21,128,61,0.5)', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  )
}

// ─── STRATEGIC AGENT ─────────────────────────────────────────────────────────
function StrategicAgent({ scale }: { status: AgentStatus; scale: number }) {
  return (
    <div
      className="relative flex flex-col items-center select-none animate-float"
      style={{ width: 80 * scale, height: 110 * scale }}
    >
      {/* Aura / outer glow */}
      <div
        style={{
          position: 'absolute',
          top: 10 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 72 * scale,
          height: 90 * scale,
          borderRadius: 12 * scale,
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)',
          animation: 'breathe 4s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Antenna — sharp, glowing */}
      <div
        style={{
          width: 2 * scale,
          height: 16 * scale,
          background: 'linear-gradient(180deg, #60a5fa, #3b82f6)',
          borderRadius: 2,
          boxShadow: '0 0 8px rgba(59,130,246,0.8)',
        }}
      />
      {/* Pulse ring on antenna tip */}
      <div style={{ position: 'relative', marginTop: -4 * scale }}>
        <div
          style={{
            width: 10 * scale,
            height: 10 * scale,
            borderRadius: '50%',
            background: '#3b82f6',
            boxShadow: '0 0 14px rgba(59,130,246,1)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: -4 * scale,
            borderRadius: '50%',
            border: `1px solid rgba(59,130,246,0.5)`,
            animation: 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
          }}
        />
      </div>

      {/* Head */}
      <div
        style={{
          marginTop: 4 * scale,
          width: 58 * scale,
          height: 50 * scale,
          borderRadius: 10 * scale,
          background: 'linear-gradient(160deg, #dbeafe 0%, #bfdbfe 40%, #93c5fd 100%)',
          boxShadow: `
            0 ${4 * scale}px ${20 * scale}px rgba(59,130,246,0.25),
            inset 0 ${1 * scale}px ${3 * scale}px rgba(255,255,255,0.9),
            inset 0 -${2 * scale}px ${4 * scale}px rgba(59,130,246,0.15)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * scale,
        }}
      >
        {/* Eyes — confident, glowing blue */}
        <div style={{ display: 'flex', gap: 12 * scale }}>
          <div
            style={{
              width: 12 * scale,
              height: 12 * scale,
              borderRadius: '50%',
              background: '#1d4ed8',
              boxShadow: '0 0 10px rgba(29,78,216,0.9)',
            }}
          />
          <div
            style={{
              width: 12 * scale,
              height: 12 * scale,
              borderRadius: '50%',
              background: '#1d4ed8',
              boxShadow: '0 0 10px rgba(29,78,216,0.9)',
            }}
          />
        </div>
        {/* Mouth — slight upward curve */}
        <div style={{ display: 'flex', gap: 1 * scale }}>
          {[2, 4, 4, 2].map((h, i) => (
            <div
              key={i}
              style={{
                width: 4 * scale,
                height: h * scale,
                background: '#1d4ed8',
                borderRadius: 2,
                opacity: 0.5,
                transform: i < 2 ? `rotate(${-10 + i * 5}deg)` : `rotate(${(i - 2) * 5 + 5}deg)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Neck */}
      <div
        style={{
          width: 18 * scale,
          height: 6 * scale,
          background: 'linear-gradient(180deg, #93c5fd, #60a5fa)',
        }}
      />

      {/* Body */}
      <div
        style={{
          width: 66 * scale,
          height: 32 * scale,
          borderRadius: `0 0 ${8 * scale}px ${8 * scale}px`,
          background: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 50%, #60a5fa 100%)',
          boxShadow: `
            0 ${4 * scale}px ${16 * scale}px rgba(59,130,246,0.2),
            inset 0 ${1 * scale}px ${2 * scale}px rgba(255,255,255,0.7)
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6 * scale,
        }}
      >
        {/* Pulsing chest orb */}
        <div
          style={{
            width: 12 * scale,
            height: 12 * scale,
            borderRadius: '50%',
            background: '#2563eb',
            boxShadow: '0 0 14px rgba(37,99,235,0.9)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
        {/* Strategic lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 * scale }}>
          {[18, 12, 15].map((w, i) => (
            <div
              key={i}
              style={{
                width: w * scale,
                height: 2 * scale,
                background: 'rgba(29,78,216,0.35)',
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── INFINITE AGENT ──────────────────────────────────────────────────────────
function InfiniteAgent({ scale }: { scale: number }) {
  return (
    <div
      className="relative flex flex-col items-center select-none animate-breathe"
      style={{ width: 80 * scale, height: 110 * scale }}
    >
      {/* Outer ethereal glow */}
      <div
        style={{
          position: 'absolute',
          top: 5 * scale,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 80 * scale,
          height: 100 * scale,
          borderRadius: 12 * scale,
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Antenna — ghost outline only */}
      <div
        style={{
          width: 2 * scale,
          height: 14 * scale,
          border: `1px solid rgba(139,92,246,0.4)`,
          borderRadius: 2,
          background: 'transparent',
        }}
      />
      <div
        style={{
          width: 8 * scale,
          height: 8 * scale,
          borderRadius: '50%',
          border: `1.5px solid rgba(139,92,246,0.6)`,
          background: 'transparent',
          marginTop: -4 * scale,
          boxShadow: '0 0 8px rgba(139,92,246,0.3)',
        }}
      />

      {/* Head — outline only */}
      <div
        style={{
          marginTop: 6 * scale,
          width: 56 * scale,
          height: 48 * scale,
          borderRadius: 10 * scale,
          background: 'transparent',
          border: `1.5px solid rgba(139,92,246,0.4)`,
          boxShadow: `
            0 0 20px rgba(139,92,246,0.15),
            inset 0 0 12px rgba(139,92,246,0.05)
          `,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10 * scale,
        }}
      >
        {/* Eyes — just rings */}
        <div style={{ display: 'flex', gap: 12 * scale }}>
          <div
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: '50%',
              border: `1.5px solid rgba(139,92,246,0.5)`,
              background: 'transparent',
            }}
          />
          <div
            style={{
              width: 10 * scale,
              height: 10 * scale,
              borderRadius: '50%',
              border: `1.5px solid rgba(139,92,246,0.5)`,
              background: 'transparent',
            }}
          />
        </div>
        {/* Mouth — dashed line */}
        <div
          style={{
            width: 20 * scale,
            height: 0,
            borderTop: `1.5px dashed rgba(139,92,246,0.4)`,
          }}
        />
      </div>

      {/* Neck — ghost */}
      <div
        style={{
          width: 18 * scale,
          height: 6 * scale,
          border: `1px solid rgba(139,92,246,0.3)`,
          borderTop: 'none',
          borderBottom: 'none',
          background: 'transparent',
        }}
      />

      {/* Body — outline only */}
      <div
        style={{
          width: 64 * scale,
          height: 30 * scale,
          borderRadius: `0 0 ${8 * scale}px ${8 * scale}px`,
          background: 'transparent',
          border: `1.5px solid rgba(139,92,246,0.4)`,
          borderTop: 'none',
          boxShadow: `0 4px 16px rgba(139,92,246,0.1)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8 * scale,
        }}
      >
        {/* Center orb — empty ring */}
        <div
          style={{
            width: 12 * scale,
            height: 12 * scale,
            borderRadius: '50%',
            border: `1.5px solid rgba(139,92,246,0.5)`,
            background: 'transparent',
            boxShadow: '0 0 8px rgba(139,92,246,0.2)',
          }}
        />
      </div>
    </div>
  )
}
