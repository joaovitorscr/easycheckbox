import Container from '@/components/Container'

import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main>
      <Container>
        <div>
          <h1>Home</h1>
          <Link href="/admin">Open my admin</Link>
        </div>
        <h2>Server Session</h2>
        {JSON.stringify(session)}
      </Container>
    </main>
  )
}
