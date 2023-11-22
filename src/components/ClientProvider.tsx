'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

interface ClientProviderProps {
  children: ReactNode
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
