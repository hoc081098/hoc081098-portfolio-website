import { type Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { seoMetadata } from '@/data/metadata'

import '@/styles/tailwind.css'

export const metadata: Metadata = seoMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-100 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
