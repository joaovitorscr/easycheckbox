import { db } from '@/lib/db'
import { NextResponse } from 'next/server'
import { compare, hash } from 'bcrypt'
import * as z from 'zod'

// Schema for input validation

const userSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(
      20,
      'The max length of your Username must be less thant 20 characters.'
    ),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, username, password } = userSchema.parse(body)

    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists.' },
        { status: 409 }
      )
    }

    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    })

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username already exists.' },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    const { password: newUserPassword, ...rest } = newUser

    return NextResponse.json(
      { user: rest, message: 'User created successfully!' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  const passwordResetSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string(),
    confirmNewPassword: z.string(),
    userId: z.string(),
  })

  try {
    const body = await req.json()
    const { userId, currentPassword, newPassword, confirmNewPassword } =
      passwordResetSchema.parse(body)

    const user = await db.user.findUnique({ where: { id: userId } })

    if (!user) {
      return NextResponse.json({ message: 'User not found!' }, { status: 404 })
    }

    const passwordMatches = await compare(currentPassword, user.password)

    if (!passwordMatches) {
      return NextResponse.json(
        { message: 'Current password is incorrect!' },
        { status: 400 }
      )
    }

    if (newPassword !== confirmNewPassword) {
      return NextResponse.json(
        { message: 'New passwords do not match!' },
        { status: 400 }
      )
    }

    const newPasswordValidation = z
      .string()
      .min(8, 'Password must have at least 8 characters')
    try {
      newPasswordValidation.parse(newPassword)
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 400 })
    }

    const hashedNewPassword = await hash(newPassword, 10)

    await db.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    })

    return NextResponse.json(
      { message: 'Password updated successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong!' },
      { status: 500 }
    )
  }
}
