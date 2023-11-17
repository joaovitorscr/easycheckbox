import Container from '@/components/Container'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Container>
        <div>
          <h1>Home</h1>
          <Link href="/admin">Open my admin</Link>
        </div>
      </Container>
    </main>
  )
}
