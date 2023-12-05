import Container from '@/components/Container'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center align-middle h-[calc(100vh-74px)]">
        {children}
      </div>
    </Container>
  )
}

export default AuthLayout
