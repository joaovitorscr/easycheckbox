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

interface BoxPageInterface {
  boxUrl: string
}

export default function BoxPage({ boxUrl }: BoxPageInterface) {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])

  const FormSchema = z.object({
    content: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function fetchBoxes() {
    const client = axios.create({
      baseURL: '/api/checkboxlist',
    })

    client.get('').then((response) => {
      setBoxes(response.data.boxes)
    })
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

  return (
    <Container>
      <div className="mt-10 flex justify-between items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="What you have to do?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="p-2 ml-2" type="submit">
              <Plus />
            </Button>
          </form>
        </Form>
        <h2 className="font-medium text-2xl underline underline-offset-4">
          {box?.name}
        </h2>
      </div>
      <div className="mt-20 flex justify-center">
        {box ? (
          <div className="flex flex-col w-full">
            {box?.content.map((item) => (
              <div className="flex items-center" key={item.id}>
                <Checkbox
                  id={item.id}
                  checked={item.checked}
                  content={item.content}
                />
                <Button onClick={() => deleteItem(item.id)}>
                  <Trash />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex justify-center">
              <h2>Create your first box!</h2>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
