import Container from '@/components/Container'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex relative h-[calc(100vh-74px)]">
      <Container>
        <section className="my-auto absolute left-96 right-96 z-10 top-80">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl font-medium">EasyCheckBox</h1>
            <p className="text-center">
              Enough of complicating things, just sign in and start checking
              toshe boxes!
            </p>
            {session?.user ? (
              <Link
                className={buttonVariants({ variant: 'outline' })}
                href={'/boxes'}
              >
                See your boxes
              </Link>
            ) : (
              <Link
                className={buttonVariants({ variant: 'outline' })}
                href={'/sign-in'}
              >
                Sign In
              </Link>
            )}
          </div>
        </section>
      </Container>
      <Image
        className="blur-lg"
        width={1920}
        height={1080}
        alt="background"
        src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  )
}
