import BoxList from '@/components/BoxList'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Admin() {
  const session = await getServerSession(authOptions)
  if (session?.user) {
    return <BoxList />
  }
  return <h2>Please login to see this page</h2>
}
