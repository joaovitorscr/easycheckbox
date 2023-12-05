import Container from '@/components/Container'
import { FC, ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Container>
      <div className="mt-20 flex flex-col justify-center items-center">
        {children}
      </div>
    </Container>
  )
}

export default AuthLayout
