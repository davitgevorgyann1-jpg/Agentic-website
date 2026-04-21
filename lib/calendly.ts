export const CALENDLY_URL = 'https://calendly.com/introo/davit-gevorgyan'

// Dark-themed iframe URL — Calendly supports these URL params for inline embeds
const IFRAME_URL =
  `${CALENDLY_URL}?hide_gdpr_banner=1` +
  `&background_color=ffffff` +
  `&text_color=1a1a1a` +
  `&primary_color=e2b97f`

export function openCalendly() {
  const backdrop = document.getElementById('calendly-backdrop') as HTMLElement | null
  const panel    = document.getElementById('calendly-panel')   as HTMLElement | null
  const iframe   = document.getElementById('calendly-iframe')  as HTMLIFrameElement | null
  if (!backdrop || !panel) return

  // Lazy-load iframe — set src only on first open to avoid loading Calendly on page load
  if (iframe && !iframe.src.includes('calendly.com')) {
    iframe.src = IFRAME_URL
  }

  backdrop.style.display = 'block'
  panel.style.display    = 'flex'

  // Double rAF ensures display change is painted before transitions fire
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      backdrop.style.opacity       = '1'
      backdrop.style.pointerEvents = 'auto'
      panel.style.transform        = 'translateX(0)'
    })
  })
}

export function closeCalendlyOverlay() {
  const backdrop = document.getElementById('calendly-backdrop') as HTMLElement | null
  const panel    = document.getElementById('calendly-panel')   as HTMLElement | null
  if (!backdrop || !panel) return

  backdrop.style.opacity       = '0'
  backdrop.style.pointerEvents = 'none'
  panel.style.transform        = 'translateX(100%)'

  // After slide-out completes, hide from layout
  setTimeout(() => {
    backdrop.style.display = 'none'
    panel.style.display    = 'none'
  }, 420)
}
