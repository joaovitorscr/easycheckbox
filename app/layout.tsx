import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'
import ClientProvider from '@/components/ClientProvider'

const inter = Inter({
  subsets: ['latin'],
})

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
        </ClientProvider>
      </body>
    </html>
  )
}
