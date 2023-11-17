import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Admin() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    return <h2>Admin page - welcome back {session?.user.username}</h2>
  }
  return <h2>Please login to see this page</h2>
}
