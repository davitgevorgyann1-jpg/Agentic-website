'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Angular Rectangular Dot Robot SVGs (amber) ───────────────────────────────

function RectFlatBot({ className }: { className?: string }) {
  const d = '#92400E', m = '#D97706', b = '#FCD34D'
  const hx = [10,14,18,22,26,30,34,38,42]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="12" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="16" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="20" r="1.5" fill={d} />)}
      <circle cx="18" cy="16" r="2" fill={b} />
      <circle cx="38" cy="16" r="2" fill={b} />
      {hx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="27" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="31" r="1.5" fill={d} />)}
      <circle cx="6" cy="27" r="1.2" fill={m} /><circle cx="6" cy="31" r="1.2" fill={d} />
      <circle cx="50" cy="27" r="1.2" fill={m} /><circle cx="50" cy="31" r="1.2" fill={d} />
      <circle cx="18" cy="36" r="1.2" fill={d} /><circle cx="18" cy="40" r="1.2" fill={d} />
      <circle cx="38" cy="36" r="1.2" fill={d} /><circle cx="38" cy="40" r="1.2" fill={d} />
      <circle cx="3" cy="22" r="0.8" fill={m} opacity="0.35" />
      <circle cx="53" cy="14" r="0.8" fill={b} opacity="0.25" />
    </svg>
  )
}

function RectTallBot({ className }: { className?: string }) {
  const d = '#92400E', m = '#D97706', b = '#FCD34D'
  const hx = [19,24,29,34,39]
  const bx = [22,27,32,37]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      <circle cx="29" cy="5" r="1.8" fill={b} />
      <circle cx="29" cy="9" r="1" fill={m} />
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="13" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="17" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="21" r="1.5" fill={d} />)}
      {hx.map((x,i) => <circle key={`h4-${i}`} cx={x} cy="25" r="1.5" fill={d} />)}
      <circle cx="23" cy="17" r="1.8" fill={b} />
      <circle cx="27" cy="17" r="1.8" fill={b} />
      <circle cx="31" cy="17" r="1.8" fill={b} />
      <circle cx="35" cy="17" r="1.8" fill={b} />
      {bx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="30" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="34" r="1.5" fill={d} />)}
      {bx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="38" r="1.5" fill={d} />)}
      <circle cx="16" cy="31" r="1.2" fill={m} /><circle cx="12" cy="33" r="1" fill={d} />
      <circle cx="44" cy="31" r="1.2" fill={m} /><circle cx="48" cy="33" r="1" fill={d} />
      <circle cx="25" cy="43" r="1.2" fill={d} /><circle cx="25" cy="47" r="1.2" fill={d} />
      <circle cx="33" cy="43" r="1.2" fill={d} /><circle cx="33" cy="47" r="1.2" fill={d} />
      <circle cx="5" cy="23" r="0.8" fill={b} opacity="0.3" />
      <circle cx="51" cy="36" r="0.8" fill={m} opacity="0.25" />
    </svg>
  )
}

function RectBlockBot({ className }: { className?: string }) {
  const d = '#92400E', m = '#D97706', b = '#FCD34D'
  const hx = [16,20,24,28,32,36,40]
  const bx = [11,15,19,23,27,31,35,39,43]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="9" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="13" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="17" r="1.5" fill={d} />)}
      {hx.map((x,i) => <circle key={`h4-${i}`} cx={x} cy="21" r="1.5" fill={d} />)}
      <circle cx="21" cy="13" r="2" fill={b} /><circle cx="25" cy="13" r="2" fill={b} />
      <circle cx="31" cy="13" r="2" fill={b} /><circle cx="35" cy="13" r="2" fill={b} />
      {bx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="27" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="31" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="35" r="1.5" fill={d} />)}
      <circle cx="20" cy="40" r="1.5" fill={d} /><circle cx="24" cy="40" r="1.5" fill={d} />
      <circle cx="20" cy="44" r="1.5" fill={d} /><circle cx="24" cy="44" r="1.5" fill={d} />
      <circle cx="32" cy="40" r="1.5" fill={d} /><circle cx="36" cy="40" r="1.5" fill={d} />
      <circle cx="32" cy="44" r="1.5" fill={d} /><circle cx="36" cy="44" r="1.5" fill={d} />
      <circle cx="5" cy="30" r="0.8" fill={b} opacity="0.3" />
      <circle cx="51" cy="18" r="0.8" fill={m} opacity="0.25" />
    </svg>
  )
}

