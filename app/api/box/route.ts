import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import * as z from 'zod'

export async function POST(req: Request) {
  const boxSchema = z.object({
    content: z.string(),
    checked: z.boolean(),
    listID: z.string(),
  })

  try {
    const body = await req.json()
    const { content, checked, listID } = boxSchema.parse(body)

    const createNewBox = await db.box.create({
      data: {
        checked,
        content,
        listID,
      },
    })
    return NextResponse.json(
      { createNewBox, message: `Checkbox created succesfully` },
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
  const boxSchema = z.object({
    content: z.string(),
    checked: z.boolean(),
    id: z.string(),
  })
  try {
    const body = await req.json()
    const { content, checked, id } = boxSchema.parse(body)

    const updateBox = await db.box.update({
      where: {
        id: id,
      },
      data: {
        checked: checked,
        content: content,
      },
    })
    return NextResponse.json(
      { updateBox, message: `Box updated succesfully` },
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

export async function DELETE(req: Request) {
  const boxSchema = z.object({
    id: z.string(),
  })

  const body = await req.json()
  const { id } = boxSchema.parse(body)

  const deleteBox = await db.box.delete({
    where: {
      id: id,
    },
  })

  try {
    return NextResponse.json(
      { deleteBox, message: `Box deleted succesfully` },
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
