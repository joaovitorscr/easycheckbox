import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface User {
    username: string
    id: string
  }

  interface Session {
    user: User & {
      username: string
      id: string
    }
    token: {
      username: string
    }
  }
}
