import Link from 'next/link'
import Container from './Container'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Header() {
  return (
    <header className="mt-4 pb-4 border-b-2">
      <Container>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium">
            <Link href="/">EasyCheckBox</Link>
          </h1>
          <ThemeSwitcher />
        </div>
      </Container>
    </header>
  )
}
