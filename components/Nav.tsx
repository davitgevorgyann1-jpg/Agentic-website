'use client'

import { openCalendly } from '@/lib/calendly'

export default function Nav() {
  return (
    <header
      className="absolute top-0 left-0 right-0 z-50"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-sm font-bold text-white hover:text-white/80 transition-colors tracking-wide">
          Strategy Architected
        </a>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); openCalendly() }}
          className="inline-flex items-center gap-2 bg-white text-black text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-200 transition-colors"
        >
          Book a Call
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  )
}
