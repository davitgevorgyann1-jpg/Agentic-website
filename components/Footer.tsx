'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <>
      {/* ─── CTA Section ──────────────────────────────────────────────────── */}
      <section id="cta" className="relative py-24 px-6" style={{ background: '#0a0a0f' }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[24px] font-normal text-white mb-4"
          >
            Ready to align your AI with your strategy?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[14px] mb-8"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Book a free 30-minute discovery call. I&apos;ll tell you honestly whether my approach fits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#assessment"
              className="inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-8 py-3.5 rounded hover:bg-gray-200 transition-colors"
            >
              Book a Discovery Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative px-6 py-6" style={{ background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
            &copy; {new Date().getFullYear()} Davit Gevorgyan
          </span>
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] transition-colors hover:text-white/50"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@davitgevorgyan.com"
              className="text-[11px] transition-colors hover:text-white/50"
              style={{ color: 'rgba(255,255,255,0.25)' }}
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
