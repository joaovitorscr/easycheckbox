import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import * as z from 'zod'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  const listSchema = z.object({
    name: z.string().min(1, 'Name is necessary to create a list'),
    userID: z.string(),
  })

  try {
    const body = await req.json()
    const { name, userID } = listSchema.parse(body)

    const createNewBoxList = await db.checkBoxList.create({
      data: {
        name,
        authorId: userID,
      },
    })

    return NextResponse.json(
      { createNewBoxList, message: `Checkbox ${name} created succesfully` },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}

export async function GET() {
  const session = await getServerSession(authOptions)
  try {
    const boxes = await db.checkBoxList.findMany({
      where: {
        authorId: {
          equals: session?.user.id,
        },
      },
      include: {
        content: true,
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

export async function DELETE(req: Request) {
  const boxSchema = z.object({
    id: z.string(),
  })

  const body = await req.json()
  const { id } = boxSchema.parse(body)

  const deleteBox = await db.checkBoxList.delete({
    where: {
      id,
    },
  })

  try {
    return NextResponse.json(
      { deleteBox, message: `List deleted succesfully` },
      { status: 201 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  const listSchema = z.object({
    name: z.string(),
    id: z.string(),
  })

  try {
    const body = req.json()
    const { name, id } = listSchema.parse(body)

    const updatedBox = db.checkBoxList.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    })

    return NextResponse.json(
      { updatedBox, message: 'List succesfully updated' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
