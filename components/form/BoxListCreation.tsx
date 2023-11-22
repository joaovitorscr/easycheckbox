'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'

import router from 'next/router'
import { toast } from '../ui/use-toast'
import { Input } from '../ui/input'

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export function BoxListCreation() {
  const { data: session } = useSession()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

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
      router.push('/')
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="The name of your list" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