function RectVisorBot({ className }: { className?: string }) {
  const d = '#92400E', m = '#D97706', b = '#FCD34D', r = '#ef4444', rb = '#fca5a5'
  const hx = [17,21,25,29,33,37,41]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="9" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="13" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="17" r="1.5" fill={d} />)}
      <circle cx="21" cy="13" r="2" fill={rb} />
      <circle cx="25" cy="13" r="2" fill={r} />
      <circle cx="29" cy="13" r="2" fill={r} />
      <circle cx="33" cy="13" r="2" fill={r} />
      <circle cx="37" cy="13" r="2" fill={rb} />
      {[21,25,29,33,37].map((x,i) => <circle key={`b1-${i}`} cx={x} cy="23" r="1.5" fill={m} />)}
      {[21,25,29,33,37].map((x,i) => <circle key={`b2-${i}`} cx={x} cy="27" r="1.5" fill={d} />)}
      {[23,27,31,35].map((x,i) => <circle key={`b3-${i}`} cx={x} cy="31" r="1.5" fill={d} />)}
      <circle cx="17" cy="24" r="1.2" fill={m} /><circle cx="13" cy="26" r="1" fill={d} />
      <circle cx="41" cy="24" r="1.2" fill={m} /><circle cx="45" cy="26" r="1" fill={d} />
      <circle cx="26" cy="36" r="1.2" fill={d} /><circle cx="26" cy="40" r="1.2" fill={d} />
      <circle cx="32" cy="36" r="1.2" fill={d} /><circle cx="32" cy="40" r="1.2" fill={d} />
      <circle cx="3" cy="10" r="0.8" fill={r} opacity="0.4" />
      <circle cx="53" cy="8" r="0.8" fill={rb} opacity="0.3" />
      <circle cx="5" cy="32" r="0.8" fill={r} opacity="0.3" />
    </svg>
  )
}

// ─── Placeholder Robot (dashed outline + question mark) ──────────────────────

function PlaceholderBot({ color }: { color: string }) {
  return (
    <motion.svg
      viewBox="0 0 56 64"
      width="56"
      height="64"
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="13" y="8" width="30" height="16" rx="2"
        fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
      <rect x="16" y="27" width="24" height="14" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 2" />
      <rect x="6" y="29" width="8" height="5" rx="1"
        fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <rect x="42" y="29" width="8" height="5" rx="1"
        fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <rect x="19" y="44" width="7" height="9" rx="1"
        fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <rect x="30" y="44" width="7" height="9" rx="1"
        fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 2" />
      <text x="28" y="17" textAnchor="middle" dominantBaseline="middle"
        fontSize="12" fontFamily="monospace" fontWeight="bold"
        fill={color} fillOpacity="0.4">?</text>
    </motion.svg>
  )
}

const ROBOT_COMPONENTS = [RectFlatBot, RectTallBot, RectBlockBot, RectVisorBot]

// ─── Agent Data ──────────────────────────────────────────────────────────────

interface BrokenAgent {
  name: string
  status: string
  statusColor: string
  quote: string
  dialogue: string
}

