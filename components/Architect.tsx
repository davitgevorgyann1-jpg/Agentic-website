'use client'

import { motion } from 'framer-motion'

export default function Architect() {
  return (
    <section
      id="architect"
      className="relative py-28 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #f8f9fc 0%, #fafafa 100%)',
      }}
    >
      {/* Warm-toned soft gradient — signals human warmth after the agent world */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(254,243,199,0.18) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Intro line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-16"
        >
          <p
            className="font-display text-[clamp(1.4rem,3.5vw,2rem)] text-slate-500 italic text-center max-w-xl"
            style={{ fontFamily: 'var(--font-newsreader)' }}
          >
            These agents don&rsquo;t architect themselves.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: avatar / visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Placeholder avatar — clean silhouette */}
              <div
                className="w-56 h-56 rounded-3xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #dbeafe 0%, #e0f2fe 40%, #f0fdf4 100%)',
                  boxShadow:
                    '0 20px 60px rgba(59,130,246,0.12), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.8)',
                }}
              >
                {/* Silhouette shape */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-0">
                  {/* Head */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: 'linear-gradient(160deg, #93c5fd 0%, #60a5fa 60%, #3b82f6 100%)',
                      marginBottom: -1,
                      boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  />
                  {/* Body */}
                  <div
                    style={{
                      width: 140,
                      height: 90,
                      borderRadius: '50px 50px 0 0',
                      background: 'linear-gradient(180deg, #bfdbfe 0%, #93c5fd 100%)',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </div>

                {/* Label overlay */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="text-xs font-semibold text-white/90 bg-blue-500/30 backdrop-blur-sm px-3 py-1 rounded-full font-body">
                    Photo coming soon
                  </span>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">
                  10+ years
                </p>
                <p className="text-sm font-bold text-slate-800 font-body">Product Management</p>
              </div>
            </div>
          </motion.div>

          {/* Right: bio content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2
                className="font-display text-[clamp(2rem,4vw,2.8rem)] font-semibold text-slate-800 leading-tight mb-1"
                style={{ fontFamily: 'var(--font-newsreader)' }}
              >
                Davit Gevorgyan
              </h2>
              <p className="text-base text-blue-600 font-semibold font-body tracking-wide">
                Strategy-Led AI Transformation
              </p>
            </div>

            <div className="flex flex-col gap-4 text-[0.95rem] text-slate-600 leading-relaxed font-body">
              <p>
                I spent 10 years as a product manager watching companies write brilliant strategies in January and forget them by March. OKRs became checkbox exercises. KPIs lived in dashboards nobody checked. And when AI entered the picture, companies started automating processes without ever asking whether those processes served their goals.
              </p>
              <p>
                Two years ago, I quit to solve this problem. The emergence of AI agents made the solution possible — not just consulting on strategy, but building intelligent systems that enforce it.
              </p>
              <p>
                I work across all three layers: I audit your strategy, map your operations, design the alignment layer that connects them, and then build the actual agents that make it all work. I don&rsquo;t hand you a PDF and disappear. I don&rsquo;t automate blindly and hope for the best. I start with why, build what matters, and stay to make sure it keeps working.
              </p>
            </div>

            {/* Key highlights */}
            <div className="flex flex-wrap gap-3 mt-1">
              {[
                '10+ years product management',
                'B2B SaaS specialization',
                'Strategy + Implementation',
              ].map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200/70 font-body"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-blue-500">
                    <circle cx="5" cy="5" r="3" fill="currentColor" />
                  </svg>
                  {highlight}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-2">
              <a
                href="#assessment"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg font-body"
              >
                Book a Discovery Call
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path
                    d="M2.5 7.5h10M8 3l4.5 4.5L8 12"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
