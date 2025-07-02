import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Qiuck App',
  description: 'احصل على افضل العروض والخدمات',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
