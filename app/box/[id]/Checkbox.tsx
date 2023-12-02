import { Input } from '@/components/ui/input'
import { toast } from '../../../components/ui/use-toast'
import { cn } from '@/lib/utils'

export interface BoxProps {
  id: string
  content: string
  checked: boolean
}

async function handleUpdate(id: string, checked: boolean, content: string) {
  const response = await fetch('/api/box', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      checked,
      content,
    }),
  })

  if (response.ok) {
    console.log('Box updated!')
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

export default function Checkbox({ checked, content, id }: BoxProps) {
  let temporaryValue = content
  let temporaryChecked = checked

  return (
    <div className="flex w-full mr-4 items-center">
      <Input
        className="mr-2 w-10 cursor-pointer"
        type="checkbox"
        defaultChecked={checked}
        onChange={(e) => (temporaryChecked = e.target.checked)}
        onMouseLeave={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
      <Input
        type="text"
        defaultValue={temporaryValue}
        className={cn(
          'border-none dark:bg-transparent dark:border-none dark:outline-1 text-lg'
        )}
        onChange={(e) => (temporaryValue = e.target.value)}
        onBlur={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
    </div>
  )
}
