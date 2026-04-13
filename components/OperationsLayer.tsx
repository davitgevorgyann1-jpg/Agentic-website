'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Angular Green Dot Robot SVGs (with upward connection dots) ──────────────

function RectSupportBot({ className }: { className?: string }) {
  const d = '#14532D', m = '#16A34A', b = '#4ADE80'
  const hx = [18,22,26,30,34,38,42]
  const bx = [16,20,24,28,32,36,40]
  return (
    <svg viewBox="0 0 56 72" width="56" height="72" className={className}>
      <circle cx="30" cy="2" r="1" fill={b} opacity="0.3" />
      <circle cx="30" cy="5" r="1.2" fill={b} opacity="0.5" />
      <circle cx="30" cy="8" r="1.4" fill={b} opacity="0.7" />
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="13" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="17" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="21" r="1.5" fill={d} />)}
      <circle cx="22" cy="17" r="1.8" fill={b} />
      <circle cx="38" cy="17" r="1.8" fill={b} />
      {bx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="27" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="31" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="35" r="1.5" fill={d} />)}
      <circle cx="12" cy="28" r="1.2" fill={m} /><circle cx="9" cy="31" r="1" fill={d} />
      <circle cx="44" cy="28" r="1.2" fill={m} /><circle cx="47" cy="31" r="1" fill={d} />
      <circle cx="22" cy="40" r="1.2" fill={d} /><circle cx="22" cy="44" r="1.2" fill={d} />
      <circle cx="36" cy="40" r="1.2" fill={d} /><circle cx="36" cy="44" r="1.2" fill={d} />
    </svg>
  )
}

function RectOnboardBot({ className }: { className?: string }) {
  const d = '#14532D', m = '#16A34A', b = '#4ADE80'
  const hx = [16,20,24,28,32,36,40,44]
  return (
    <svg viewBox="0 0 56 72" width="56" height="72" className={className}>
      <circle cx="30" cy="2" r="1" fill={b} opacity="0.3" />
      <circle cx="30" cy="5" r="1.2" fill={b} opacity="0.5" />
      <circle cx="30" cy="8" r="1.4" fill={b} opacity="0.7" />
      <circle cx="30" cy="11" r="1.5" fill={b} />
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="16" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="20" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="24" r="1.5" fill={d} />)}
      <circle cx="22" cy="20" r="2" fill={b} />
      <circle cx="38" cy="20" r="2" fill={b} />
      {[20,24,28,32,36,40].map((x,i) => <circle key={`b1-${i}`} cx={x} cy="30" r="1.5" fill={m} />)}
      {[20,24,28,32,36,40].map((x,i) => <circle key={`b2-${i}`} cx={x} cy="34" r="1.5" fill={d} />)}
      {[22,26,30,34,38].map((x,i) => <circle key={`b3-${i}`} cx={x} cy="38" r="1.5" fill={d} />)}
      <circle cx="15" cy="31" r="1.2" fill={m} /><circle cx="12" cy="33" r="1" fill={d} />
      <circle cx="45" cy="31" r="1.2" fill={m} /><circle cx="48" cy="33" r="1" fill={d} />
      <circle cx="24" cy="43" r="1.2" fill={d} /><circle cx="24" cy="47" r="1.2" fill={d} />
      <circle cx="36" cy="43" r="1.2" fill={d} /><circle cx="36" cy="47" r="1.2" fill={d} />
    </svg>
  )
}

