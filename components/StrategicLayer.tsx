'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Angular Blue Dot Robot SVGs (clean, precise) ────────────────────────────

function RectAngularBot({ className }: { className?: string }) {
  const d = '#1E3A8A', m = '#2563EB', b = '#93C5FD'
  const hx = [18,22,26,30,34,38]
  const bx = [20,24,28,32,36]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      <circle cx="28" cy="7" r="1.5" fill={b} />
      {[23,27,31,33].map((x,i) => <circle key={`t-${i}`} cx={x} cy="10" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="14" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="18" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="22" r="1.5" fill={d} />)}
      <circle cx="22" cy="18" r="1.8" fill={b} />
      <circle cx="34" cy="18" r="1.8" fill={b} />
      {bx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="28" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="32" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="36" r="1.5" fill={d} />)}
      {[22,26,30,34].map((x,i) => <circle key={`b4-${i}`} cx={x} cy="40" r="1.5" fill={d} />)}
      <circle cx="15" cy="29" r="1.2" fill={m} /><circle cx="11" cy="32" r="1" fill={d} />
      <circle cx="41" cy="29" r="1.2" fill={m} /><circle cx="45" cy="32" r="1" fill={d} />
      <circle cx="24" cy="45" r="1.2" fill={d} /><circle cx="24" cy="49" r="1.2" fill={d} />
      <circle cx="32" cy="45" r="1.2" fill={d} /><circle cx="32" cy="49" r="1.2" fill={d} />
    </svg>
  )
}

function RectShieldBot({ className }: { className?: string }) {
  const d = '#1E3A8A', m = '#2563EB', b = '#93C5FD'
  const hx = [18,22,26,30,34,38,42]
  const bx = [16,20,24,28,32,36,40]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="10" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="14" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="18" r="1.5" fill={d} />)}
      <circle cx="23" cy="14" r="2" fill={b} />
      <circle cx="28" cy="14" r="2" fill={b} />
      <circle cx="37" cy="14" r="2" fill={b} />
      {bx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="24" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="28" r="1.5" fill={m} />)}
      {bx.map((x,i) => <circle key={`b3-${i}`} cx={x} cy="32" r="1.5" fill={d} />)}
      {[18,22,26,30,34,38].map((x,i) => <circle key={`b4-${i}`} cx={x} cy="36" r="1.5" fill={d} />)}
      <circle cx="12" cy="25" r="1.2" fill={m} /><circle cx="12" cy="29" r="1.2" fill={d} />
      <circle cx="44" cy="25" r="1.2" fill={m} /><circle cx="44" cy="29" r="1.2" fill={d} />
      <circle cx="22" cy="41" r="1.2" fill={d} /><circle cx="22" cy="45" r="1.2" fill={d} />
      <circle cx="34" cy="41" r="1.2" fill={d} /><circle cx="34" cy="45" r="1.2" fill={d} />
    </svg>
  )
}

function RectSensorBot({ className }: { className?: string }) {
  const d = '#1E3A8A', m = '#2563EB', b = '#93C5FD'
  const hx = [19,23,27,31,35,39]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      <circle cx="19" cy="4" r="1.5" fill={b} /><circle cx="29" cy="3" r="1.5" fill={b} /><circle cx="39" cy="4" r="1.5" fill={b} />
      <circle cx="19" cy="8" r="1" fill={m} /><circle cx="29" cy="7" r="1" fill={m} /><circle cx="39" cy="8" r="1" fill={m} />
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="12" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="16" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="20" r="1.5" fill={d} />)}
      <circle cx="23" cy="16" r="1.8" fill={b} />
      <circle cx="35" cy="16" r="1.8" fill={b} />
      {hx.map((x,i) => <circle key={`b1-${i}`} cx={x} cy="26" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`b2-${i}`} cx={x} cy="30" r="1.5" fill={d} />)}
      {[21,25,29,33,37].map((x,i) => <circle key={`b3-${i}`} cx={x} cy="34" r="1.5" fill={d} />)}
      <circle cx="14" cy="27" r="1.2" fill={m} /><circle cx="44" cy="27" r="1.2" fill={m} />
      <circle cx="23" cy="39" r="1.2" fill={d} /><circle cx="23" cy="43" r="1.2" fill={d} />
      <circle cx="35" cy="39" r="1.2" fill={d} /><circle cx="35" cy="43" r="1.2" fill={d} />
    </svg>
  )
}

