'use client'

import { BoxesProps } from '@/app/(dashboard)/boxes/page'
import Checkbox from '@/components/Checkbox'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from './ui/use-toast'
import { Trash } from 'lucide-react'

interface BoxListProps {
  boxUrl: string
}

export default function BoxList({ boxUrl }: BoxListProps) {
  const [boxes, setBoxes] = useState<BoxesProps[]>([])

  const FormSchema = z.object({
    content: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const client = axios.create({
    baseURL: '/api/checkboxlist',
  })

  useEffect(() => {
    client.get('?_limit=10').then((response) => {
      setBoxes(response.data.boxes)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const box = boxes.find((item) => item.id === boxUrl)

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

  return (
    <div>
      <h2>{box?.name}</h2>
      {box?.content ? (
        <div className="flex">
          {box?.content.map((item) => (
            <>
              <Checkbox
                key={item.id}
                id={item.id}
                checked={item.checked}
                content={item.content}
              />
              <Button onClick={() => deleteItem(item.id)}>
                <Trash />
              </Button>
            </>
          ))}
        </div>
      ) : (
        <div>
          <h2>Crie sua primeira box</h2>
          <Button>+</Button>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="The name of your box" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  )
}
