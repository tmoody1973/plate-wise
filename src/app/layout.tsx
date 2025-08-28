import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'PlateWise - Cultural Meal Planning & Budget Optimization',
  description: 'A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.',
  keywords: ['meal planning', 'budget optimization', 'cultural recipes', 'AI cooking', 'grocery savings'],
  authors: [{ name: 'PlateWise Team' }],
  creator: 'PlateWise',
  publisher: 'PlateWise',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://platewise.app'),
  openGraph: {
    title: 'PlateWise - Cultural Meal Planning & Budget Optimization',
    description: 'Optimize your food budget while preserving your cultural culinary traditions with AI-powered meal planning.',
    url: 'https://platewise.app',
    siteName: 'PlateWise',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlateWise - Cultural Meal Planning & Budget Optimization',
    description: 'Optimize your food budget while preserving your cultural culinary traditions with AI-powered meal planning.',
    creator: '@platewise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} theme-mediterranean`}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}