'use client'

import { motion } from 'framer-motion'

// ─── Dashed-outline dot robot (empty interior, pulsing opacity) ──────────────

function InfiniteBot({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {/* Head outline — dashed circle dots */}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`h1-${i}`} cx={x} cy="10" r="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {[20,23,26,29,32,36].map((x,i) =>
        <circle key={`h2-${i}`} cx={x} cy="13" r="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {[20,23,26,29,32,36].map((x,i) =>
        <circle key={`h3-${i}`} cx={x} cy="16" r="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`h4-${i}`} cx={x} cy="19" r="1" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {/* Eyes — hollow */}
      <circle cx="24" cy="14" r="1.8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      <circle cx="32" cy="14" r="1.8" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
      {/* Body outline */}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`b1-${i}`} cx={x} cy="24" r="1" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {[22,25,28,31,34].map((x,i) =>
        <circle key={`b2-${i}`} cx={x} cy="27" r="1" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {[24,28,32].map((x,i) =>
        <circle key={`b3-${i}`} cx={x} cy="30" r="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
      )}
      {/* Arms */}
      <circle cx="17" cy="25" r="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="39" cy="25" r="1" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="1 1" />
      {/* Legs */}
      <circle cx="25" cy="34" r="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="31" cy="34" r="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="25" cy="37" r="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
      <circle cx="31" cy="37" r="1" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" strokeDasharray="1 1" />
    </svg>
  )
}

// ─── Purple dot robot (The Messenger) ────────────────────────────────────────

function MessengerBot({ className }: { className?: string }) {
  const d = '#5B21B6', m = '#7C3AED', b = '#A78BFA'
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
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
    <section className="relative py-24 px-6" style={{ background: '#0a0a0f' }}>
      <div className="max-w-[1100px] mx-auto">

        {/* ─── The Infinite Agent ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-20"
        >
          {/* Pulsing dashed robot */}
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6"
          >
            <InfiniteBot />
          </motion.div>

          {/* Name + status */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="flex-shrink-0"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                border: '1.5px dashed rgba(255,255,255,0.4)',
                display: 'inline-block',
              }}
            />
            <span className="text-[13px] font-bold text-white">The Infinite Agent</span>
            <span
              className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
              style={{
                color: 'rgba(255,255,255,0.5)',
                border: '1px dashed rgba(255,255,255,0.3)',
              }}
            >
              PENDING
            </span>
          </div>

          {/* Always-expanded dialogue */}
          <div
            className="max-w-xl text-[13px] leading-[1.8] text-left"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            I don&apos;t exist yet. I&apos;m the agent your company needs but hasn&apos;t imagined. Maybe I monitor regulatory changes in your industry. Maybe I optimize your pricing in real-time based on competitive data. Maybe I cross-reference customer support patterns with product usage to predict churn before it happens. Maybe I do something nobody&apos;s ever built before. The agents above are just examples. Every company has unique strategic needs, unique processes, and unique blind spots. I&apos;m the agent that fills yours. But first, someone needs to understand your strategy deeply enough to know what I should be. That&apos;s not my job. That&apos;s the architect&apos;s.
          </div>
        </motion.div>

        {/* ─── Divider ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-20"
        >
          <div className="h-px w-48" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)' }} />
        </motion.div>

        {/* ─── The Messenger ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Purple robot */}
          <div className="mb-6" style={{ opacity: 0.8 }}>
            <MessengerBot />
          </div>

          {/* Name + status */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="animate-pulse-steady flex-shrink-0"
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: PURPLE,
                display: 'inline-block',
              }}
            />
            <span className="text-[13px] font-bold text-white">The Messenger</span>
            <span
              className="text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border"
              style={{
                color: PURPLE,
                borderColor: `${PURPLE}66`,
              }}
            >
              SYSTEM
            </span>
          </div>

          {/* Always-expanded dialogue */}
          <div
            className="max-w-xl text-[13px] leading-[1.8] text-left"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            I&apos;ve watched every agent on this page. The broken ones with no purpose. The strategic ones that actually work. The operational ones connected to something bigger. And the one that doesn&apos;t exist yet. Here&apos;s what I&apos;ve learned: none of us can build ourselves. We can&apos;t decide our own purpose. We can&apos;t map ourselves to your strategy. We can&apos;t design the system we&apos;re part of. That requires someone who understands both the strategy and the technology: someone who knows which of us should exist, what purpose to give us, and how to connect us. That&apos;s not an agent. That&apos;s an architect. Meet Davit.
          </div>

          {/* Arrow pointing down to next section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              width="20" height="32" viewBox="0 0 20 32" fill="none"
            >
              <path d="M10 0v24M4 18l6 6 6-6" stroke={PURPLE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
