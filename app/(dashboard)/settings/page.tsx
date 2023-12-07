import Container from '@/components/Container'
import PasswordReset from './passwordReset'

export default function Settings() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center align-middle h-[calc(100vh-74px)]">
        <PasswordReset />
      </div>
    </Container>
  )
}
