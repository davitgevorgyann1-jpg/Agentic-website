import type { MetadataRoute } from 'next'

/**
 * Sitemap served at /sitemap.xml.
 *
 * The site is a single-page app — section paths like /strategy and /broken
 * are URL aliases for the home page (mapped via next.config.js rewrites)
 * and serve the same content. We list only the canonical home URL so search
 * engines don't index multiple paths as duplicate content.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.davit-gevorgyan.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
