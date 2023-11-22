import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  try {
    const box = await db.checkBoxList.findMany({
      where: {
        authorId: {
          equals: session?.user.id,
        },
      },
    })
    return NextResponse.json({ boxes })
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}

// TODO: FETCH PARAMS DA DYNAMIC ROUTE
