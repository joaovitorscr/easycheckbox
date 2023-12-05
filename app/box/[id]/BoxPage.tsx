'use client'

import { BoxesProps } from '@/app/(dashboard)/boxes/page'
import Checkbox from '@/app/box/[id]/Checkbox'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../components/ui/form'
import { Input } from '../../../components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from '../../../components/ui/use-toast'
import { Plus, Trash } from 'lucide-react'
import Container from '@/components/Container'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface BoxPageInterface {
  boxUrl: string
}

export default function BoxPage({ boxUrl }: BoxPageInterface) {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])
  const { data: session, status } = useSession()

  const FormSchema = z.object({
    content: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function fetchBoxes() {
    const client = axios.create({
      baseURL: '/api/checkboxlist',
    })

    try {
      client.get('').then((response) => {
        setBoxes(response.data.boxes)
      })
    } catch (error) {
      toast({
        title: 'ERROR',
        description: `You don't have acess to this page`,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchBoxes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function deleteItem(id: string) {
    const response = await fetch('/api/box', {
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
        description: 'Your box was deleted succesfully!',
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

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/box', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: values.content,
        checked: false,
        listID: box?.id,
      }),
    })

    if (response.ok) {
      fetchBoxes()
      toast({
        title: 'SUCCESS',
        description: 'Your box was created succesfully!',
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
  const box = boxes.find((item) => item.id === boxUrl)

  if (status === 'loading') {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>
  }

  if (session?.user.id != box?.authorId) {
    return <p>Access Denied</p>
  }

  return (
    <Container>
      <div className="mt-10 flex flex-col items-center md:flex-row md:justify-between">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="md:p-8 md:w-80 md:text-center"
                      placeholder="What you have to do?"
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
        <div className="space-y-2 mt-4 md:space-y-0 md:mt-0">
          <h2 className="font-medium text-center text-2xl underline underline-offset-4">
            {box?.name}
          </h2>
          <p>{box?.authorId}</p>
        </div>
      </div>
      <div className="space-y-4 mt-40 justify-center">
        {box?.content.map((item) => (
          <div className="flex items-center justify-center" key={item.id}>
            <Checkbox
              id={item.id}
              checked={item.checked}
              content={item.content}
            />
            <Button variant={'ghost'} onClick={() => deleteItem(item.id)}>
              <Trash />
            </Button>
          </div>
        ))}
      </div>
    </Container>
  )
}
