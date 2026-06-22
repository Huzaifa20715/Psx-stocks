import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'FORTE — Premium Digital Agency',
  description: 'We build immersive 3D experiences, cutting-edge websites, and digital worlds that captivate and convert.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className} style={{ backgroundColor: '#050505', color: '#f8fafc' }}>
        {children}
      </body>
    </html>
  )
}
