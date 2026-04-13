'use client'

import { motion } from 'framer-motion'

const line1 = 'What if your agents actually knew your strategy?'.split(' ')
const line2 = 'What if every automation was connected to a purpose?'.split(' ')

// Circuit lines: y position (%), node x positions (%), tick x positions (%)
// Left half = broken (dashed), right half = solid
const CIRCUIT_LINES = [
  {
    y: '22%',
    nodes: [8, 18, 31, 44],        // left-half dots
    ticks: [12, 26, 38],           // left-half ticks
    rightNodes: [58, 72, 84, 92],  // right-half dots
    rightTicks: [62, 76, 88],      // right-half ticks
  },
  {
    y: '38%',
    nodes: [5, 15, 28, 42],
    ticks: [9, 22, 35],
    rightNodes: [54, 67, 79, 94],
    rightTicks: [60, 73, 86],
  },
  {
    y: '62%',
    nodes: [11, 22, 36, 46],
    ticks: [16, 30, 41],
    rightNodes: [56, 70, 82, 91],
    rightTicks: [64, 77, 87],
  },
  {
    y: '78%',
    nodes: [7, 19, 33, 47],
    ticks: [13, 25, 40],
    rightNodes: [53, 65, 78, 90],
    rightTicks: [59, 71, 84],
  },
]

export default function TurningPoint() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: '#0a0a0f' }}
    >
      {/* Radial gradient atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(217,119,6,0.04), transparent 50%)',
            'radial-gradient(ellipse at 70% 50%, rgba(37,99,235,0.04), transparent 50%)',
          ].join(', '),
        }}
      />

      {/* Circuit-board line patterns */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CIRCUIT_LINES.map((cl, li) => (
          <g key={li}>
            {/* Left half — broken/dashed line */}
            <line
              x1="0%" y1={cl.y} x2="50%" y2={cl.y}
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.5"
              strokeDasharray="6 3"
            />
            {/* Right half — solid continuous line */}
            <line
              x1="50%" y1={cl.y} x2="100%" y2={cl.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="0.5"
            />
            {/* Left-half nodes (dots at intersection points) */}
            {cl.nodes.map((nx, ni) => (
              <circle key={`ln-${ni}`} cx={`${nx}%`} cy={cl.y} r="2" fill="rgba(255,255,255,0.05)" />
            ))}
            {/* Left-half ticks (small perpendicular marks) */}
            {cl.ticks.map((tx, ti) => (
              <line
                key={`lt-${ti}`}
                x1={`${tx}%`} y1={cl.y}
                x2={`${tx}%`} y2={`calc(${cl.y} + 4px)`}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
              />
            ))}
            {/* Right-half nodes */}
            {cl.rightNodes.map((nx, ni) => (
              <circle key={`rn-${ni}`} cx={`${nx}%`} cy={cl.y} r="2" fill="rgba(255,255,255,0.06)" />
            ))}
            {/* Right-half ticks */}
            {cl.rightTicks.map((tx, ti) => (
              <line
                key={`rt-${ti}`}
                x1={`${tx}%`} y1={cl.y}
                x2={`${tx}%`} y2={`calc(${cl.y} + 4px)`}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Center content */}
      <div className="relative z-10 max-w-[1100px] w-full mx-auto text-center">
        <h2 className="text-[28px] font-normal text-white leading-relaxed mb-8">
          {line1.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: 'easeOut' }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Amber-to-blue divider line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: line1.length * 0.08 + 0.1, duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-8"
          style={{
            width: 200,
            height: '0.5px',
            background: 'linear-gradient(90deg, #D97706, #2563EB)',
            transformOrigin: 'center',
          }}
        />

        <p className="text-[22px] font-normal leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {line2.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (line1.length + i) * 0.08 + 0.2, duration: 0.4, ease: 'easeOut' }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  )
}
