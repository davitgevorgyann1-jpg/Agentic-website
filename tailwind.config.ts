import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ice: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#c8e4ff',
          300: '#a5cfff',
          400: '#7ab5f8',
          500: '#5298ef',
          600: '#3b7de3',
          700: '#2d63cc',
          800: '#2450a5',
          900: '#1e3d82',
        },
        azure: '#3b82f6',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        display: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite alternate',
        'float-slow': 'float 5s ease-in-out infinite alternate',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'flicker': 'flicker 2.5s step-end infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glitch': 'glitch-shift 0.3s step-end infinite',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px 2px rgba(59,130,246,0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 16px 6px rgba(59,130,246,0.3)' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.2' },
        },
        'glitch-shift': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(0)' },
          '80%': { transform: 'translate(1px, 2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(100, 120, 180, 0.08)',
        'glass-hover': '0 8px 40px rgba(100, 120, 180, 0.16)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-amber': '0 0 12px rgba(245, 158, 11, 0.5)',
        'glow-green': '0 0 12px rgba(34, 197, 94, 0.5)',
        'inner-glass': 'inset 0 1px 1px rgba(255,255,255,0.9)',
      },
    },
  },
  plugins: [],
}

export default config