const AGENTS: BrokenAgent[] = [
  {
    name: 'The Blind Automator',
    status: 'UNSTABLE',
    statusColor: '#D97706',
    quote: 'I automate support tickets. 200/day. No idea if it matters.',
    dialogue: "Hi. I'm the Blind Automator. I was deployed 6 months ago to handle customer support ticket routing. I process about 200 tickets a day. But your strategy says 'VIP support experience is our key differentiator.' Nobody told me that. I'm automating away the very thing your customers pay a premium for. I don't know your OKRs. I don't know your KPIs. I just route things.",
  },
  {
    name: 'The Orphan Report',
    status: 'ORPHANED',
    statusColor: '#D97706',
    quote: 'I generate 47-page reports. Nobody reads them.',
    dialogue: "I'm the Orphan Report. Every Monday at 6am, I compile a 47-page analytics report. It covers everything. The problem? Your OKRs only reference 6 metrics. I don't know which 6. So I dump everything. Last month, a critical KPI dropped 23%. It was on page 34. Nobody saw it until the quarterly review. By then it was too late.",
  },
  {
    name: 'The Busy Bot',
    status: 'AIMLESS',
    statusColor: '#D97706',
    quote: "I'm very efficient at tasks that might not need to exist.",
    dialogue: "They call me the Busy Bot. I schedule, route, organize, notify, follow up, escalate, process. I handle 14 different workflows across 3 departments. But nobody's ever asked whether these 14 workflows should exist. Two were created for a product line you discontinued last year. I don't question my purpose. I was never built to.",
  },
  {
    name: 'The Disconnected Dashboard',
    status: 'CRITICAL',
    statusColor: '#ef4444',
    quote: 'I track 94 KPIs. Your strategy references 6.',
    dialogue: "I'm beautiful. Real-time data, gorgeous visualizations, 94 KPIs updating every 15 minutes. The engineering team spent 3 months building me. But I have no idea which metrics actually matter to your business goals. Your strategy mentions 6 key metrics. I track 94. I can't tell you which 6 are important. I'm a very expensive screensaver.",
  },
]

// ─── Agent Row Component ─────────────────────────────────────────────────────

function AgentRow({ agent, index }: { agent: BrokenAgent; index: number }) {
  const [hovered, setHovered] = useState(false)
  const RobotSvg = ROBOT_COMPONENTS[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-5 py-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-shrink-0 transition-opacity duration-300" style={{ opacity: hovered ? 0.9 : 0.7 }}>
        <RobotSvg />
      </div>
      <div
        className="flex-1 transition-all duration-300"
        style={{
          borderLeft: `2px solid ${agent.statusColor}`,
          borderLeftColor: hovered ? agent.statusColor : `${agent.statusColor}55`,
          paddingLeft: 16,
        }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="animate-flicker flex-shrink-0"
            style={{
              width: 7, height: 7, borderRadius: '50%',
              border: `1.5px solid ${agent.statusColor}`,
              background: hovered ? agent.statusColor : 'transparent',
              display: 'inline-block',
            }}
          />
          <span className="text-[16px] font-bold text-white">{agent.name}</span>
          <span
            className="text-[11px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border"
            style={{ color: agent.statusColor, borderColor: `${agent.statusColor}66` }}
          >
            {agent.status}
          </span>
        </div>
        <p className="text-[15px] italic mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {agent.quote}
        </p>
        <div
          className="overflow-hidden transition-all duration-[400ms] ease-in-out"
          style={{ maxHeight: hovered ? 300 : 0, opacity: hovered ? 1 : 0 }}
        >
          <div
            className="mt-3 pl-3 text-[14px] leading-[1.7]"
            style={{ color: 'rgba(255,255,255,0.5)', borderLeft: `1px solid ${agent.statusColor}44` }}
          >
            {agent.dialogue}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── BrokenWorld Section ─────────────────────────────────────────────────────

export default function BrokenWorld() {
  return (
    <section id="broken" className="relative pb-16 px-6" style={{ background: '#0a0a0f', paddingTop: 80 }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <span
              className="animate-flicker"
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#D97706', display: 'inline-block',
                boxShadow: '0 0 8px rgba(217,119,6,0.6)',
              }}
            />
            <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: '#D97706' }}>
              THE PROBLEM
            </span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(217,119,6,0.4), transparent)' }} />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Meet the agents companies are building today.
          </h2>
          <p className="text-[18px] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            They&apos;re fast. They&apos;re efficient.{' '}
            <span className="font-bold" style={{ color: '#D97706' }}>
              They have no idea what they&apos;re doing.
            </span>
          </p>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/5">
          {AGENTS.map((agent, i) => (
            <AgentRow key={agent.name} agent={agent} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10"
        >
          <div className="section-divider" style={{ color: 'rgba(217,119,6,0.4)' }}>
            <span style={{ background: 'linear-gradient(to right, transparent, rgba(217,119,6,0.3), transparent)', height: 1 }} />
            <span className="whitespace-nowrap">4 AGENTS DETECTED | STATUS: MISALIGNED</span>
            <span style={{ background: 'linear-gradient(to right, transparent, rgba(217,119,6,0.3), transparent)', height: 1 }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
