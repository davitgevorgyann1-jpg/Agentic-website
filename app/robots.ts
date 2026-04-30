import type { MetadataRoute } from 'next'

/**
 * robots.txt served at /robots.txt.
 *
 * Allow all crawlers everywhere; point them at the sitemap. Disallow only
 * the API route, which serves no public content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.davit-gevorgyan.com/sitemap.xml',
    host: 'https://www.davit-gevorgyan.com',
  }
}
