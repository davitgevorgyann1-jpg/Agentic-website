'use client'

import { motion } from 'framer-motion'

// ─── Dot-silhouette robot with ∞ on chest ─────────────────────────────────────
// Head/body outline: dashed hollow circles (purple-white tint)
// ∞ symbol: bright white filled dots in chest area

function InfiniteBot() {
  return (
    <svg viewBox="0 0 56 64" width="146" height="167" fill="none" style={{ width: 'clamp(80px, 20vw, 146px)', height: 'auto' }}>

      {/* Antenna */}
      <circle cx="28" cy="4"  r="1.5" fill="rgba(34,211,238,0.7)" />
      <circle cx="28" cy="7"  r="1"   fill="rgba(6,182,212,0.5)"  />

      {/* Head — dashed outline rows */}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`hA${i}`} cx={x} cy="10" r="1.3" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      )}
      {[20,23,26,29,32,36].map((x,i) =>
        <circle key={`hB${i}`} cx={x} cy="13" r="1.3" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      )}
      {[20,23,26,29,32,36].map((x,i) =>
        <circle key={`hC${i}`} cx={x} cy="16" r="1.3" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      )}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`hD${i}`} cx={x} cy="19" r="1.3" stroke="rgba(6,182,212,0.5)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
      )}

      {/* Eyes — normal dot eyes */}
      <circle cx="24" cy="14" r="1.8" fill="rgba(103,232,249,0.9)" />
      <circle cx="32" cy="14" r="1.8" fill="rgba(103,232,249,0.9)" />

      {/* Lower body — dashed outline */}
      {[24,28,32].map((x,i) =>
        <circle key={`lb${i}`} cx={x} cy="36" r="1.1" fill="none" stroke="rgba(6,182,212,0.35)" strokeWidth="0.7" strokeDasharray="1.5 1.5" />
      )}

      {/* Arms */}
      <circle cx="15" cy="27" r="1.2" fill="rgba(6,182,212,0.35)" />
      <circle cx="12" cy="29" r="1"   fill="rgba(6,182,212,0.25)" />
      <circle cx="41" cy="27" r="1.2" fill="rgba(6,182,212,0.35)" />
      <circle cx="44" cy="29" r="1"   fill="rgba(6,182,212,0.25)" />

      {/* Legs */}
      <circle cx="24" cy="41" r="1.2" fill="rgba(6,182,212,0.2)" />
      <circle cx="24" cy="44" r="1.2" fill="rgba(6,182,212,0.2)" />
      <circle cx="32" cy="41" r="1.2" fill="rgba(6,182,212,0.2)" />
      <circle cx="32" cy="44" r="1.2" fill="rgba(6,182,212,0.2)" />
    </svg>
  )
}

// ─── Purple dot robot (The Messenger) ────────────────────────────────────────

function MessengerBot() {
  const d = '#5B21B6', m = '#7C3AED', b = '#A78BFA'
  return (
    <svg viewBox="0 0 56 64" width="146" height="167" fill="none" style={{ width: 'clamp(80px, 20vw, 146px)', height: 'auto' }}>
      {/* Antenna */}
      <circle cx="28" cy="4" r="1.8" fill={b} />
      <circle cx="28" cy="7" r="1" fill={m} />
      {/* Round head */}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`h1-${i}`} cx={x} cy="12" r="1.5" fill={m} />
      )}
      {[20,23,26,29,32,36].map((x,i) =>
        <circle key={`h2-${i}`} cx={x} cy="15" r="1.5" fill={m} />
      )}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`h3-${i}`} cx={x} cy="18" r="1.5" fill={d} />
      )}
      {/* Eyes */}
      <circle cx="24" cy="15" r="1.8" fill={b} />
      <circle cx="32" cy="15" r="1.8" fill={b} />
      {/* Body */}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`b1-${i}`} cx={x} cy="23" r="1.5" fill={m} />
      )}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`b2-${i}`} cx={x} cy="26" r="1.5" fill={m} />
      )}
      {[24,27,30,32].map((x,i) =>
        <circle key={`b3-${i}`} cx={x} cy="29" r="1.5" fill={d} />
      )}
      {/* Arms */}
      <circle cx="17" cy="24" r="1.2" fill={m} /><circle cx="14" cy="26" r="1" fill={d} />
      <circle cx="39" cy="24" r="1.2" fill={m} /><circle cx="42" cy="26" r="1" fill={d} />
      {/* Legs */}
      <circle cx="25" cy="33" r="1.2" fill={d} /><circle cx="25" cy="36" r="1.2" fill={d} />
      <circle cx="31" cy="33" r="1.2" fill={d} /><circle cx="31" cy="36" r="1.2" fill={d} />
    </svg>
  )
}

