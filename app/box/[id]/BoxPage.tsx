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
import Loading from './loading'
import { ScrollArea } from '@/components/ui/scroll-area'

interface BoxPageInterface {
  boxUrl: string
}

export default function BoxPage({ boxUrl }: BoxPageInterface) {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])
  const { status } = useSession()

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

    form.reset({ content: '' })

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
    return <Loading />
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
                <FormItem id="contentForm">
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
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        {box?.content ? (
          <div>
            {box?.content.length > 0 ? (
              <ScrollArea className="md:w-[1080px] md:h-[580px]">
                <div className="space-y-4">
                  {box?.content
                    .sort((a, b) => {
                      return Date.parse(a.createdAt) - Date.parse(b.createdAt)
                    })
                    .map((item) => (
                      <div
                        className="flex items-center justify-center"
                        key={item.id}
                      >
                        <Checkbox
                          id={item.id}
                          checked={item.checked}
                          content={item.content}
                          createdAt={item.createdAt}
                          updatedAt={item.updatedAt}
                        />
                        <Button
                          variant={'ghost'}
                          onClick={() => deleteItem(item.id)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center">
                <h3 className="text-2xl">Start creating your first box!</h3>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h3 className="text-2xl">
              Something went wrong! Try refresing the page
            </h3>
          </div>
        )}
      </div>
    </Container>
  )
}
