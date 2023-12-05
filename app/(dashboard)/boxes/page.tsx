'use client'

import { BoxInterface } from '@/app/box/[id]/Checkbox'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import { Plus, Trash } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import Loading from './loading'
import { formatDate } from '@/lib/utils'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export interface BoxesProps {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  authorId: string
  content: BoxInterface[]
}

export default function Boxes() {
  const { data: session, status } = useSession()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const [boxes, setBoxes] = useState<BoxesProps[]>([])

  function fetchBoxes() {
    const client = axios.create({
      baseURL: '/api/checkboxlist',
    })

    client.get('').then((response) => {
      setBoxes(response.data.boxes)
    })
  }

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/checkboxlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        userID: session?.user.id,
      }),
    })

    if (response.ok) {
      fetchBoxes()
    } else {
      const errorResponse = await response.json()
      console.error('API Error:', errorResponse)
      toast({
        title: 'ERROR',
        description: 'Whoops! Something went wrong!',
        variant: 'destructive',
      })
    }
  }

  async function deleteList(id: string) {
    const response = await fetch('/api/checkboxlist', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    if (response.ok) {
      fetchBoxes()
      toast({
        title: 'SUCCESS',
        description: 'Your list was deleted succesfully!',
        variant: 'default',
      })
    } else {
      const errorResponse = await response.json()
      console.error('API Error:', errorResponse)
      toast({
        title: 'ERROR',
        description: 'Whoops! Something went wrong!',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchBoxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'loading') {
    return <Loading />
  }

  return (
    <Container>
      <div className="mt-10 flex justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="md:p-8 md:w-80 md:text-center"
                      placeholder="The name of your list and ENTER..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="p-2 ml-2 md:hidden" type="submit">
              <Plus />
            </Button>
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-20">
        {boxes.map((box) => (
          <div key={box.id} className="relative">
            <Button
              className="absolute top-0 right-0 m-2"
              variant="ghost"
              onClick={() => deleteList(box.id)}
            >
              <Trash />
            </Button>
            <Link href={`box/${box.id}`}>
              <div className="bg-zinc-800 rounded-md p-4">
                <div className="flex flex-col space-y-8">
                  <div>{box.name}</div>
                  <div>Created at {formatDate(box.createdAt)}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}