const PURPLE = '#7C3AED'

export default function InfiniteLayer() {
  return (
    <section
      id="agents"
      style={{
        background: '#0a0a0f',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 24px',
      }}
    >

      {/* ─── Top half: The Infinite Agent (48vh) ─────────────── */}
      <div
        style={{
          height: '48vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 1100, width: '100%', textAlign: 'center' }}
        >
          {/* Robot + floating ∞ below */}
          <div style={{ marginBottom: 24, display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <InfiniteBot />
            </motion.div>
            {/* Dotted SVG ∞ — 1.5× size, cyan dashed stroke */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginTop: 10, lineHeight: 0, userSelect: 'none' }}
            >
              <svg viewBox="0 0 120 20" width="110" height="22" fill="none">
                <path
                  d="M60,10 C66,7 112,3 118,10 C112,17 66,13 60,10 C54,7 8,3 2,10 C8,17 54,13 60,10Z"
                  stroke="rgba(6,182,212,0.65)"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>

          {/* Name + status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                border: '1.5px dashed rgba(255,255,255,0.4)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>The Infinite Agent</span>
            <span
              style={{
                fontSize: 9,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '2px 8px',
                borderRadius: 9999,
                color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.3)',
              }}
            >
              PENDING
            </span>
          </div>

          {/* Dialogue */}
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              fontSize: 14,
              lineHeight: 1.8,
              textAlign: 'left',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            I don&apos;t exist yet. But I could. Maybe I monitor regulatory changes in your industry. Maybe I
            optimize your pricing based on competitive data. Maybe I predict churn before it happens. Maybe I
            do something nobody&apos;s ever built before. The agents above are just examples. Every company has
            unique strategic needs, unique processes, and unique blind spots. I&apos;m the agent that fills yours.
          </div>
        </motion.div>
      </div>

      {/* ─── Divider ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 0',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            height: 1,
            width: 192,
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)',
          }}
        />
      </div>

      {/* ─── Bottom: Messenger + 80px breathing room ─────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Messenger content — centered in remaining space */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 1100, width: '100%', textAlign: 'center' }}
          >
            {/* Purple robot */}
            <div style={{ marginBottom: 24, display: 'inline-block', opacity: 0.6 }}>
              <MessengerBot />
            </div>

            {/* Name + status */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <span
                className="animate-pulse-steady"
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: PURPLE,
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 16, fontWeight: 700, color: '#ffffff' }}>The Messenger</span>
              <span
                style={{
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  padding: '2px 8px',
                  borderRadius: 9999,
                  color: PURPLE,
                  border: `1px solid ${PURPLE}66`,
                }}
              >
                SYSTEM
              </span>
            </div>

            {/* Dialogue */}
            <div
              style={{
                maxWidth: 1100,
                margin: '0 auto',
                fontSize: 14,
                lineHeight: 1.8,
                textAlign: 'left',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              I&apos;ve watched every agent on this page. The{' '}
              <span style={{ color: '#D97706' }}>broken</span>{' '}
              ones with no purpose. The{' '}
              <span style={{ color: '#2563EB' }}>strategic</span>{' '}
              ones that actually work. The{' '}
              <span style={{ color: '#16A34A' }}>operational</span>{' '}
              ones connected to something bigger. And the one that doesn&apos;t exist yet.
              Here&apos;s what I&apos;ve learned: none of us can build ourselves. We can&apos;t decide our own
              purpose. We can&apos;t map ourselves to your strategy. We can&apos;t design the system we&apos;re
              part of. That requires someone who understands both the strategy and the technology: someone who
              knows which of us should exist, what purpose to give us, and how to connect us. That&apos;s where{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Davit</span>{' '}
              comes in. He builds us with purpose.
            </div>

            {/* Meet Davit — dispatches custom event, no URL/hash changes */}
            <span
              onClick={() => window.dispatchEvent(new CustomEvent('fp:goto', { detail: { id: 'architect' } }))}
              onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
              onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
              style={{
                display:        'block',
                fontSize:       18,
                fontWeight:     700,
                color:          '#ffffff',
                cursor:         'pointer',
                marginTop:      20,
                textDecoration: 'none',
                textAlign:      'center',
              }}
            >
              Meet Davit ↓
            </span>
          </motion.div>
        </div>

        {/* 80px bottom breathing room */}
        <div style={{ height: 80, flexShrink: 0 }} />

      </div>
    </section>
  )
}
