import type { Metadata } from 'next'
import { Roboto_Serif } from 'next/font/google'
import './globals.css'

const roboto = Roboto_Serif({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Easy Check Box',
  description: 'Check thoses boxes were never that easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
