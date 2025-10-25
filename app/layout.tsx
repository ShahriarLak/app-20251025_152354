import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pricing Plans - Choose Your Perfect Plan',
  description: 'Flexible pricing plans designed to scale with your business. Choose from Basic, Pro, or Enterprise tiers with features that grow with you.',
  keywords: 'pricing, plans, subscription, business, enterprise, pro, basic',
  authors: [{ name: 'Your Company' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Pricing Plans - Choose Your Perfect Plan',
    description: 'Flexible pricing plans designed to scale with your business.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing Plans - Choose Your Perfect Plan',
    description: 'Flexible pricing plans designed to scale with your business.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}