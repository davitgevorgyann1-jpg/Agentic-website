/** @type {import('next').NextConfig} */

// All section IDs that the FullpageScroll exposes as URL paths.
// Keep in sync with SECTION_IDS in components/FullpageScroll.tsx and the
// section <section id="..."> values rendered in app/page.tsx.
const SECTION_PATHS = [
  'broken',
  'turning-point',
  'strategy',
  'operations',
  'agents',
  'architect',
  'approach',
  'engagement',
  'assessment',
  'cta',
]

const nextConfig = {
  reactStrictMode: true,
  // Map each section path to "/" so deep links (and URL-bar paths set via
  // history.replaceState) resolve to the home page, which then scrolls to
  // the matching section on mount. The URL bar keeps the clean path.
  async rewrites() {
    return SECTION_PATHS.map((path) => ({
      source: `/${path}`,
      destination: '/',
    }))
  },
}

module.exports = nextConfig