function RectBrainBot({ className }: { className?: string }) {
  const d = '#1E3A8A', m = '#2563EB', b = '#93C5FD'
  const hx = [14,18,22,26,30,34,38,42]
  return (
    <svg viewBox="0 0 56 64" width="56" height="64" className={className}>
      {hx.map((x,i) => <circle key={`h1-${i}`} cx={x} cy="7" r="1.5" fill={b} />)}
      {hx.map((x,i) => <circle key={`h2-${i}`} cx={x} cy="11" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h3-${i}`} cx={x} cy="15" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h4-${i}`} cx={x} cy="19" r="1.5" fill={m} />)}
      {hx.map((x,i) => <circle key={`h5-${i}`} cx={x} cy="23" r="1.5" fill={d} />)}
      <circle cx="22" cy="15" r="2" fill={b} />
      <circle cx="34" cy="15" r="2" fill={b} />
      {[24,28,32].map((x,i) => <circle key={`b1-${i}`} cx={x} cy="29" r="1.5" fill={m} />)}
      {[24,28,32].map((x,i) => <circle key={`b2-${i}`} cx={x} cy="33" r="1.5" fill={d} />)}
      <circle cx="19" cy="30" r="1" fill={m} /><circle cx="16" cy="32" r="1" fill={d} />
      <circle cx="37" cy="30" r="1" fill={m} /><circle cx="40" cy="32" r="1" fill={d} />
      <circle cx="26" cy="38" r="1.2" fill={d} /><circle cx="26" cy="42" r="1.2" fill={d} />
      <circle cx="30" cy="38" r="1.2" fill={d} /><circle cx="30" cy="42" r="1.2" fill={d} />
    </svg>
  )
}

// ─── Placeholder Robot ────────────────────────────────────────────────────────

