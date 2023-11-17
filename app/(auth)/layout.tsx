import Container from '@/components/Container'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <div className="mt-48 flex flex-1 justify-center items-center">
        {children}
      </div>
    </Container>
  )
}

export default AuthLayout
