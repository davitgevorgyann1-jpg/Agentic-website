import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import CalendlyOverlay from '@/components/CalendlyOverlay'
import './globals.css'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://davitgevorgyan.com'),
  title: 'Davit Gevorgyan — Strategy-Led AI Transformation',
  description:
    'Davit Gevorgyan helps companies build AI agent systems that are connected to strategy, not just to tasks. Stop deploying broken agents. Start building systems that think.',
  keywords: [
    'AI transformation',
    'AI strategy',
    'AI agents',
    'enterprise AI',
    'AI consulting',
    'Davit Gevorgyan',
    'strategic AI',
    'AI operations',
  ],
  authors: [{ name: 'Davit Gevorgyan' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davitgevorgyan.com',
    title: 'Davit Gevorgyan — Strategy-Led AI Transformation',
    description:
      'Most companies are deploying AI agents that automate tasks with no strategic alignment. Davit helps you build systems that actually move the needle.',
    siteName: 'Davit Gevorgyan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Davit Gevorgyan — Strategy-Led AI Transformation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Davit Gevorgyan — Strategy-Led AI Transformation',
    description:
      'Most companies are deploying AI agents that automate tasks with no strategic alignment. Davit helps you build systems that actually move the needle.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className={`${jetbrains.className} antialiased`} style={{ background: '#0a0a0f' }}>
        {children}
        <CalendlyOverlay />
      </body>
    </html>
  )
}