function PlaceholderBot({ color }: { color: string }) {
  return (
    <motion.svg
      viewBox="0 0 56 64"
      width="56"
      height="64"
      animate={{ opacity: [0.6, 1.0, 0.6] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <rect x="11" y="7" width="34" height="18" rx="2"
        fill="none" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" strokeOpacity="0.6" />
      <rect x="14" y="28" width="28" height="16" rx="1"
        fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" strokeOpacity="0.6" />
      <rect x="4" y="30" width="9" height="6" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="43" y="30" width="9" height="6" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="17" y="47" width="8" height="10" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <rect x="31" y="47" width="8" height="10" rx="1"
        fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" strokeOpacity="0.6" />
      <text x="28" y="17" textAnchor="middle" dominantBaseline="middle"
        fontSize="24" fontFamily="monospace" fontWeight="bold"
        fill={color} fillOpacity="0.8">?</text>
    </motion.svg>
  )
}

const ROBOTS = [RectAngularBot, RectShieldBot, RectSensorBot, RectBrainBot]

interface StrategicAgent {
  name: string
  quote: string
  dialogue: string
}

const AGENTS: StrategicAgent[] = [
  {
    name: 'Competitor Intelligence Agent',
    quote: 'Every Monday, 7am. 12 competitors analyzed. Your move.',
    dialogue: "I'm the Competitor Intelligence Agent. Every Monday at 7am, before your leadership team starts the week, I deliver a structured competitive analysis. I monitor 12 competitors across pricing changes, feature launches, hiring patterns, funding announcements, and market positioning shifts. Last month, I detected that your biggest competitor quietly raised their enterprise pricing by 18%. Your sales team adjusted their pitch before the competitor even announced it publicly. I turn 5 hours of manual research into a 20-minute automated briefing.",
  },
  {
    name: 'The Alignment Gatekeeper',
    quote: 'No initiative enters the pipeline without my approval.',
    dialogue: "I'm the Alignment Gatekeeper, the most important agent in the system. Before any new initiative, project, or feature enters your pipeline, I cross-reference it against your OKRs, strategy documents, resource constraints, and current priorities. Last month, a well-intentioned team proposed a 6-week project to build an AI chatbot for sales demos. I flagged it: the project didn't map to any current objective, would consume 30% of the engineering team's Q2 capacity, and conflicted with the strategic priority of reducing time-to-value for existing customers. The team redirected their energy to something that actually mattered.",
  },
  {
    name: 'Strategy Pulse Monitor',
    quote: 'When your key metrics drift, I flag it within hours, not months.',
    dialogue: "I watch your key strategic metrics in real-time and cross-reference them against your quarterly objectives. When NPS dropped 4 points over two weeks last month, I flagged it the same day, along with the likely cause (a recent UX change that affected the onboarding flow). Without me, your team would have discovered this at the quarterly review, 6 weeks later, after hundreds more customers had the degraded experience.",
  },
  {
    name: 'OKR Intelligence Agent',
    quote: "I make sure your next quarter's goals aren't based on gut feel.",
    dialogue: "When it's time to set next quarter's objectives, I synthesize everything: last quarter's performance data, competitive landscape shifts, customer feedback trends, market signals, and resource availability. I don't write your OKRs for you. That's a human decision. But I make sure the humans making that decision have better ingredients than a gut feeling and a spreadsheet from 3 months ago.",
  },
]

const BLUE = '#2563EB'

function AgentRow({ agent, index }: { agent: StrategicAgent; index: number }) {
  const [hovered, setHovered] = useState(false)
  const RobotSvg = ROBOTS[index]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="agent-row flex items-start gap-5 py-5 cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex-shrink-0 transition-opacity duration-300" style={{ opacity: hovered ? 0.9 : 0.7 }}>
        <RobotSvg />
      </div>
      <div className="flex-1 transition-all duration-300" style={{ borderLeft: `2px solid ${hovered ? BLUE : `${BLUE}55`}`, paddingLeft: 16 }}>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="animate-pulse-steady flex-shrink-0" style={{ width: 7, height: 7, borderRadius: '50%', background: BLUE, display: 'inline-block', color: BLUE }} />
          <span className="text-[16px] font-bold text-white">{agent.name}</span>
          <span className="text-[11px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border" style={{ color: BLUE, borderColor: `${BLUE}66` }}>ACTIVE</span>
        </div>
        <p className="text-[15px] italic mt-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{agent.quote}</p>
        <div className="overflow-hidden transition-all duration-[400ms] ease-in-out" style={{ maxHeight: hovered ? 300 : 0, opacity: hovered ? 1 : 0 }}>
          <div className="mt-3 pl-3 text-[14px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.5)', borderLeft: `1px solid ${BLUE}44` }}>{agent.dialogue}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StrategicLayer() {
  return (
    <section id="strategy" className="relative pb-12 px-6" style={{ background: '#0a0a0f', paddingTop: 80 }}>
      <div className="max-w-[1100px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="animate-pulse-steady" style={{ width: 7, height: 7, borderRadius: '50%', background: BLUE, display: 'inline-block', boxShadow: `0 0 8px ${BLUE}99`, color: BLUE }} />
            <span className="text-[12px] uppercase tracking-[0.15em]" style={{ color: BLUE }}>THE SOLUTION</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${BLUE}66, transparent)` }} />
          </div>
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold text-white mb-3">
            Agents that make your leadership team smarter.
          </h2>
          <p className="text-[18px] mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>
            These are examples of strategic agents I build. Yours will be designed around your strategy, your OKRs, your competitive landscape.
          </p>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/5">
          {AGENTS.map((agent, i) => <AgentRow key={agent.name} agent={agent} index={i} />)}
        </div>

        {/* Your Strategic Agent placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6"
        >
        <motion.div
          animate={{
            boxShadow: ['0 0 0px transparent', '0 0 30px rgba(37,99,235,0.1)', '0 0 0px transparent'],
            borderColor: ['rgba(37,99,235,0.15)', 'rgba(37,99,235,0.35)', 'rgba(37,99,235,0.15)'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-lg p-5 flex items-start gap-5"
          style={{ borderStyle: 'dashed', borderWidth: '1px', background: 'rgba(37,99,235,0.03)' }}
        >
          <div className="flex-shrink-0">
            <PlaceholderBot color={BLUE} />
          </div>
          <div className="flex-1" style={{ borderLeft: `2px dashed ${BLUE}33`, paddingLeft: 16 }}>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex-shrink-0" style={{ width: 7, height: 7, borderRadius: '50%', border: `1.5px dashed ${BLUE}88`, display: 'inline-block' }} />
              <span className="text-[16px] font-bold text-white">Your Strategic Agent</span>
              <span className="text-[11px] uppercase tracking-[0.15em] rounded-full" style={{ color: `${BLUE}aa`, border: `1px dashed ${BLUE}66`, padding: '4px 12px' }}>TO BE DESIGNED</span>
            </div>
            <p className="text-[15px] italic mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Your company has strategic needs nobody&apos;s imagined yet. That&apos;s what the audit reveals.
            </p>
          </div>
        </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10">
          <div className="section-divider" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span style={{ background: `linear-gradient(to right, transparent, ${BLUE}44, transparent)`, height: 1 }} />
            <span className="whitespace-nowrap">4 AGENTS DEPLOYED | ALL SYSTEMS NOMINAL</span>
            <span style={{ background: `linear-gradient(to right, transparent, ${BLUE}44, transparent)`, height: 1 }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