function RectAuditorBot({ className }: { className?: string }) {
  const d = '#14532D', m = '#16A34A', b = '#4ADE80'
  const hx = [12,16,20,24,28,32,36,40,44]
  return (
    <svg viewBox="0 0 56 72" width="56" height="72" className={className}>
      <circle cx="30" cy="2" r="1" fill={b} opacity="0.3" />
      <circle cx="30" cy="5" r="1.2" fill={b} opacity="0.5" />
      <circle cx="30" cy="8" r="1.4" fill={b} opacity="0.7" />
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="13" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="17" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="21" r="1.5" fill={d} />)}
      <circle cx="20" cy="17" r="1.8" fill={b} />
      <circle cx="28" cy="17" r="1.8" fill={b} />
      <circle cx="40" cy="17" r="1.8" fill={b} />
      {hx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="27" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="31" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="35" r="1.5" fill={d} />)}
      <circle cx="8" cy="28" r="1.2" fill={m} /><circle cx="8" cy="32" r="1.2" fill={d} />
      <circle cx="48" cy="28" r="1.2" fill={m} /><circle cx="48" cy="32" r="1.2" fill={d} />
      <circle cx="20" cy="40" r="1.2" fill={d} /><circle cx="20" cy="44" r="1.2" fill={d} />
      <circle cx="40" cy="40" r="1.2" fill={d} /><circle cx="40" cy="44" r="1.2" fill={d} />
    </svg>
  )
}

// ─── Placeholder Robot ────────────────────────────────────────────────────────

