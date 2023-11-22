interface CheckboxProps {
  content: string
  checked: boolean
}

export default function Checkbox({ checked, content }: CheckboxProps) {
  return (
    <div className="flex">
      <input className="mr-2" type="checkbox" checked={checked} />
      <p>{content}</p>
    </div>
  )
}
