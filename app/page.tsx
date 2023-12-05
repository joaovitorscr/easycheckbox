import Container from '@/components/Container'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <div className="flex relative h-[calc(100vh-74px)]">
      <Container>
        <section className="my-auto absolute left-96 right-96 top-72 z-10">
          <div className="flex flex-col items-center space-y-16">
            <h1 className="text-8xl font-bold">EasyCheckBox</h1>
            <p className="text-2xl text-center font-medium">
              Enough of complicating things, just sign in and start checking
              toshe boxes!
            </p>
            {session?.user ? (
              <Link
                className={`${buttonVariants({
                  variant: 'outline',
                })}, p-8 w-40 rounded-lg`}
                href={'/boxes'}
              >
                See your boxes
              </Link>
            ) : (
              <Link
                className={`${buttonVariants({
                  variant: 'outline',
                })}, p-8 w-40 rounded-lg`}
                href={'/sign-in'}
              >
                <span className="font-medium text-lg">Sign In</span>
              </Link>
            )}
          </div>
        </section>
      </Container>
      <div className="bg-gradient-to-t from-yellow-300 via-green-400 to-blue-500 dark:from-neutral-800 dark:via-violet-900 dark:to-zinc-900 absolute top-0 left-0 w-screen h-[calc(100vh-74px)]" />
    </div>
  )
}