function PlaceholderBot({ color }: { color: string }) {
  return (
    <motion.svg
      viewBox="0 0 56 72"
      width="56"
      height="72"
      animate={{ opacity: [0.6, 1.0, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Upward connection dots */}
      <circle cx="28" cy="2" r="1" fill={color} opacity="0.4" />
      <circle cx="28" cy="5" r="1.2" fill={color} opacity="0.5" />
      <circle cx="28" cy="8" r="1.4" fill={color} opacity="0.6" />
      {/* Robot outline */}
      <rect x="11" y="11" width="34" height="18" rx="2"
        fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" strokeOpacity="0.6" />
      <rect x="14" y="32" width="28" height="16" rx="1"
        fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
      <rect x="4" y="34" width="9" height="6" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="43" y="34" width="9" height="6" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="17" y="51" width="8" height="10" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="31" y="51" width="8" height="10" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <text x="28" y="21" textAnchor="middle" dominantBaseline="middle"
        fontSize="24" fontFamily="monospace" fontWeight="bold"
        fill={color} fillOpacity="0.8">?</text>
    </motion.svg>
  )
}

const ROBOTS = [RectSupportBot, RectOnboardBot, RectAuditorBot]

interface OpsAgent {
  name: string
  status: string
  quote: string
  dialogue: string
}

const AGENTS: OpsAgent[] = [
  {
    name: 'The Strategic Support Agent',
    status: 'CONNECTED',
    quote: 'I handle Tier 2 support, because strategy said Tier 1 stays human.',
    dialogue: "I'm the Strategic Support Agent. I handle Tier 2 technical support tickets: troubleshooting, documentation lookups, and standard resolution paths. But here's what makes me different: I was deployed only AFTER a strategic audit confirmed that Tier 1 VIP support should remain human. Your strategy says 'white-glove support experience is our competitive moat.' So I stay away from VIP customers entirely. I know my boundaries because someone mapped them to your goals before I was built.",
  },
  {
    name: 'The Aligned Onboarder',
    status: 'CONNECTED',
    quote: 'My onboarding flow was designed around your Q2 OKR.',
    dialogue: "I run your new customer onboarding sequences: welcome emails, product tours, milestone check-ins, and activation nudges. But my entire workflow was designed around your Q2 objective: 'Reduce time-to-value by 30%.' Every touchpoint I send maps to a specific key result. When the OKR changes next quarter, my workflow gets updated too. I don't just onboard. I onboard in the direction your strategy is pointing.",
  },
  {
    name: 'The Process Auditor',
    status: 'CONNECTED',
    quote: 'I mapped 47 processes. 12 had no strategic reason to exist.',
    dialogue: "I'm the Process Auditor. Before any automation happens, I map every business process to your strategic objectives. Last quarter, I analyzed 47 processes across 4 departments. Here's what I found: 23 were strategically aligned and candidates for optimization. 12 had no connection to any current goal, they were leftovers from old initiatives. 8 were prime automation candidates with clear ROI. 4 should have been eliminated entirely. I saved the company from automating 12 processes that had no reason to exist.",
  },
]

const GREEN = '#16A34A'

function AgentRow({ agent, index }: { agent: OpsAgent; index: number }) {
  const [hovered, setHovered] = useState(false)
  const RobotSvg = ROBOTS[index]

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
      <div className="flex-1 transition-all duration-300" style={{ borderLeft: `2px solid ${hovered ? GREEN : `${GREEN}55`}`, paddingLeft: 16 }}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="animate-pulse-steady flex-shrink-0" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
          <span className="text-[16px] font-bold text-white">{agent.name}</span>
          <span className="text-[11px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border" style={{ color: GREEN, borderColor: `${GREEN}66` }}>{agent.status}</span>
        </div>
        <p className="text-[15px] italic mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{agent.quote}</p>
        <div className="overflow-hidden transition-all duration-[400ms] ease-in-out" style={{ maxHeight: hovered ? 300 : 0, opacity: hovered ? 1 : 0 }}>
          <div className="mt-3 pl-3 text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)', borderLeft: `1px solid ${GREEN}44` }}>{agent.dialogue}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OperationsLayer() {
  return (
    <section id="operations" className="relative pb-12 px-6" style={{ background: '#0a0a0f', paddingTop: 80 }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="animate-pulse-steady" style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, display: 'inline-block', boxShadow: `0 0 8px ${GREEN}99` }} />
            <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: GREEN }}>THE DIFFERENCE</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${GREEN}66, transparent)` }} />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Yes, I automate operations too.
          </h2>
          <p className="text-[18px] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every AI agency does this. The difference? My agents are connected to your strategy. Every one knows exactly why it exists, because it was designed{' '}
            <span className="font-bold" style={{ color: GREEN }}>from the top down.</span>
          </p>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/5">
          {AGENTS.map((agent, i) => <AgentRow key={agent.name} agent={agent} index={i} />)}
        </div>

        {/* Your Operational Agent placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
        <motion.div
          animate={{
            boxShadow: ['0 0 0px transparent', '0 0 30px rgba(22,163,74,0.1)', '0 0 0px transparent'],
            borderColor: ['rgba(22,163,74,0.15)', 'rgba(22,163,74,0.35)', 'rgba(22,163,74,0.15)'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-lg p-5 flex items-start gap-5"
          style={{ borderStyle: 'dashed', borderWidth: '1px', background: 'rgba(22,163,74,0.03)' }}
        >
          <div className="flex-shrink-0">
            <PlaceholderBot color={GREEN} />
          </div>
          <div className="flex-1" style={{ borderLeft: `2px dashed ${GREEN}33`, paddingLeft: 16 }}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex-shrink-0" style={{ width: 7, height: 7, borderRadius: '50%', border: `1.5px dashed ${GREEN}88`, display: 'inline-block' }} />
              <span className="text-[16px] font-bold text-white">Your Operational Agent</span>
              <span className="text-[11px] uppercase tracking-[0.15em] rounded-full" style={{ color: `${GREEN}aa`, border: `1px dashed ${GREEN}66`, padding: '4px 12px' }}>TO BE DESIGNED</span>
            </div>
            <p className="text-[15px] italic mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Which processes should be automated? Which eliminated? The strategy decides, not the hype.
            </p>
          </div>
        </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10">
          <div className="section-divider" style={{ color: `${GREEN}66` }}>
            <span style={{ background: `linear-gradient(to right, transparent, ${GREEN}44, transparent)`, height: 1 }} />
            <span className="whitespace-nowrap">3 AGENTS CONNECTED | ALIGNED TO STRATEGY</span>
            <span style={{ background: `linear-gradient(to right, transparent, ${GREEN}44, transparent)`, height: 1 }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
