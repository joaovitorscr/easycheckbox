import Link from 'next/link'
import Container from './Container'
import { ThemeSwitcher } from './ThemeSwitcher'
import LoggedUserButton from './LoggedUserButton'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { buttonVariants } from './ui/button'
import { LogIn } from 'lucide-react'

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="mt-4 pb-4 border-b-2">
      <Container>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">
            <Link href="/">EasyCheckBox</Link>
          </h1>
          <div className="flex items-center">
            <ThemeSwitcher />
            {session?.user ? (
              <LoggedUserButton />
            ) : (
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href="/sign-in"
              >
                <LogIn />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
