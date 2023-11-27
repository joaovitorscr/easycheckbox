import { toast } from './ui/use-toast'

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
    <div className="flex">
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={(e) => (temporaryChecked = e.target.checked)}
        onMouseLeave={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
      <input
        type="text"
        defaultValue={temporaryValue}
        onChange={(e) => (temporaryValue = e.target.value)}
        onBlur={() => handleUpdate(id, temporaryChecked, temporaryValue)}
      />
    </div>
  )
}
