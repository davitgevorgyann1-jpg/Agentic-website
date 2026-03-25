'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative py-16 overflow-hidden bg-slate-900">
      {/* Subtle gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col gap-3"
          >
            <h2
              className="font-display text-2xl font-semibold text-white"
              style={{ fontFamily: 'var(--font-newsreader)' }}
            >
              Davit Gevorgyan
            </h2>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-body">
              Strategy-Led AI Transformation. Helping companies build AI systems that know what they&rsquo;re doing and why.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <a
              href="#assessment"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-medium transition-all duration-200"
            >
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            <div className="flex gap-4">
              {[
                { href: '#broken', label: 'Broken World' },
                { href: '#operations', label: 'Operations' },
                { href: '#strategy', label: 'Strategy' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors duration-150 font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span className="font-body">&copy; {new Date().getFullYear()} Davit Gevorgyan. All rights reserved.</span>
          <span className="font-body italic text-slate-600">
            &ldquo;Build the foundation. The rest becomes possible.&rdquo;
          </span>
        </div>
      </div>
    </footer>
  )
}
