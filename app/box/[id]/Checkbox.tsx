import { Input } from '@/components/ui/input'
import { toast } from '../../../components/ui/use-toast'

export interface BoxInterface {
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

export default function Checkbox({ checked, content, id }: BoxInterface) {
  let temporaryValue = content
  let temporaryChecked = checked

  return (
    <div className="flex mr-4 items-center md:w-[50%]">
      <Input
        className="mr-4 w-10 cursor-pointer"
        type="checkbox"
        defaultChecked={checked}
        onChange={(e) => (temporaryChecked = e.target.checked)}
        onMouseLeave={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
      <Input
        type="text"
        defaultValue={temporaryValue}
        className={
          'border-none dark:bg-transparent dark:border-none dark:outline-1 text-lg outline-1'
        }
        onChange={(e) => (temporaryValue = e.target.value)}
        onBlur={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
    </div>
  )
}
