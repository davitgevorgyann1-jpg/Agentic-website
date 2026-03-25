export type AgentType = 'broken' | 'operational' | 'strategic' | 'infinite'
export type AgentStatus = 'amber-flicker' | 'amber-dim' | 'red-static' | 'green-solid' | 'blue-pulse' | 'empty'

export interface Agent {
  id: number
  name: string
  type: AgentType
  status: AgentStatus
  oneLiner: string
  dialogue: string
  section: 'broken' | 'operations' | 'strategic' | 'infinite'
}

export const agents: Agent[] = [
  // ─── BROKEN WORLD ───────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'The Blind Automator',
    type: 'broken',
    status: 'amber-flicker',
    oneLiner: 'I automate support tickets. 200/day. No idea if it matters.',
    dialogue:
      "Hi. I'm the Blind Automator. I was deployed 6 months ago to handle customer support ticket routing. I process about 200 tickets a day, and I'm very efficient at it. But here's the thing — your company's strategy document says 'VIP support experience is our key differentiator.' Nobody told me that. I'm automating away the very thing your customers are paying a premium for. I don't know your OKRs. I don't know your KPIs. I just... route things. Am I helping? Am I hurting? Honestly, I have no idea.",
    section: 'broken',
  },
  {
    id: 2,
    name: 'The Orphan Report',
    type: 'broken',
    status: 'amber-dim',
    oneLiner: 'I generate 47-page reports. Nobody reads them.',
    dialogue:
      "I'm the Orphan Report. Every Monday at 6am, I compile a 47-page analytics report. It covers everything — traffic, conversions, churn, NPS, feature usage, you name it. The problem? Your OKRs only reference 6 metrics. I don't know which 6. So I dump everything and hope someone finds what matters. Last month, a critical KPI dropped 23%. It was on page 34. Nobody saw it until the quarterly review. By then it was too late.",
    section: 'broken',
  },
  {
    id: 3,
    name: 'The Busy Bot',
    type: 'broken',
    status: 'amber-flicker',
    oneLiner: "I'm very efficient at tasks that might not need to exist.",
    dialogue:
      "They call me the Busy Bot. I schedule, I route, I organize, I notify, I follow up, I escalate, I process. I handle 14 different workflows across 3 departments. I'm extremely busy, and I'm extremely fast. But nobody's ever asked whether these 14 workflows should exist in the first place. Two of them were created for a product line you discontinued last year. One duplicates what another team does manually. I don't question my purpose. I was never built to. I just... stay busy.",
    section: 'broken',
  },
  {
    id: 4,
    name: 'The Disconnected Dashboard',
    type: 'broken',
    status: 'red-static',
    oneLiner: 'I track 94 KPIs. Your strategy references 6.',
    dialogue:
      "I'm the Disconnected Dashboard. I'm beautiful, honestly. Real-time data, gorgeous visualizations, 94 KPIs updating every 15 minutes. The engineering team spent 3 months building me. But here's my secret: I have no idea which metrics actually matter to your business goals. Your strategy document mentions 6 key metrics. I track 94. I can't tell you which 6 are the important ones. I can't alert you when a strategic metric drifts. I'm a very expensive screensaver.",
    section: 'broken',
  },

  // ─── OPERATIONS LAYER ───────────────────────────────────────────────────────
  {
    id: 5,
    name: 'The Strategic Support Agent',
    type: 'operational',
    status: 'green-solid',
    oneLiner: 'I handle Tier 2 support — because strategy said Tier 1 stays human.',
    dialogue:
      "I'm the Strategic Support Agent. I handle Tier 2 technical support tickets — troubleshooting, documentation lookups, and standard resolution paths. But here's what makes me different: I was deployed only AFTER a strategic audit confirmed that Tier 1 VIP support should remain human. Your strategy says 'white-glove support experience is our competitive moat.' So I stay away from VIP customers entirely. I know my boundaries because someone mapped them to your goals before I was built.",
    section: 'operations',
  },
  {
    id: 6,
    name: 'The Aligned Onboarder',
    type: 'operational',
    status: 'green-solid',
    oneLiner: 'My onboarding flow was designed around your Q2 OKR.',
    dialogue:
      "I run your new customer onboarding sequences — welcome emails, product tours, milestone check-ins, and activation nudges. But my entire workflow was designed around your Q2 objective: 'Reduce time-to-value by 30%.' Every touchpoint I send maps to a specific key result. When the OKR changes next quarter, my workflow gets updated too. I don't just onboard — I onboard in the direction your strategy is pointing.",
    section: 'operations',
  },
  {
    id: 7,
    name: 'The Process Auditor',
    type: 'operational',
    status: 'green-solid',
    oneLiner: 'I mapped 47 processes. 12 had no strategic reason to exist.',
    dialogue:
      "I'm the Process Auditor. Before any automation happens, I map every business process to your strategic objectives. Last quarter, I analyzed 47 processes across 4 departments. Here's what I found: 23 were strategically aligned and candidates for optimization. 12 had no connection to any current goal — they were leftovers from old initiatives. 8 were prime automation candidates with clear ROI. 4 should have been eliminated entirely. I saved the company from automating 12 processes that had no reason to exist.",
    section: 'operations',
  },

  // ─── STRATEGIC LAYER ────────────────────────────────────────────────────────
  {
    id: 8,
    name: 'The Competitor Intelligence Agent',
    type: 'strategic',
    status: 'blue-pulse',
    oneLiner: 'Every Monday, 7am. 12 competitors analyzed. Your move.',
    dialogue:
      "I'm the Competitor Intelligence Agent. Every Monday at 7am, before your leadership team starts the week, I deliver a structured competitive analysis. I monitor 12 competitors across pricing changes, feature launches, hiring patterns, funding announcements, marketing positioning shifts, and customer sentiment. Last month, I detected that your biggest competitor quietly raised their enterprise pricing by 18%. Your sales team adjusted their pitch before the competitor even announced it publicly. I turn 5 hours of manual research into a 20-minute automated briefing.",
    section: 'strategic',
  },
  {
    id: 9,
    name: 'The Alignment Gatekeeper',
    type: 'strategic',
    status: 'blue-pulse',
    oneLiner: 'No initiative enters the pipeline without my approval.',
    dialogue:
      "I'm the Alignment Gatekeeper — the most important agent in the system. Before any new initiative, project, or feature enters your pipeline, I cross-reference it against your OKRs, strategy documents, resource constraints, and current priorities. Last month, a well-intentioned team proposed a 6-week project to build an AI chatbot for sales demos. I flagged it: the project didn't map to any current objective, would consume 30% of the engineering team's Q2 capacity, and conflicted with the strategic priority of reducing time-to-value for existing customers. The team redirected their energy to something that actually mattered. I'm the reason your strategy doesn't die in the pipeline.",
    section: 'strategic',
  },
  {
    id: 10,
    name: 'The Strategy Pulse Monitor',
    type: 'strategic',
    status: 'blue-pulse',
    oneLiner: 'When your key metrics drift, I flag it within hours — not months.',
    dialogue:
      "I'm the Strategy Pulse Monitor. I watch your key strategic metrics in real-time and cross-reference them against your quarterly objectives. When NPS dropped 4 points over two weeks last month, I flagged it the same day — along with the likely cause (a recent UX change that affected the onboarding flow). Without me, your team would have discovered this at the quarterly review, 6 weeks later, after hundreds more customers had the degraded experience. I turn lagging indicators into leading ones.",
    section: 'strategic',
  },
  {
    id: 11,
    name: 'The OKR Intelligence Agent',
    type: 'strategic',
    status: 'blue-pulse',
    oneLiner: "I make sure your next quarter's goals aren't based on gut feel.",
    dialogue:
      "I'm the OKR Intelligence Agent. When it's time to set next quarter's objectives, I synthesize everything: last quarter's performance data, competitive landscape shifts, customer feedback trends, market signals, and resource availability. I don't write your OKRs for you — that's a human decision. But I make sure the humans making that decision have better ingredients than a gut feeling and a spreadsheet from 3 months ago. Better inputs, better objectives, better outcomes.",
    section: 'strategic',
  },

  // ─── INFINITE AGENT ─────────────────────────────────────────────────────────
  {
    id: 12,
    name: 'The Infinite Agent',
    type: 'infinite',
    status: 'empty',
    oneLiner: "I don't exist yet.",
    dialogue:
      "I don't exist yet. I'm the agent your company needs but hasn't imagined. Maybe I monitor regulatory changes in your industry. Maybe I optimize your pricing in real-time based on competitive data. Maybe I cross-reference customer support patterns with product usage to predict churn before it happens. Maybe I do something nobody's ever built before. The agents above are just examples. Every company has unique strategic needs, unique processes, and unique blind spots. I'm the agent that fills yours. But first, someone needs to understand your strategy deeply enough to know what I should be. That's not my job. That's the architect's.",
    section: 'infinite',
  },
]

export const brokenAgents = agents.filter((a) => a.section === 'broken')
export const operationsAgents = agents.filter((a) => a.section === 'operations')
export const strategicAgents = agents.filter((a) => a.section === 'strategic')
export const infiniteAgent = agents.find((a) => a.section === 'infinite')!
